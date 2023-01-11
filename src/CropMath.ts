import { erf } from 'mathjs';
import { CropData } from './CropData.js';
import { WeightList, mergeWeightLists } from './Weights.js';

// The three crop stats
export class CropStats {
    gain: number = 0;
    growth: number = 0;
    resistance: number = 0;
}
// Data from the biomes that must be harvested from the source code
export class BiomeData {
    /* Biome-dependent humidity bonus; an integer between -10 and 10.
     */
    humidityBonus: number = 0;

    /* Biome-dependent nutrient bonus; an integer between -10 and 10.
     */
    nutrientBonus: number = 0;
}

/* Stores all crop-related info that is unlikely to change
 * if the crop is being used to produce resources.
 */
export class StaticCropData {
    stat: CropStats = new CropStats();
    crop: CropData = new CropData();
    biome: BiomeData = new BiomeData();

    /* Whether the crop sits atop hydrated farmland or not.
     *
     * IC2 crops can also be planted on Ztones' Garden Soil,
     * for example,
     * but then no hydration bonus is granted.
     */
    atopHydratedFarmland: boolean = false;

    /* Whether the crop constantly receives hydration or not.
     *
     * In IC2's code, the water storage fluctuates between 0 and 200.
     * IC2's Crop Matron and GT5's Crop Manager
     * both can keep the water storage constantly at 200,
     * so if this.hydrated is true the water storage is always considered to be 200,
     * and if it is false the water storage is always considered to be 0.
     */
    hydrated: boolean = false;

    /* Number of dirt blocks underneath the crop,
     * _ignoring_ the block immediately below it.
     * This number is always between 0 and 3.
     *
     * Internally, IC2 starts analyzing the block 2 blocks below the crop,
     * and goes downwards up to and including the block 4 blocks below it.
     * It counts the number of Vanilla dirt blocks,
     * stopping if any non-dirt block is found.
     *
     * Note that,
     * for crops that have a foundational block
     * (e.g. oreberries),
     * this number can be at most 2.
     */
    dirtBlocksUnderneath: number = 0;

    /* Whether the crop constantly gets fertilized or not.
     *
     * The nutrient storage is dynamic,
     * so this boolean will only be used during the computation.
     */
    fertilized: boolean = false;

    /* Y value of the crop block.
     */
    yValue: number = 0;

    /* Number of nearby blocks which are air blocks. This number is always between 0 and 8.
     *
     * "nearby" means the 8 blocks closest to the crop with the same Y value
     * (i.e. all blocks in a 3x1x3 rectangle centered at the crop,
     * excluding the crop itself).
     */
    surroundingAirBlocks: number = 0;

    /* Whether the block immediately above the crop can see the sky.
     */
    skyAccess: boolean = false;

    computeEnvironmentalNeeds() {
        return 4 * (this.crop.tier-1) + this.stat.growth + this.stat.gain + this.stat.resistance;
    }

    computeHumidity() {
        let farmlandBonus = this.atopHydratedFarmland ? 2 : 0;
        let hydrationBonus = this.hydrated ? 10 : 0;
        return this.biome.humidityBonus + farmlandBonus + hydrationBonus;
    }

    /* The nutrient storage fluctuates over the lifetime of the crop,
     * so it cannot be considered as a constant.
     */
    computeNutrients(nutrientStorage: number) {
        let storageBonus = Math.ceil(nutrientStorage/20);
        return this.biome.nutrientBonus + this.dirtBlocksUnderneath + storageBonus;
    }

    computeAirQuality() {
        let heightBonus = Math.floor((this.yValue - 64)/15);
        if(heightBonus < 0) heightBonus = 0;
        if(heightBonus > 4) heightBonus = 4;
        let airBlocksBonus = Math.floor(this.surroundingAirBlocks/2);
        let skyAccessBonus = this.skyAccess ? 2 : 0;
        return heightBonus + airBlocksBonus + skyAccessBonus;
    }

    computeEnvironmentalValue(nutrientStorage: number) {
        return 5 * Math.floor(this.crop.humidityWeight * this.computeHumidity() +
                this.crop.nutrientsWeight * this.computeNutrients(nutrientStorage) +
                this.crop.airQualityWeight * this.computeAirQuality());
    }

    /* Computes a list of pairs [gainedPoints, probability]
     * which lists all the possibilities of growth points to be gained,
     * with the corresponding probabilities.
     *
     * The list is sorted in ascending order of growth points.
     * The probabilities are strictly positive.
     *
     * If the crop has a non-zero probability of dying,
     * this method returns just [].
     */
    computeGainedGrowthPoints(nutrientStorage: number = 0): WeightList<number> {
        let envNeeds = this.computeEnvironmentalNeeds();
        let envValue = this.computeEnvironmentalValue(nutrientStorage);

        if(envNeeds - envValue > 25) {
            if(this.stat.resistance == 31) {
                // Crop does not die, but does not grow either
                return [[0, 1]];
            } else {
                // Crop may die, which means it will die in the long run
                return [];
            }
        }

        let ret: WeightList<number> = [];

        let baseMin = 3 + this.stat.growth;
        let baseMax = 3 + 6 + this.stat.growth;

        for(let i = baseMin; i <= baseMax; i++) {
            let growth = Math.floor(i * (100 + envValue - envNeeds) / 100);
            ret.push([growth, 1/7]);
        }
        return ret;
    }

    /* Similar as computedGainedGrowthPoints,
     * but averaging through all the permissible nutrientStorage values
     * that may happen if the crop is being constantly fertilized.
     */
    computeAverageGrowthPointsWithNutrition(): WeightList<number> {
        let growthPoints: WeightList<number>[] = [];
        for(let nutrients = 100; nutrients < 200; nutrients++) {
            let points = this.computeGainedGrowthPoints(nutrients);
            if(points.length === 0) {
                return [];
            }
            growthPoints.push(points);
        }
        return mergeWeightLists(growthPoints).sort(([g1, _w1], [g2, _w2]) => g1-g2);
    }

