import {
    CropData,
    makeCppBasicBerryCrop,
    makeCppBasicCrop,
    makeCppBasicDecorationCrop,
    makeCppBasicFoodCrop,
    makeCppBasicTinkerBerryCrop,
} from './Database.js';
import { cropPrimordialPearl } from './CropsPlusPlusTCCrops.js';

/* Ardite berries drop one ardite nugget regardless of when it is harvested.
 */
let cropArditeBerry: CropData = {
    ...makeCppBasicTinkerBerryCrop({
        name: "Ardite Berry",
        tier: 7,
    }),
    foundationBlock: "Ardite Block",
    possibleDrops: [[['Ardite Nugget', 1], 1]],
    growthStages: [500, 3000, 3000, 0],
    attributes: ["OreBerry", "Ardite", "Metal", "Orange"],
};
CropData.registerCrop(cropArditeBerry);
CropData.registerCrop({
    ...cropArditeBerry,
    variantOf: cropArditeBerry,
    name: "Ardite Berry (early harvest)",
    possibleDrops: [[['Ardite Nugget', 1], 1]],
    growthStages: [500, 3000, 0],
});

/* Bonsais are created in src/main/java/com/github/bartimaeusnek/cropspp/crops/cpp/Bonsais.java.
 * There's also code for a generic bonsai generator
 * (in src/main/java/com/github/bartimaeusnek/cropspp/crops/cpp/tree/)
 * but this code is unused at the moment.
 */
function makeBonsai({
    treeName = "Unnamed Tree",
    tier = 1, // All tiers are the same
    attributes = ["Tree", "Bonsai", "Leavy"],
    drops = [] as string[], // defaults to ['Log Name', 'Sapling Name']; first must be the wood
    chances = [80, 30], // Value from the code
}): CropData
{
    if(drops.length == 0)
        drops = [`${treeName} Wood`, `${treeName} Sapling`];

    chances.push(0); // Sentinel value
    let baseDrops: [[string, number], number][] = drops.map(
        (drop, i) => [[drop, 1], (chances[i]!-chances[i+1]!)/Math.max(...chances)]
    );
    baseDrops[0]![0][1] = 10; // baseDrops[0] is the log type; the base count is 10

    let possibleDrops: [[string, number], number][] = [];
    for(let [[dropName, dropCount], dropProbability] of baseDrops) {
        const moreorless = 4;
        possibleDrops.push([[dropName, dropCount], dropProbability/4]);
        for(let i = 0; i < moreorless; i++) {
            possibleDrops.push([[dropName, dropCount+i], dropProbability/2/moreorless]);
        }
        for(let i = 0; i < moreorless; i++) {
            if(dropCount-i >= 0) {
                possibleDrops.push([[dropName, dropCount-i], dropProbability/4/moreorless]);
            } else {
                // TODO: figure out what happens and how to handle null drops
            }
        }
    }

    let maxSize = 3;
    let growthStages = makeCppBasicCrop({tier, maxSize}).growthStages.map(s => 3 * s);

    return {
        ...makeCppBasicCrop({name: `${treeName} Bonsai`, tier, maxSize}),
        attributeChemical: 0,
        attributeFood: 0,
        attributeDefensive: 0,
        attributeColor: 1,
        attributeWeed: 0,
        attributes,
        possibleDrops,
        growthStages,
    };
}

CropData.registerCrop(makeBonsai({
    treeName: "Oak",
    attributes: ["Tree", "Bonsai", "Leavy", "Food"],
    drops: ['Oak Wood', 'Oak Sapling', 'Apple'],
    chances: [100, 50, 10],
}));
CropData.registerCrop(makeBonsai({treeName: "Spruce"}));
CropData.registerCrop(makeBonsai({treeName: "Birch"}));
CropData.registerCrop(makeBonsai({treeName: "Jungle"}));
CropData.registerCrop(makeBonsai({treeName: "Acacia"}));
CropData.registerCrop(makeBonsai({treeName: "Dark Oak"}));

let cactusCrop: CropData = {
    ...makeCppBasicDecorationCrop({
        name: "Cactus",
        tier: 3,
    }),
    attributes: ["Green", "Cactus"],
    possibleDrops: [[["Cactus", 1], 1]],
    minimumHarvestSize: 2,
    humidityWeight: 0.5,
    nutrientsWeight: 1.25,
    airQualityWeight: 1.25,
};
CropData.registerCrop(cactusCrop);
CropData.registerCrop({
    ...cactusCrop,
    variantOf: cactusCrop,
    name: "Cactus (early harvest)",
    growthStages: makeCppBasicDecorationCrop({tier:3, maxSize: 2}).growthStages,
    possibleDrops: [[["Tiny Cactus", 1], 1]],
});

/* Cobalt berries drop one ardite nugget regardless of when it is harvested.
 */
