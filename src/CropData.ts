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

    static allCrops = new Map<string, CropData>();
    static registerCrop(crop: CropData) {
        CropData.allCrops.set(crop.name, crop);
    }
}

/* Makes a crop with the default values.
 */
function makeDefaultCrop({name = "Unnamed Crop", tier = 0, maxSize = 3}): CropData {
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
function makeGTCrop({
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
        attributeChemical,
        attributeFood,
        attributeDefensive,
        attributeColor,
        attributeWeed,
        attributes,
        possibleDrops,
    };
}

CropData.registerCrop(makeGTCrop({
    name: "Indigo",
    tier: 2,
    maxSize: 4,
    growthStageAfterHarvest: 1,
    minimumHarvestSize: 1,
    attributeChemical: 1,
    attributeFood: 1,
    attributeDefensive: 0,
    attributeColor: 4,
    attributeWeed: 0,
    attributes: ["Flower", "Blue", "Ingredient"],
    defaultDrop: "Indigo Blossom",
}));

CropData.registerCrop(makeGTCrop({
    name: "Flax",
    tier: 2,
    maxSize: 4,
    growthStageAfterHarvest: 1,
    minimumHarvestSize: 4,
    attributeChemical: 1,
    attributeFood: 1,
    attributeDefensive: 2,
    attributeColor: 0,
    attributeWeed: 1,
    attributes: ["Silk", "Tendrilly", "Adictive"],
    defaultDrop: "String",
}));

CropData.registerCrop(makeGTCrop({
    name: "Oilberries",
    tier: 9,
    maxSize: 4,
    growthStageAfterHarvest: 1,
    minimumHarvestSize: 4,
    attributeChemical: 6,
    attributeFood: 1,
    attributeDefensive: 2,
    attributeColor: 1,
    attributeWeed: 12,
    attributes: ["Fire", "Dark", "Reed", "Rotten", "Coal", "Oil"],
    defaultDrop: "Oil Berry",
}));

CropData.registerCrop(makeGTCrop({
    name: "Bobsyeruncleranks",
    tier: 11,
    maxSize: 4,
    growthStageAfterHarvest: 1,
    minimumHarvestSize: 4,
    attributeChemical: 4,
    attributeFood: 0,
    attributeDefensive: 8,
    attributeColor: 2,
    attributeWeed: 9,
    attributes: ["Shiny", "Tendrilly", "Emerald", "Berylium", "Crystal"],
    defaultDrop: "Bobs-Yer-Uncle-Berry",
    specialDrops: ["Emerald"],
}));

CropData.registerCrop(makeGTCrop({
    name: "Diareed",
    tier: 12,
    maxSize: 4,
    growthStageAfterHarvest: 1,
    minimumHarvestSize: 4,
    attributeChemical: 5,
    attributeFood: 0,
    attributeDefensive: 10,
    attributeColor: 2,
    attributeWeed: 10,
    attributes: ["Fire", "Shiny", "Reed", "Coal", "Diamond", "Crystal"],
    defaultDrop: "Diamond Dust",
    specialDrops: ["Diamond"],
}));

CropData.registerCrop(makeGTCrop({
    name: "Withereed",
    tier: 8,
    maxSize: 4,
    growthStageAfterHarvest: 1,
    minimumHarvestSize: 4,
    attributeChemical: 2,
    attributeFood: 0,
    attributeDefensive: 4,
    attributeColor: 1,
    attributeWeed: 3,
    attributes: ["Fire", "Undead", "Reed", "Coal", "Rotten", "Wither"],
    defaultDrop: "Coal Dust",
    specialDrops: ["Coal"],
}));

CropData.registerCrop(makeGTCrop({
    name: "Blazereed",
    tier: 6,
    maxSize: 4,
    growthStageAfterHarvest: 1,
    minimumHarvestSize: 4,
    attributeChemical: 0,
    attributeFood: 4,
    attributeDefensive: 1,
    attributeColor: 0,
    attributeWeed: 0,
    attributes: ["Fire", "Blaze", "Reed", "Sulfur"],
    defaultDrop: "Blaze Powder",
    specialDrops: ["Blaze Rod"],
}));

CropData.registerCrop(makeGTCrop({
    name: "Eggplant",
    tier: 6,
    maxSize: 3,
    growthStageAfterHarvest: 2,
    minimumHarvestSize: 3,
    attributeChemical: 0,
    attributeFood: 4,
    attributeDefensive: 1,
    attributeColor: 0,
    attributeWeed: 0,
    attributes: ["Chicken", "Egg", "Food", "Feather", "Flower", "Addictive"],
    defaultDrop: "Egg",
    specialDrops: ["Raw Chicken", "Feather", "Feather", "Feather"],
}));

CropData.registerCrop(makeGTCrop({
    name: "Corium",
    tier: 6,
    maxSize: 4,
    growthStageAfterHarvest: 1,
    minimumHarvestSize: 4,
    attributeChemical: 0,
    attributeFood: 2,
    attributeDefensive: 3,
    attributeColor: 1,
    attributeWeed: 0,
    attributes: ["Cow", "Silk", "Tendrilly"],
    defaultDrop: "Leather",
}));

CropData.registerCrop(makeGTCrop({
    name: "Corpseplant",
    tier: 5,
    maxSize: 4,
    growthStageAfterHarvest: 1,
    minimumHarvestSize: 4,
    attributeChemical: 0,
    attributeFood: 2,
    attributeDefensive: 1,
    attributeColor: 0,
    attributeWeed: 3,
    attributes: ["Toxic", "Undead", "Tendrilly", "Food", "Rotten"],
    defaultDrop: "Rotten Flesh",
    specialDrops: ["Bone Meal", "Bone Meal", "Bone"],
}));

CropData.registerCrop(makeGTCrop({
    name: "Creeperweed",
    tier: 7,
    maxSize: 4,
    growthStageAfterHarvest: 1,
    minimumHarvestSize: 4,
    attributeChemical: 3,
    attributeFood: 0,
    attributeDefensive: 5,
    attributeColor: 1,
    attributeWeed: 3,
    attributes: ["Creeper", "Tendrilly", "Explosive", "Fire", "Sulfur", "Saltpeter", "Coal"],
    defaultDrop: "Gunpowder",
}));

CropData.registerCrop(makeGTCrop({
    name: "Enderbloom",
    tier: 10,
    maxSize: 4,
    growthStageAfterHarvest: 1,
    minimumHarvestSize: 4,
    attributeChemical: 5,
    attributeFood: 0,
    attributeDefensive: 2,
    attributeColor: 1,
    attributeWeed: 6,
    attributes: ["Ender", "Flower", "Shiny"],
    defaultDrop: "Enderpearl Dust",
    specialDrops: ["Ender Pearl", "Ender Pearl", "Ender Eye"],
}));

CropData.registerCrop(makeGTCrop({
    name: "Meatrose",
    tier: 7,
    maxSize: 4,
    growthStageAfterHarvest: 1,
    minimumHarvestSize: 4,
    attributeChemical: 0,
    attributeFood: 4,
    attributeDefensive: 1,
    attributeColor: 3,
    attributeWeed: 0,
    attributes: ["Food", "Flower", "Cow", "Fish", "Chicken", "Pig"],
    defaultDrop: "Pink Dye",
    specialDrops: ["Raw Beef", "Raw Porkchop", "Raw Chicken", "Raw Fish"],
}));
CropData.registerCrop(makeGTCrop({
    name: "Milkwart",
    tier: 6,
    maxSize: 3,
    growthStageAfterHarvest: 1,
    minimumHarvestSize: 3,
    attributeChemical: 0,
    attributeFood: 3,
    attributeDefensive: 0,
    attributeColor: 1,
    attributeWeed: 0,
    attributes: ["Food", "Milk", "Cow"],
    defaultDrop: "Milk Wart",
}));

CropData.registerCrop(makeGTCrop({
    name: "Slimeplant",
    tier: 6,
    maxSize: 4,
    growthStageAfterHarvest: 3,
    minimumHarvestSize: 4,
    attributeChemical: 3,
    attributeFood: 0,
    attributeDefensive: 0,
    attributeColor: 0,
    attributeWeed: 2,
    attributes: ["Slime", "Bouncy", "Sticky", "Bush"],
    defaultDrop: "Slimeball",
}));

CropData.registerCrop(makeGTCrop({
    name: "Spidernip",
    tier: 4,
    maxSize: 4,
    growthStageAfterHarvest: 1,
    minimumHarvestSize: 4,
    attributeChemical: 2,
    attributeFood: 1,
    attributeDefensive: 4,
    attributeColor: 1,
    attributeWeed: 3,
    attributes: ["Toxic", "Silk", "Spider", "Flower", "Ingredient", "Addictive"],
    defaultDrop: "String",
    specialDrops: ["Spider Eye", "Cobweb"],
}));

CropData.registerCrop(makeGTCrop({
    name: "Tearstalks",
    tier: 8,
    maxSize: 4,
    growthStageAfterHarvest: 1,
    minimumHarvestSize: 4,
    attributeChemical: 1,
    attributeFood: 2,
    attributeDefensive: 0,
    attributeColor: 0,
    attributeWeed: 0,
    attributes: ["Healing", "Nether", "Ingredient", "Reed", "Ghast"],
    defaultDrop: "Ghast Tear",
}));

CropData.registerCrop(makeGTCrop({
    name: "Tine",
    tier: 5,
    maxSize: 3,
    growthStageAfterHarvest: 2,
    minimumHarvestSize: 3,
    attributeChemical: 2,
    attributeFood: 0,
    attributeDefensive: 3,
    attributeColor: 0,
    attributeWeed: 0,
    attributes: ["Shiny", "Metal", "Pine", "Tin", "Bush"],
    defaultDrop: "Tine Twig",
}));

CropData.registerCrop(makeGTCrop({
    name: "Coppon",
    tier: 6,
    maxSize: 3,
    growthStageAfterHarvest: 2,
    minimumHarvestSize: 3,
    attributeChemical: 2,
    attributeFood: 0,
    attributeDefensive: 1,
    attributeColor: 1,
    attributeWeed: 1,
    attributes: ["Shiny", "Metal", "Cotton", "Copper", "Bush"],
    defaultDrop: "Coppon Fiber",
}));

CropData.registerCrop(makeGTCrop({
    name: "Brown Mushrooms",
    tier: 1,
    maxSize: 3,
    growthStageAfterHarvest: 1,
    minimumHarvestSize: 3,
    attributeChemical: 0,
    attributeFood: 2,
    attributeDefensive: 0,
    attributeColor: 0,
    attributeWeed: 2,
    attributes: ["Food", "Mushroom", "Ingredient"],
    defaultDrop: "Brown Mushroom", // The in-game name is just "Mushroom"
}));

CropData.registerCrop(makeGTCrop({
    name: "Red Mushrooms",
    tier: 1,
    maxSize: 3,
    growthStageAfterHarvest: 1,
    minimumHarvestSize: 3,
    attributeChemical: 0,
    attributeFood: 1,
    attributeDefensive: 3,
    attributeColor: 0,
    attributeWeed: 2,
    attributes: ["Toxic", "Mushroom", "Ingredient"],
    defaultDrop: "Red Mushroom", // The in-game name is just "Mushroom"
}));

CropData.registerCrop(makeGTCrop({
    name: "Argentia",
    tier: 7,
    maxSize: 4,
    growthStageAfterHarvest: 3,
    minimumHarvestSize: 4,
    attributeChemical: 2,
    attributeFood: 0,
    attributeDefensive: 1,
    attributeColor: 0,
    attributeWeed: 0,
    attributes: ["Shiny", "Metal", "Silver", "Reed"],
    defaultDrop: "Argentia Leaf",
}));

CropData.registerCrop(makeGTCrop({
    name: "Plumbilia",
    tier: 6,
    maxSize: 4,
    growthStageAfterHarvest: 3,
    minimumHarvestSize: 4,
    attributeChemical: 2,
    attributeFood: 0,
    attributeDefensive: 3,
    attributeColor: 1,
    attributeWeed: 1,
    attributes: ["Heavy", "Metal", "Lead", "Reed"],
    defaultDrop: "Plumbilia Leaf",
}));

CropData.registerCrop(makeGTCrop({
    name: "Steeleafranks",
    tier: 10,
    maxSize: 4,
    growthStageAfterHarvest: 1,
    minimumHarvestSize: 4,
    attributeChemical: 3,
    attributeFood: 0,
    attributeDefensive: 7,
    attributeColor: 2,
    attributeWeed: 8,
    attributes: ["Metal", "Tendrilly", "Iron"],
    defaultDrop: "Steeleaf Dust",
    specialDrops: ["Steeleaf"],
}));

CropData.registerCrop(makeGTCrop({
    name: "Liveroots",
    tier: 8,
    maxSize: 4,
    growthStageAfterHarvest: 1,
    minimumHarvestSize: 4,
    attributeChemical: 2,
    attributeFood: 0,
    attributeDefensive: 5,
    attributeColor: 2,
    attributeWeed: 6,
    attributes: ["Wood", "Tendrilly"],
    defaultDrop: "Liveroot Dust",
    specialDrops: ["Liveroot"],
}));

CropData.registerCrop(makeGTCrop({
    name: "Trollplant",
    tier: 6,
    maxSize: 5,
    growthStageAfterHarvest: 1,
    minimumHarvestSize: 4,
    attributeChemical: 0,
    attributeFood: 0,
    attributeDefensive: 5,
    attributeColor: 2,
    attributeWeed: 8,
    attributes: ["Troll", "Bad", "Scrap"],
    defaultDrop: "Ruby (fake)", // The in-game name is just "Ruby"
    specialDrops: ["Plantball", "Scrap", "Plutonium 241 Dust"],
}));

CropData.registerCrop(makeGTCrop({
    name: "Lazulia",
    tier: 7,
    maxSize: 4,
    growthStageAfterHarvest: 2,
    minimumHarvestSize: 4,
    attributeChemical: 4,
    attributeFood: 2,
    attributeDefensive: 5,
    attributeColor: 7,
    attributeWeed: 4,
    attributes: ["Shiny", "Bad", "Crystal", "Lapis"],
    defaultDrop: "Lapis Dust",
}));

CropData.registerCrop(makeGTCrop({
    name: "Glowheat",
    tier: 10,
    maxSize: 7,
    growthStageAfterHarvest: 5,
    minimumHarvestSize: 7,
    attributeChemical: 3,
    attributeFood: 3,
    attributeDefensive: 3,
    attributeColor: 5,
    attributeWeed: 4,
    attributes: ["Light", "Shiny", "Crystal"],
    defaultDrop: "Glowstone Dust",
}));

CropData.registerCrop(makeGTCrop({
    name: "Fertilia",
    tier: 3,
    maxSize: 4,
    growthStageAfterHarvest: 1,
    minimumHarvestSize: 4,
    attributeChemical: 2,
    attributeFood: 3,
    attributeDefensive: 5,
    attributeColor: 4,
    attributeWeed: 8,
    attributes: ["Growth", "Healing", "Flower"],
    defaultDrop: "Calcite Dust",
    specialDrops: ["Fertilizer", "Apatite Dust", "Phosphate Dust"],
}));

CropData.registerCrop(makeGTCrop({
    name: "Bauxia",
    tier: 6,
    maxSize: 3,
    growthStageAfterHarvest: 2,
    minimumHarvestSize: 3,
    attributeChemical: 5,
    attributeFood: 0,
    attributeDefensive: 2,
    attributeColor: 3,
    attributeWeed: 3,
    attributes: ["Metal", "Aluminium", "Reed", "Aluminium"],
    defaultDrop: "Bauxia Leaf",
}));

CropData.registerCrop(makeGTCrop({
    name: "Titania",
    tier: 9,
    maxSize: 3,
    growthStageAfterHarvest: 2,
    minimumHarvestSize: 3,
    attributeChemical: 5,
    attributeFood: 0,
    attributeDefensive: 3,
    attributeColor: 3,
    attributeWeed: 1,
    attributes: ["Metal", "Heavy", "Reed", "Titanium"],
    defaultDrop: "Titania Leaf",
}));

CropData.registerCrop(makeGTCrop({
    name: "Reactoria",
    tier: 12,
    maxSize: 4,
    growthStageAfterHarvest: 2,
    minimumHarvestSize: 4,
    attributeChemical: 4,
    attributeFood: 0,
    attributeDefensive: 1,
    attributeColor: 2,
    attributeWeed: 1,
    attributes: ["Radioactive", "Metal", "Danger", "Uranium"],
    defaultDrop: "Reactoria Leaf",
    specialDrops: ["Uranium Leaf"],
}));

CropData.registerCrop(makeGTCrop({
    name: "God of Thunder",
    tier: 9,
    maxSize: 4,
    growthStageAfterHarvest: 2,
    minimumHarvestSize: 4,
    attributeChemical: 3,
    attributeFood: 0,
    attributeDefensive: 5,
    attributeColor: 1,
    attributeWeed: 2,
    attributes: ["Radioactive", "Metal", "Coal", "Thorium"],
    defaultDrop: "Thunder Leaf",
}));

CropData.registerCrop(makeGTCrop({
    name: "Transformium",
    tier: 12,
    maxSize: 4,
    growthStageAfterHarvest: 1,
    minimumHarvestSize: 4,
    attributeChemical: 6,
    attributeFood: 2,
    attributeDefensive: 1,
    attributeColor: 6,
    attributeWeed: 1,
    attributes: ["Transform", "Coal", "Reed"],
    defaultDrop: "UUA Berry",
    specialDrops: ["UUA Berry", "UUA Berry", "UUA Berry", "UUA Berry", "UUM Berry"],
}));

CropData.registerCrop(makeGTCrop({
    name: "Starwart",
    tier: 12,
    maxSize: 4,
    growthStageAfterHarvest: 1,
    minimumHarvestSize: 4,
    attributeChemical: 2,
    attributeFood: 0,
    attributeDefensive: 0,
    attributeColor: 1,
    attributeWeed: 0,
    attributes: ["Wither", "Nether", "Undead", "Netherstar"],
    defaultDrop: "Coal Dust",
    specialDrops: [
        "Coal",
        "Skeleton Skull",
        "Wither Skeleton Skull",
        "Wither Skeleton Skull",
        "Nether Star Dust"
    ],
}));

CropData.registerCrop(makeGTCrop({
    name: "Zomplant",
    tier: 3,
    maxSize: 4,
    growthStageAfterHarvest: 1,
    minimumHarvestSize: 4,
    attributeChemical: 1,
    attributeFood: 3,
    attributeDefensive: 4,
    attributeColor: 2,
    attributeWeed: 6,
    attributes: ["Zombie", "Rotten", "Undead"],
    defaultDrop: "Rotten Flesh",
}));

CropData.registerCrop(makeGTCrop({
    name: "Nickelback",
    tier: 5,
    maxSize: 3,
    growthStageAfterHarvest: 2,
    minimumHarvestSize: 3,
    attributeChemical: 3,
    attributeFood: 0,
    attributeDefensive: 1,
    attributeColor: 2,
    attributeWeed: 2,
    attributes: ["Metal", "Fire", "Alloy"],
    defaultDrop: "Nickelback Leaf",
}));

CropData.registerCrop(makeGTCrop({
    name: "Galvania",
    tier: 6,
    maxSize: 3,
    growthStageAfterHarvest: 2,
    minimumHarvestSize: 3,
    attributeChemical: 3,
    attributeFood: 0,
    attributeDefensive: 2,
    attributeColor: 2,
    attributeWeed: 3,
    attributes: ["Metal", "Alloy", "Bush"],
    defaultDrop: "Galvania Leaf",
}));

CropData.registerCrop(makeGTCrop({
    name: "Evil Ore",
    tier: 8,
    maxSize: 4,
    growthStageAfterHarvest: 3,
    minimumHarvestSize: 4,
    attributeChemical: 4,
    attributeFood: 0,
    attributeDefensive: 2,
    attributeColor: 1,
    attributeWeed: 3,
    attributes: ["Crystal", "Fire", "Nether"],
    defaultDrop: "Nether Quartz Dust",
    specialDrops: ["Nether Quartz", "Certus Quartz Dust"],
}));

CropData.registerCrop(makeGTCrop({
    name: "Olivia",
    tier: 2,
    maxSize: 4,
    growthStageAfterHarvest: 3,
    minimumHarvestSize: 4,
    attributeChemical: 1,
    attributeFood: 0,
    attributeDefensive: 1,
    attributeColor: 4,
    attributeWeed: 0,
    attributes: ["Crystal", "Shiny", "Processing", "Olivine"],
    defaultDrop: "Olivine Dust",
    specialDrops: ["Olivine"],
}));

CropData.registerCrop(makeGTCrop({
    name: "Sapphirum",
    tier: 4,
    maxSize: 4,
    growthStageAfterHarvest: 3,
    minimumHarvestSize: 4,
    attributeChemical: 1,
    attributeFood: 0,
    attributeDefensive: 1,
    attributeColor: 5,
    attributeWeed: 0,
    attributes: ["Crystal", "Shiny", "Metal", "Sapphire"],
    defaultDrop: "Sapphire Dust",
    specialDrops: ["Sapphire"],
}));

CropData.registerCrop(makeGTCrop({
    name: "Pyrolusium",
    tier: 12,
    maxSize: 3,
    growthStageAfterHarvest: 2,
    minimumHarvestSize: 3,
    attributeChemical: 1,
    attributeFood: 0,
    attributeDefensive: 1,
    attributeColor: 1,
    attributeWeed: 0,
    attributes: ["Metal", "Clean", "Bush", "Manganese"],
    defaultDrop: "Pyrolusium Leaf",
}));

CropData.registerCrop(makeGTCrop({
    name: "Scheelinium",
    tier: 12,
    maxSize: 3,
    growthStageAfterHarvest: 2,
    minimumHarvestSize: 3,
    attributeChemical: 3,
    attributeFood: 0,
    attributeDefensive: 1,
    attributeColor: 1,
    attributeWeed: 0,
    attributes: ["Metal", "Hard", "Bush", "Tungsten"],
    defaultDrop: "Scheelinium Leaf",
}));

CropData.registerCrop(makeGTCrop({
    name: "Platina",
    tier: 11,
    maxSize: 4,
    growthStageAfterHarvest: 1,
    minimumHarvestSize: 4,
    attributeChemical: 3,
    attributeFood: 0,
    attributeDefensive: 0,
    attributeColor: 3,
    attributeWeed: 0,
    attributes: ["Metal", "Shiny", "Reed", "Platinum"],
    defaultDrop: "Platina Leaf",
}));

CropData.registerCrop(makeGTCrop({
    name: "Quantaria",
    tier: 12,
    maxSize: 4,
    growthStageAfterHarvest: 1,
    minimumHarvestSize: 4,
    attributeChemical: 4,
    attributeFood: 0,
    attributeDefensive: 0,
    attributeColor: 1,
    attributeWeed: 0,
    attributes: ["Metal", "Iridium", "Reed"],
    defaultDrop: "Quantaria Leaf (Iridium)",
    specialDrops: ["Quantaria Leaf (Osmium)"],
}));

CropData.registerCrop(makeGTCrop({
    name: "Stargatium",
    tier: 12,
    maxSize: 4,
    growthStageAfterHarvest: 1,
    minimumHarvestSize: 4,
    attributeChemical: 4,
    attributeFood: 0,
    attributeDefensive: 0,
    attributeColor: 2,
    attributeWeed: 0,
    attributes: ["Metal", "Heavy", "Alien", "Naquadah"],
    defaultDrop: "Endstone Dust",
    specialDrops: ["Stargatium Leaf"],
}));

CropData.registerCrop(makeGTCrop({
    name: "Lemon",
    tier: 4,
    maxSize: 4,
    growthStageAfterHarvest: 1,
    minimumHarvestSize: 4,
    attributeChemical: 1,
    attributeFood: 1,
    attributeDefensive: 0,
    attributeColor: 2,
    attributeWeed: 0,
    attributes: ["Food", "Yellow", "Sour"],
    defaultDrop: "Lemon",
}));

CropData.registerCrop(makeGTCrop({
    name: "Chilly",
    tier: 4,
    maxSize: 4,
    growthStageAfterHarvest: 1,
    minimumHarvestSize: 4,
    attributeChemical: 1,
    attributeFood: 1,
    attributeDefensive: 0,
    attributeColor: 2,
    attributeWeed: 0,
    attributes: ["Food", "Red", "Spicy"],
    defaultDrop: "Chilly",
}));

CropData.registerCrop(makeGTCrop({
    name: "Tomato",
    tier: 4,
    maxSize: 4,
    growthStageAfterHarvest: 1,
    minimumHarvestSize: 4,
    attributeChemical: 1,
    attributeFood: 1,
    attributeDefensive: 0,
    attributeColor: 2,
    attributeWeed: 0,
    attributes: ["Food", "Red"],
    defaultDrop: "Tomato",
    specialDrops: ["Max Tomato"],
}));

CropData.registerCrop(makeGTCrop({
    name: "Grape",
    tier: 4,
    maxSize: 4,
    growthStageAfterHarvest: 1,
    minimumHarvestSize: 4,
    attributeChemical: 1,
    attributeFood: 1,
    attributeDefensive: 0,
    attributeColor: 2,
    attributeWeed: 0,
    attributes: ["Food", "Purple"],
    defaultDrop: "Grape",
}));

CropData.registerCrop(makeGTCrop({
    name: "Onion",
    tier: 4,
    maxSize: 4,
    growthStageAfterHarvest: 1,
    minimumHarvestSize: 4,
    attributeChemical: 1,
    attributeFood: 1,
    attributeDefensive: 0,
    attributeColor: 2,
    attributeWeed: 0,
    attributes: ["Food", "Brown"],
    defaultDrop: "Onion",
}));

CropData.registerCrop(makeGTCrop({
    name: "Cucumber",
    tier: 4,
    maxSize: 4,
    growthStageAfterHarvest: 1,
    minimumHarvestSize: 4,
    attributeChemical: 1,
    attributeFood: 1,
    attributeDefensive: 0,
    attributeColor: 2,
    attributeWeed: 0,
    attributes: ["Food", "Green"],
    defaultDrop: "Cucumber",
}));

CropData.registerCrop(makeGTCrop({
    name: "Tea",
    tier: 4,
    maxSize: 4,
    growthStageAfterHarvest: 1,
    minimumHarvestSize: 4,
    attributeChemical: 1,
    attributeFood: 1,
    attributeDefensive: 0,
    attributeColor: 2,
    attributeWeed: 0,
    attributes: ["Food", "Green", "Ingredient"],
    defaultDrop: "Tea Leaf",
}));

CropData.registerCrop(makeGTCrop({
    name: "Rape",
    tier: 4,
    maxSize: 4,
    growthStageAfterHarvest: 1,
    minimumHarvestSize: 4,
    attributeChemical: 1,
    attributeFood: 1,
    attributeDefensive: 0,
    attributeColor: 2,
    attributeWeed: 0,
    attributes: ["Food", "Yellow", "Oil"],
    defaultDrop: "Rape",
}));

CropData.registerCrop(makeGTCrop({
    name: "Micadia",
    tier: 9,
    maxSize: 3,
    growthStageAfterHarvest: 2,
    minimumHarvestSize: 3,
    attributeChemical: 2,
    attributeFood: 0,
    attributeDefensive: 3,
    attributeColor: 0,
    attributeWeed: 0,
    attributes: ["Metal", "Pine", "Mica", "Bush"],
    defaultDrop: "Micadia Twig",
}));
