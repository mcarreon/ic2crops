/* This file contains all the class and function definitions of the crops database.
 * The other files in this directory only populate CropData.allCrops.
 */
import { WeightList } from '../Weights.js';

// Data from the crop that must be harvested from the source code
export class CropData {
    name: string = "Unnamed Crop";

    /* There are a few crops that behave differently
     * according to when they are harvested or which block is used as a foundation.
     * In this case,
     * we represent this by having all the behaviors as distinct CropData.
     * We choose one of them to be the "standard" behavior,
     * having variantOf === null,
     * and the others pointing to the standard behavior CropData.
     * We use different names to distinguish between each behavior.
     */
    variantOf: CropData | null = null;

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

    /* Growth stage at which the crop can produce descendants through crossbreeding.
     * 'never' is a special value for the Primordial Berry, which is never mature enough.
     */
    minimumCrossSize: number | 'never' = 3;

    attributeChemical: number = 0;
    attributeFood: number = 0;
    attributeDefensive: number = 0;
    attributeColor: number = 0;
    attributeWeed: number = 0;
    attributes: string[] = [];

    /* Some crops require a block to be placed underneath the farmland
     * in order to fully mature and drop resources.
     * This is the name of that block, or "" if no block is needed.
     */
    foundationBlock: string = "";

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

    static allCrops = new Map<string, CropData>();
    static registerCrop(crop: CropData) {
        CropData.allCrops.set(crop.name, crop);
    }
}

/* Makes a crop with IC2's default values.
 */
export function makeDefaultCrop({name = "Unnamed Crop", tier = 0, maxSize = 3}): CropData {
    let growthStages = Array(maxSize).fill(tier * 200);
    growthStages[maxSize-1] = 0;
    return {
        ...new CropData(),
        name,
        tier,
        growthStages,
        gainFactor: CropData.defaultGainFactor(tier),
    };
}

/* Utility to generate CropData for a Gregtech crop.
 *
 * In GT5-Unofficial's source code,
 * the class which extends CropCard is defined in the file
 *  src/main/java/gregtech/api/util/GT_BaseCrop.java,
 * and the actual crop definitions are in the file
 *  src/main/java/gregtech/loaders/postload/GT_CropLoader.java.
 *
 * One of the constructor arguments (`aGrowthSpeed`)
 * is never used in the body of the constructor,
 * so the corresponding member `mGrowthSpeed` is always 0.
 * However, there are crops which define this value to be something nonzero,
 * namely: Transformium, Eggplant, Meatrose, Milkwart, Spidernip, Trollplant,
 * Starwart, Quantaria, and Stargatium.
 * Technically they are intended to grow several times more slowly than they do now,
 * but due to this bug this does not happen.
 */
export function makeGTCrop({
    name = "Unnamed Crop",
    tier = 0,
    maxSize = 3,
    growthStageAfterHarvest = 1,
    minimumHarvestSize = 1,
    attributeChemical = 1,
    attributeFood = 1,
    attributeDefensive = 0,
    attributeColor = 4,
    attributeWeed = 0,
    attributes = [] as string[],
    foundationBlock = "",
    defaultDrop = "drop",
    specialDrops = [] as string[],
}): CropData
{
    let growthStages = Array(maxSize).fill(tier * 300);
    growthStages[maxSize-1] = 0;

    let possibleDrops: WeightList<[string, number]> = [];
    if(specialDrops.length === 0) {
        possibleDrops = [[[defaultDrop, 1], 1]];
    } else {
        let totalWeight = 2 * specialDrops.length + 2;
        possibleDrops.push([[defaultDrop, 1], (2 + specialDrops.length)/totalWeight]);
        for(let drop of specialDrops) {
            possibleDrops.push([[drop, 1], 1/totalWeight]);
        }
    }

    return {
        ...makeDefaultCrop({name, tier, maxSize}),
        growthStageAfterHarvest,
        minimumHarvestSize,
        minimumCrossSize: maxSize - 1,
        attributeChemical,
        attributeFood,
        attributeDefensive,
        attributeColor,
        attributeWeed,
        attributes,
        foundationBlock,
        possibleDrops,
    };
}

/* Utility to generate CropData for a default GT++ crop.
 */