    static computeExpectedStepsInGrowthStage(
        growthStageDuration: number,
        growthPointGainsProbabilities: WeightList<number>
    ): number
    {
        /* Dynamic programming algorithm.
         * Invariant: growthStageDuration[i] is the expected number of steps
         * for the crop to go from i growth points to growthStageDuration growth points.
         */
        let expectedDuration = new Array(growthStageDuration + 1);
        expectedDuration[growthStageDuration] = 0;

        for(let i = growthStageDuration-1; i >= 0; i--) {
            let sum = 0;
            for(let [growth, probability] of growthPointGainsProbabilities) {
                if(growth == 0) {
                    /* We may stay in this stage for a while; we'll fix this later.
                     */
                    continue;
                } else if(i + growth > growthStageDuration) {
                    /* The crop will need exactly one more step in this case.
                     */
                    sum += probability;
                } else {
                    /* The crop will need 1 + expectedDuration[i + growth] steps in this case.
                     */
                    sum += probability * (1 + expectedDuration[i + growth]);
                }
            }
            if(growthPointGainsProbabilities[0]![0] === 0) {
                let probability = growthPointGainsProbabilities[0]![1];
                /* We may stay in this stage.
                 *
                 * First we will stay in this stage for 1/(1-probability) steps,
                 * then we will take one of the other transitions.
                 *
                 * The probability of each of the other transitions,
                 * conditioned in not staying in this stage,
                 * is their normal probability multiplied by 1/(1-probability),
                 * so we just multiply `sum` by 1/(1-probability) to compute this second part.
                 */
                sum = (1 + sum)/(1 - probability);
            }
            expectedDuration[i] = sum;
        }

        return expectedDuration[0];
    }

    computeExpectedTicksBetweenHarvests(): number {
        let expectedTicks = new Array<number>(this.crop.growthStages.length - 1);
        for(let i = 0; i < this.crop.growthStages.length - 1; i++) {
            if(this.fertilized) {
                expectedTicks[i] = StaticCropData.computeExpectedStepsInGrowthStage(
                    this.crop.growthStages[i]!, this.computeAverageGrowthPointsWithNutrition()
                );
            } else {
                expectedTicks[i] = StaticCropData.computeExpectedStepsInGrowthStage(
                    this.crop.growthStages[i]!, this.computeGainedGrowthPoints(0)
                );
            }
        }

        let expectancySum = new Array<number>(this.crop.growthStages.length);
        expectancySum[this.crop.growthStages.length-1] = 0;
        for(let i = this.crop.growthStages.length-2; i >= 0; i--) {
            expectancySum[i] = expectancySum[i+1]! + expectedTicks[i]!;
        }

        if(typeof(this.crop.growthStageAfterHarvest) === 'number') {
            return expectancySum[this.crop.growthStageAfterHarvest-1]!;
        } else {
            let sum = 0;
            for(let i = 0; i < this.crop.growthStages.length-1; i++) {
                sum += expectancySum[i]!;
            }
            return sum / (this.crop.growthStages.length-1);
        }
    }

    computeDropCountDistribution(): WeightList<number> {
        let baseChance = this.crop.gainFactor * Math.pow(1.03, this.stat.gain);
        /* The number of drops is calculated by the formula
         *  round(baseChance * (1 + 0.6827 * g))
         * where g is a random gaussian variable (mean=0, variance=1).
         */
        if(baseChance <= 0) return [[0, 1]];

        let d: WeightList<number> = [];
        let n = 0;
        let accumulatedProbability = 0;
        /* Invariant: accumulatedProbability is the probability that the number of drops
         * is strictly smaller than n.
         * We cannot really get the total probability to equal 1,
         * so will approximate it to within 1e-9.
         */

        while(accumulatedProbability < 1-1e-9) {
            /* The number of drops is <= n precisely when the rounded number is <= n+0.5;
             * i.e. g <= ((n+0.5)/baseChance - 1)/0.6827.
             * The probability that g <= x is given by 0.5+0.5*erf(x/sqrt(2)),
             * so the probability of having less than n drops is computed like this:
             */
            let probability = 0.5+0.5*erf(((n+0.5)/baseChance-1)/0.6827/Math.SQRT2);
            d.push([n, probability-accumulatedProbability]);
            accumulatedProbability = probability;
            n++;
        }
        return d;
    }

    computeDropCountAverage() {
        let distribution = this.computeDropCountDistribution();
        let averageDrops = 0;
        for(let [dropCount, probability] of distribution) {
            averageDrops += dropCount * probability;
        }
        return averageDrops;
    }

    computeAverageItemsPerDrop(): [string, number][] {
        let averageItems = new Map<string, number>();
        for(let [[drop, count], probability] of this.crop.possibleDrops) {
            /* If this drop is chosen,
             * IC2 has a (this.statGain+1)/100 chance of increasing the stack size by 1
             * before returning.
             */
            let partialAverage = (count + (this.stat.gain+1)/100) * probability;
            if(averageItems.has(drop)) {
                partialAverage += averageItems.get(drop)!;
            }
            averageItems.set(drop, partialAverage);
        }
        return Array.from(averageItems.entries());
    }

    computeAverageItemsPerHarvest(): [string, number][] {
        let averageDropCount = this.computeDropCountAverage();
        return this.computeAverageItemsPerDrop().map(
            ([drop, count]) => [drop, count * averageDropCount]
        );
    }
}
