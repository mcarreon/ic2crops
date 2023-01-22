import {
    CropData,
    makeCppBasicCrop,
    makeCppBasicDecorationCrop,
    makeCppBasicTinkerBerryCrop
} from './Database.js';

let cropKnightmetal: CropData = {
    ...makeCppBasicTinkerBerryCrop({
        name: "Knightly Oreberry",
        tier: 8,
    }),
    attributes: ["OreBerry", "Knightly", "Metal"],
    foundationBlock: "Block of Knightmetal",
    growthStages: [1000, 4500, 4500, 0],
    possibleDrops: [[['Armor Shard', 4], 1]],
};
CropData.registerCrop(cropKnightmetal);
CropData.registerCrop({
    ...cropKnightmetal,
    variantOf: cropKnightmetal,
    name: "Knightly Oreberry (early harvest)",
    foundationBlock: "",
    growthStages: [1000, 4500, 0],
    possibleDrops: [[['Armor Shard', 1], 1]],
});

CropData.registerCrop({
    ...makeCppBasicDecorationCrop({
        name: "Moss",
        tier: 4,
    }),
    attributes: ["Green", "Climbable"],
    possibleDrops: [
        [["Moss Patch (Twilight Forest)", 1], 5/100],
        [["Moss (Biomes O' Plenty)", 1], 29/100],
        [["Tree Moss (Biomes O' Plenty)", 1], 66/100],
    ],
});

CropData.registerCrop({
    ...makeCppBasicCrop({
        name: "Torchberry",
        tier: 2,
    }),
    growthStageAfterHarvest: 2,
    attributeChemical: 2,
    attributeFood: 0,
    attributeDefensive: 0,
    attributeColor: 2,
    attributeWeed: 1,
    attributes: ["Berry", "Glow", "Shimmer"],
    growthStages: [100, 150, 150, 0],
    possibleDrops: [[["Torchberries", 1], 1]],
});
