import {
    CropData,
    makeCppBasicCrop,
    makeCppBasicBerryCrop,
    makeCppBasicDecorationCrop,
    makeCppBasicFoodCrop,
} from './Database.js';

import { cropVine } from './CropsPlusPlusCppCrops.js';

/* Source: src/main/java/com/github/bartimaeusnek/cropspp/crops/BoP/Bamboo.java
 * Bamboos drop one less bamboo if harvested as early as possible.
 */
let bambooCrop: CropData  = {
    ...makeCppBasicCrop({
        name: "Bamboo",
        tier: 2,
        maxSize: 3,
    }),
    attributeChemical: 0,
    attributeFood: 0,
    attributeDefensive: 3,
    attributeColor: 0,
    attributeWeed: 3,
    attributes: ["Green", "Pointed", "Edgy"],
    minimumHarvestSize: 2,
    possibleDrops: [[['Bamboo', 2], 1]],
    growthStages: [150, 150, 0],
};
CropData.registerCrop(bambooCrop);
CropData.registerCrop({
    ...bambooCrop,
    variantOf: bambooCrop,
    name: "Bamboo (early harvest)",
    minimumHarvestSize: 2,
    possibleDrops: [[['Bamboo', 1], 1]],
    growthStages: [150, 0],
});

CropData.registerCrop({
    ...makeCppBasicBerryCrop({
        name: "Berry",
        tier: 2,
        maxSize: 3,
    }),
    attributeChemical: 0,
    attributeFood: 4,
    attributeDefensive: 0,
    attributeColor: 4,
    attributeWeed: 0,
    minimumHarvestSize: 3,
    growthStages: [700, 200, 0],
    growthStageAfterHarvest: 2,
    possibleDrops: [[["Berry (Biomes O' Plenty)", 3], 1]],
    attributes: ["Berry", "Food", "Red", "Ingredient"],
});

CropData.registerCrop({
    ...makeCppBasicDecorationCrop({
        name: "Eyebulb",
    }),
    attributes: ["Nether", "Evil", "Bad"],
    possibleDrops: [[["Eyebulb", 3], 1]],
});

let cropFloweringVines: CropData = {
    ...cropVine,
    name: "Flowering Vines",
    tier: 3,
    growthStages: makeCppBasicDecorationCrop({tier: 3, maxSize: 4}).growthStages,
    gainFactor: makeCppBasicDecorationCrop({tier: 3}).gainFactor,
    attributes: ["Green", "Tendrilly", "Flower"],
    minimumHarvestSize: 3,
    possibleDrops: [[["Flowering Vines", 2], 1]],
};
CropData.registerCrop(cropFloweringVines);
CropData.registerCrop({
    ...cropFloweringVines,
    variantOf: cropFloweringVines,
    name: "Flowering Vines (early harvest)",
    growthStages: makeCppBasicDecorationCrop({tier: 3, maxSize: 3}).growthStages,
    possibleDrops: [[["Vines", 2], 1]],
});

let cropGlowflower: CropData = {
    ...makeCppBasicDecorationCrop({
        name: "Glowflower",
        tier: makeCppBasicDecorationCrop({}).tier + 2,
    }),
    attributes: ["Nether", "Light", "Shiny"],
    possibleDrops: [[["Glowflower (Biomes O' Plenty)", 1], 1]],
};
CropData.registerCrop(cropGlowflower);
CropData.registerCrop({
    ...cropGlowflower,
    variantOf: cropGlowflower,
    name: "Glowflower (with glowstone block underneath)",
    foundationBlock: "Glowstone",
    possibleDrops: [[["Glowflower (Biomes O' Plenty)", 2], 1]],
});

let cropGlowingEarthCoral: CropData = {
    ...makeCppBasicDecorationCrop({
        name: "Glowing Earth Coral",
        tier: makeCppBasicDecorationCrop({}).tier + 4,
    }),
    attributes: ["Water", "Light", "Shiny"],
    possibleDrops: [[["Glowing Coral", 1], 1]],
};
CropData.registerCrop(cropGlowingEarthCoral);
CropData.registerCrop({
    ...cropGlowingEarthCoral,
    variantOf: cropGlowingEarthCoral,
    name: "Glowing Earth Coral (with glowstone block underneath)",
    foundationBlock: "Glowstone",
    possibleDrops: [[["Glowing Coral", 2], 1]],
});

CropData.registerCrop({
    ...cropVine,
    name: "Ivy",
    tier: 2,
    growthStages: makeCppBasicDecorationCrop({tier: 2, maxSize: 3}).growthStages,
    gainFactor: makeCppBasicDecorationCrop({tier: 2}).gainFactor,
    attributes: ["Green", "Tendrilly", "Flower", "Bad", "Poison"],
    minimumHarvestSize: 3,
    possibleDrops: [[["Ivy", 2], 1]],
});

CropData.registerCrop({
    ...makeCppBasicFoodCrop({
        name: "Turnip",
    }),
    possibleDrops: [[["Turnip (Pam's Harvestcraft)", 1], 1]],
    attributes: ["Food", "Purple", "Carrots"],
});

CropData.registerCrop({
    ...makeCppBasicFoodCrop({
        name: "Wild Carrots",
    }),
    possibleDrops: [[["Wild Carrots", 1], 1]],
    attributes: ["Food", "White", "Carrots"],
});
