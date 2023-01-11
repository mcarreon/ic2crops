import { WeightList } from './Weights.js';

// Data from the crop that must be harvested from the source code
export class CropData {
    name: string = "Unnamed Crop";

    /* Seed item.
     * If different from "",
     * it indicates that the crop can be planted using that item,
     * instead of having to be crossbred.
     */
    baseSeed: string = "";

    /* When planted from a seed item (instead of a seed bag),
     * the crop has some predetermined values for size, growth, gain, and resistance.
     * These values are almost always 1, 1, 1, 1,
     * but there are exceptions.
     */
    baseSize: number = 1;
    baseGrowth: number = 1;
    baseGain: number = 1;
    baseResistance: number = 1;

    /* Tier of the crop.
     */
    tier: number = 0;

    /* Weighting of each of the three environmental values.
     * These numbers may be fractional and negative and don't need to sum to 3.
     */
    humidityWeight: number = 1;
    nutrientsWeight: number = 1;
    airQualityWeight: number = 1;

    /* The duration of each growth stage.
     * Crops don't grow in the very last growth stage,
     * so growthStages[growthStages.length-1] is assumed to be 0.
     *
     * In the code (and in most places providing documentation),
     * the growth stages are indexed by 1,
     * whereas this list is indexed by zero.
     * So, for example,
     * the growth stage durations for the essence berry would be [500, 3000, 3000, 0].
     */
    growthStages: number[] = [1000, 1000, 1000, 0];

    /* Enlarge or shrinks crop.growthStages so its length matches the given number.
     * Newly created stages will be assigned the default duration of 1000.
     */
    static setNumberOfGrowthStages(crop: CropData, numberOfStages: number) {
        let oldLength = crop.growthStages.length;
        crop.growthStages.length = numberOfStages;
        crop.growthStages[numberOfStages-1] = 0;
        for(let i = oldLength; i < numberOfStages-1; i++) { // no-op if no stages were created
            crop.growthStages[i] = 1000;
        }
    }

    /* The "gain factor" is the return value of CropCard.dropGainChance(),
     * and is used to increase or decrease the average number of drops.
     *
     * May be above 1 (e.g. SaltyRoot's is 4).
     * Defaults to 0.95 ** cropTier.
     */
    gainFactor: number = 1;
    static defaultGainFactor(tier: number) {
        return Math.pow(0.95, tier);
    }

    /* Growth stage that the crop goes to after harvest.
     *
     * Some crops (notably Stickreed) transition to some random stage except the last one;
     * for these crops, this attribute reads 'random'.
     *
     * This field is "indexed by 1",
     * so a value of 1 means the crop reverts to its very frist growth stage
     * and the largest meaningful value is growthStages.length-1.
     */
    growthStageAfterHarvest: number | 'random' = 1;

    /* Growth stage at which the crop can be harvested.
     */
    minimumHarvestSize: number = 3;

    attributeChemical: number = 0;
    attributeFood: number = 0;
    attributeDefensive: number = 0;
    attributeColor: number = 0;
    attributeWeed: number = 0;
    attributes: string[] = [];

    /* List of possible item drops,
     * with corresponding weights.
     *
     * For each of the drops
     * (the number of which is controlled by the gain factor)
     * the crop can choose one ItemStack to drop.
     * For example, IC2's melon crop has 33% of chance of returning a single melon block,
     * and 66% of chance of returning between 2 and 5 melon slices
     * (the latter choosen uniformly between the 4 possible values).
     * These probabilities would be represented by the following list:
     * [
     *  [['Melon Block', 1], 1/3],
     *  [['Melon Slice', 2], 2/3*1/4],
     *  [['Melon Slice', 3], 2/3*1/4],
     *  [['Melon Slice', 4], 2/3*1/4],
     *  [['Melon Slice', 5], 2/3*1/4],
     * ]
     */
    possibleDrops: WeightList<[string, number]> = [
        [['drop', 1], 1],
    ];
}