let cropCobaltBerry: CropData = {
    ...makeCppBasicTinkerBerryCrop({
        name: "Cobalt Berry",
        tier: 7,
    }),
    foundationBlock: "Cobalt Block",
    possibleDrops: [[['Cobalt Nugget', 1], 1]],
    growthStages: [500, 3000, 3000, 0],
    attributes: ["OreBerry", "Cobalt", "Metal", "Blue"],
};
CropData.registerCrop(cropCobaltBerry);
CropData.registerCrop({
    ...cropCobaltBerry,
    variantOf: cropCobaltBerry,
    name: "Cobalt Berry (early harvest)",
    possibleDrops: [[['Cobalt Nugget', 1], 1]],
    growthStages: [500, 3000, 0],
});

CropData.registerCrop({
    ...makeCppBasicDecorationCrop({
        name: "Goldfish Plant",
        tier: 4,
    }),
    attributes: ["Nether", "Fish", "Food", "Bad", "Water"],
    growthStages: makeCppBasicDecorationCrop({tier: 4}).growthStages.map(s => s == 0 ? 0 : 225),
    possibleDrops: [[['Goldfish', 1], 1]],
});

let cropGrass: CropData = {
    ...makeCppBasicDecorationCrop({
        name: "Grass",
        tier: 0,
        maxSize: 4,
    }),
    minimumHarvestSize: 2,
    growthStageAfterHarvest: 3,
    attributeChemical: 0,
    attributeFood: 0,
    attributeDefensive: 0,
    attributeColor: 3,
    attributeWeed: 4,
    attributes: ["Green", "Bad"],
    possibleDrops: [[['Dead Bush', 1], 1]],
};
CropData.registerCrop(cropGrass);
CropData.registerCrop({
    ...cropGrass,
    variantOf: cropGrass,
    growthStages: makeCppBasicDecorationCrop({tier: 0, maxSize: 2}).growthStages,
    growthStageAfterHarvest: 1,
    possibleDrops: [
        [['Double Tallgrass', 1], 1/10],
        [['Grass (Minecraft)', 1], 9/10],
    ],
});

CropData.registerCrop({
    ...makeCppBasicBerryCrop({
        name: "Huckleberry",
    }),
    attributes: ["Berry", "Food", "Purple", "Leaves"],
    possibleDrops: [[['Huckleberry', 1], 1]],
});

CropData.registerCrop({
    ...cropPrimordialPearl,
    name: "Magical Nightshade",
    tier: 13,
    minimumCrossSize: cropPrimordialPearl.growthStages.length,
    growthStages: cropPrimordialPearl.growthStages.map(s => Math.floor(s/16)),
    gainFactor: Math.pow(0.95, 13) * cropPrimordialPearl.gainFactor * 1.5,
    foundationBlock: "Ichorium Block",
    growthStageAfterHarvest: 1,
    possibleDrops: [[['Magic Essence', 1], 1]],
});

CropData.registerCrop({
    ...makeCppBasicDecorationCrop({
        tier: 5,
        name: "Papyrus",
    }),
    possibleDrops: [[['Paper', 1], 1]],
    attributes: ["White", "Paper"],
});

CropData.registerCrop({
    ...makeCppBasicCrop({
        name: "Space Plant",
        tier: 13,
        maxSize: 4,
    }),
    growthStages: [5000, 5000, 5000, 0],
    attributeChemical: 8,
    attributeFood: 0,
    attributeDefensive: 0,
    attributeColor: 4,
    attributeWeed: 0,
    attributes: ["Alien", "Space", "Radiation", "Transform"],
    foundationBlock: "Any moonBlock",
    minimumHarvestSize: 4,
    possibleDrops: [[["Space Flower", 1], 1]],
});

CropData.registerCrop({
    ...makeCppBasicBerryCrop({
        name: "Strawberry",
    }),
    attributes: ["Berry", "Food", "Red"],
    possibleDrops: [[["Strawberry", 1], 1]],
});

CropData.registerCrop({
    ...makeCppBasicFoodCrop({
        name: "Sugar Beet",
        tier: 4,
    }),
    attributes: ["Food", "White", "Ingredient"],
    possibleDrops: [[["Sugar Beet", 1], 1]],
});

/* FloweringVines extends this crop. */
export let cropVine: CropData = {
    ...makeCppBasicDecorationCrop({
        tier: 2,
        name: "Vines",
    }),
    attributes: ["Green", "Tendrilly"],
    possibleDrops: [[['Vines', 2], 1]],
};
CropData.registerCrop(cropVine);

let cropWaterlilly: CropData = {
    ...makeCppBasicDecorationCrop({
        tier: 2,
        name: "Waterlilly",
    }),
    growthStages: makeCppBasicDecorationCrop({tier: 2}).growthStages.map(s => s === 0 ? 0 : 550),
    attributes: ["Blue", "Water", "Green"],
    possibleDrops: [
        [['Pink Dye', 1], 1/10],
        [['Lily Pad', 1], 9/10],
    ],
};
CropData.registerCrop(cropWaterlilly);
CropData.registerCrop({
    ...cropWaterlilly,
    variantOf: cropWaterlilly,
    name: "Waterlilly (with water block underneath)",
    foundationBlock: "Water",
    growthStages: makeCppBasicDecorationCrop({tier: 2}).growthStages.map(s => s === 0 ? 0 : 225),
});

/* There's also code for a Weed Crop that just copies IC2's weed crop,
 * but this crop is never registered.
 */