export function makeDefaultGTplusplusCrop({
    name = "Unnamed Crop",
    tier = 0,
    growthStageDuration = 225,
}): CropData
{
    /* GT++ defines the abstract classes BaseCrop, BaseHarvestableCrop extending BaseCrop,
     * and BaseAestheticCrop extending BaseHarvestableCrop.
     * All of its crops extend BaseHarvestableCrop,
     * so this function mimics the data from it.
     *
     * The max size and weights are defined in
     * src/main/java/gtPlusPlus/xmod/bartcrops/abstracts/BaseHarvestableCrop.java.
     *
     * The attributes ("stats") and growth stage after harvest are defined in
     * src/main/java/gtPlusPlus/xmod/bartcrops/abstracts/BaseAestheticCrop.java.
     */
    let maxSize = 3;
    let growthStages = Array(maxSize).fill(growthStageDuration);
    growthStages[maxSize-1] = 0;

    return {
        ...makeDefaultCrop({name, tier, maxSize}),
        humidityWeight: 1.2,
        nutrientsWeight: 0.9,
        airQualityWeight: 0.9,
        minimumCrossSize: maxSize,
        growthStages,
        growthStageAfterHarvest: 1,
        attributeChemical: 0,
        attributeFood: 0,
        attributeDefensive: 0,
        attributeColor: 4,
        attributeWeed: 0,
    };
}

export function makeIC2FlowerCrop({
    name = "",
    attributes = [] as string[],
    drop = "",
}): CropData
{
    return {
        ...makeDefaultCrop({
            name,
            tier: 2,
            maxSize: 4,
        }),
        attributeChemical: 1,
        attributeFood: 1,
        attributeDefensive: 0,
        attributeColor: 5,
        attributeWeed: 1,
        attributes,
        minimumHarvestSize: 4,
        possibleDrops: [[[drop, 1], 1]],
        growthStageAfterHarvest: 3,
        growthStages: [400, 400, 600, 0],
    };
}

export function makeCppBasicCrop({
    name = "Unnamed Crop",
    tier = 0,
    maxSize = 3,
}): CropData
{
    let berryGain = 1; // Config value: berriespp.cfg > gain > D:"All crops"
    return {
        ...makeDefaultCrop({name, tier, maxSize}),
        gainFactor: makeDefaultCrop({tier}).gainFactor * berryGain,
        minimumCrossSize: maxSize,
        minimumHarvestSize: maxSize,
    };
}

export function makeCppBasicBerryCrop({
    name = "Unnamed Crop",
    tier = 2, // Default tier is 2
    maxSize = 3, // Default maxSize is 3
}): CropData
{
    return {
        ...makeDefaultCrop({name, tier, maxSize}),
        attributeChemical: 0,
        attributeFood: 1,
        attributeDefensive: 0,
        attributeColor: 5,
        attributeWeed: 0,
        humidityWeight: 1.2,
        nutrientsWeight: 0.9,
        airQualityWeight: 0.9,
        growthStages: [700, 200, 0],
        growthStageAfterHarvest: 2,
    };
}

export function makeCppBasicDecorationCrop({
    name = "Unnamed Crop",
    tier = 1, // Default tier is 1
    maxSize = 3, // Default maxSize is 3, inherited from BasicBerryCrop
}): CropData
{
    let growthStages = Array(maxSize).fill(225);
    growthStages[maxSize-1] = 0;
    return {
        ...makeCppBasicBerryCrop({name, tier, maxSize}),
        attributeChemical: 0,
        attributeFood: 0,
        attributeDefensive: 0,
        attributeColor: 4,
        attributeWeed: 0,
        growthStages,
        growthStageAfterHarvest: 1,
    };
}

export function makeCppBasicFoodCrop({
    name = "Unnamed Crop",
    tier = 2, // Default tier is 2
    maxSize = 3, // Default maxSize is 3,
}): CropData
{
    return {
        ...makeCppBasicDecorationCrop({name, tier, maxSize}),
        attributeChemical: 0,
        attributeFood: 4,
        attributeDefensive: 0,
        attributeColor: 0,
        attributeWeed: 2,
        minimumHarvestSize: 3,
        growthStageAfterHarvest: 1,
    };
}

export function makeCppBasicTinkerBerryCrop({
    name = "Unnamed Crop",
    tier = 5, // Default tier is 5
    maxSize = 4, // Default maxSize is 4,
}): CropData
{
    let tcBerryGain = 1; // Config value: berriespp.cfg > gain > D:"Tinker's Construct berries"
    let gainFactor = Math.pow(0.95, tier) * tcBerryGain;
    return {
        ...makeCppBasicCrop({
            name,
            tier,
            maxSize,
        }),
        gainFactor,
        attributeChemical: 3,
        attributeFood: 0,
        attributeDefensive: 4,
        attributeColor: 1,
        attributeWeed: 0,
        minimumHarvestSize: 3,
        humidityWeight: 0.5,
        nutrientsWeight: 1.5,
        airQualityWeight: 1.0,
        growthStageAfterHarvest: 2,
    }
}
