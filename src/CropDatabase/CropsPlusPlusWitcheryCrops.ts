import {
    CropData,
    makeCppBasicWitcheryCrop,
} from './Database.js';

CropData.registerCrop({
    ...makeCppBasicWitcheryCrop({
        name: "Belladonna",
    }),
    attributes: ["Purple", "Flower", "Toxic", "Ingredient"],
    possibleDrops: [[['Belladonna', 1], 1]],
});

CropData.registerCrop({
    ...makeCppBasicWitcheryCrop({
        name: "Ember Moss",
        tier: 7,
    }),
    attributes: ["Fire", "Ingredient", "Bad", "Climbable"],
    possibleDrops: [[['Ember Moss', 1], 1]],
});

CropData.registerCrop({
    ...makeCppBasicWitcheryCrop({
        name: "Garlic",
        tier: makeCppBasicWitcheryCrop({}).tier + 2,
    }),
    attributes: ["Food", "Ingredient", "Healing"],
    possibleDrops: [[['Garlic (Witchery)', 1], 1]],
});

CropData.registerCrop({
    ...makeCppBasicWitcheryCrop({
        name: "Glint Weed",
    }),
    attributes: ["Orange", "Flower", "Magic"],
    possibleDrops: [[['Glint Weed', 1], 1]],
});

let berryGain = 1; // Config value: berriespp.cfg > gain > D:"All crops"
CropData.registerCrop({
    ...makeCppBasicWitcheryCrop({
        name: "Mandragora",
    }),
    attributes: ["Flower", "Magic", "Bad", "Toxic", "Ingredient"],
    possibleDrops: [[['Mandrake Root', 1], 1]],
    gainFactor: Math.pow(0.95, makeCppBasicWitcheryCrop({}).tier) * berryGain,
});

CropData.registerCrop({
    ...makeCppBasicWitcheryCrop({
        name: "Snowbell",
    }),
    attributes: ["White", "Flower", "Ice", "Toxic", "Ingredient"],
    possibleDrops: [[['Icy Needle', 1], 1]],
});

CropData.registerCrop({
    ...makeCppBasicWitcheryCrop({
        name: "Spanish Moss",
        tier: 7,
    }),
    attributes: ["Green", "Climbable", "Magic"],
    possibleDrops: [[['Spanish Moss', 1], 1]],
});

CropData.registerCrop({
    ...makeCppBasicWitcheryCrop({
        name: "Artichoke",
    }),
    attributes: ["Flower", "Water", "Blue", "Ingredient"],
    possibleDrops: [[['Water Artichoke Globe', 1], 1]],
});
