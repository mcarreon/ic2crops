import {
    CropData,
    makeCppBasicFoodCrop,
    makeCppBasicBerryCrop,
    makeCppBasicDecorationCrop,
} from './Database.js';
import { cactusCrop } from './CropsPlusPlusCppCrops.js';

CropData.registerCrop({
    ...makeCppBasicFoodCrop({
        name: "Barley",
        tier: 2,
        maxSize: 4,
    }),
    attributes: ["Green", "Food", "Wheat"],
    minimumHarvestSize: 4,
    possibleDrops: [[["Barley (Pam's Harvestcraft)", 1], 1]],
});

CropData.registerCrop({
    ...makeCppBasicBerryCrop({
        name: "Blackberry",
    }),
    attributes: ["Berry", "Food", "Black"],
    minimumHarvestSize: 4,
    possibleDrops: [[['Blackberry (Natura)', 3], 1]],
});

CropData.registerCrop({
    ...makeCppBasicBerryCrop({
        name: "Blueberry",
    }),
    attributes: ["Berry", "Food", "Blue"],
    minimumHarvestSize: 4,
    possibleDrops: [[['Blueberry (Natura)', 3], 1]],
});

CropData.registerCrop({
    ...makeCppBasicDecorationCrop({
        name: "Cotton",
        tier: 3,
        maxSize: 5,
    }),
    attributeChemical: 4,
    attributeFood: 4,
    attributeDefensive: 0,
    attributeColor: 0,
    attributeWeed: 2,
    attributes: ["White", "Cotton"],
    minimumHarvestSize: 5,
    possibleDrops: [[['Cotton (Natura)', 1], 1]],
});

CropData.registerCrop({
    ...makeCppBasicBerryCrop({
        name: "Maloberry",
    }),
    attributes: ["Berry", "Food", "Yellow"],
    minimumHarvestSize: 4,
    possibleDrops: [[['Maloberry (Natura)', 3], 1]],
});


CropData.registerCrop({
    ...makeCppBasicBerryCrop({
        name: "Raspberry",
    }),
    attributes: ["Berry", "Food", "Red"],
    minimumHarvestSize: 4,
    possibleDrops: [[['Raspberry (Natura)', 3], 1]],
});

let saguaroCactusCrop: CropData = {
    ...cactusCrop,
    tier: 4,
    gainFactor: makeCppBasicDecorationCrop({tier: 4}).gainFactor,
    name: "Saguaro Cactus",
    attributes: ["Green", "Food", "Cactus"],
    possibleDrops: [[['Saguaro Fruit (Natura)', 3], 1]],
    growthStages: [225, 225, 450, 0],
    minimumHarvestSize: 2,
    growthStageAfterHarvest: 2,
};
CropData.registerCrop(saguaroCactusCrop);
CropData.registerCrop({
    ...saguaroCactusCrop,
    variantOf: saguaroCactusCrop,
    name: "Saguaro Cactus (early harvest)",
    possibleDrops: [[['Saguaro Cactus (Natura)', 2], 1]],
    growthStages: [225, 225, 0],
    growthStageAfterHarvest: 1,
});
