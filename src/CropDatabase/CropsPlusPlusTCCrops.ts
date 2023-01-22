import {
    CropData,
    makeCppBasicCrop,
    makeCppBasicThaumcraftCrop,
    makeCppBasicTinkerBerryCrop,
} from './Database.js';

/* Note: If the foundation block is a mixed crystal cluster,
 * the mana bean will have a random primal aspect;
 * otherwise it will have the same aspect as the foundation block.
 */
CropData.registerCrop({
    ...makeCppBasicThaumcraftCrop({
        name: "Mana Bean",
    }),
    attributeChemical: 0,
    attributeFood: 4,
    attributeDefensive: 0,
    attributeColor: 4,
    attributeWeed: 0,
    foundationBlock: "Crystal Cluster (any)",
    humidityWeight: 1.3,
    nutrientsWeight: 1.0,
    airQualityWeight: 0.7,
    growthStages: [800, 1200],
    attributes: ["Berry", "Bean", "Magic", "Colorful"],
    possibleDrops: [[["Mana Bean", 1], 1]],
});

CropData.registerCrop({
    ...makeCppBasicThaumcraftCrop({
        name: "Cinderpearl",
    }),
    attributes: ["Magic", "Blaze", "Nether"],
    growthStages: [2250, 1750, 0],
    foundationBlock: "Blaze Lamp",
    possibleDrops: [[["Cinderpearl", 1], 1]],
});

let cropMagicMetalBerry: CropData = {
    ...makeCppBasicTinkerBerryCrop({
        name: "Magic Metal Berry",
        tier: 7,
    }),
    foundationBlock: "Iron Block",
    minimumHarvestSize: 4,
    possibleDrops: [[['Thaumium Nugget', 1], 1]],
    growthStages: [500, 1200, 3300, 0],
};
CropData.registerCrop(cropMagicMetalBerry);
CropData.registerCrop({
    ...cropMagicMetalBerry,
    variantOf: cropMagicMetalBerry,
    name: "Magic Metal Berry (with Thaumium Block underneath)",
    foundationBlock: "Thaumium Block",
    possibleDrops: [[['Thaumium Nugget', 1], 1]],
    growthStages: [500, 1200, 1800, 0],
});
CropData.registerCrop({
    ...cropMagicMetalBerry,
    variantOf: cropMagicMetalBerry,
    name: "Magic Metal Berry (with Thauminite Block underneath)",
    foundationBlock: "Thauminite Block",
    possibleDrops: [[['Thauminite Nugget', 1], 1]],
    growthStages: [500, 1200, 3300, 0],
});
CropData.registerCrop({
    ...cropMagicMetalBerry,
    variantOf: cropMagicMetalBerry,
    name: "Magic Metal Berry (with Void Block underneath)",
    foundationBlock: "Void metal Block",
    possibleDrops: [[['Void Nugget', 1], 1]],
    growthStages: [500, 1200, 3300, 0],
});


// Config value: berriespp.cfg > gain > I:"Primordial Berry growth time"
let primordialBerryGrowth = 125000;

// Config value: berriespp.cfg > gain > D:"Primordial Berry"
let primordialBerryGain = 0.5;

export let cropPrimordialPearl: CropData = {
    ...makeCppBasicCrop({
        name: "Primordial Berry",
        tier: 16,
        maxSize: 4,
    }),
    attributeChemical: 0,
    attributeFood: 0,
    attributeDefensive: 0,
    attributeColor: 12,
    attributeWeed: 0,
    minimumHarvestSize: 4,
    humidityWeight: 2.0,
    nutrientsWeight: 2.0,
    airQualityWeight: 2.0,
    growthStages: [primordialBerryGrowth, primordialBerryGrowth, primordialBerryGrowth, 0],
    gainFactor: primordialBerryGain,
    growthStageAfterHarvest: 1,
    minimumCrossSize: 'never',
    possibleDrops: [[['Primordial Pearl', 1], 1]],
    attributes: ["Berry", "Primordial", "Magic", "Unique"],
};
CropData.registerCrop(cropPrimordialPearl);

CropData.registerCrop({
    ...makeCppBasicThaumcraftCrop({
        name: "Shimmerleaf",
    }),
    attributes: ["Magic", "Silver", "Toxit"],
    growthStages: [2250, 1750, 0],
    foundationBlock: "Quicksilver Block",
    possibleDrops: [[["Shimmerleaf", 1], 1]],
});
