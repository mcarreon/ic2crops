import { CropData, makeCppBasicTinkerBerryCrop } from './Database.js';

let cropAluminiumOreberry: CropData = {
    ...makeCppBasicTinkerBerryCrop({
        name: "Aluminium Oreberry",
    }),
    foundationBlock: "Aluminium Block",
    possibleDrops: [[['Aluminum Oreberry', 6], 1]],
    growthStages: [500, 3000, 3000, 0],
    attributes: ["OreBerry", "Aluminium", "Metal", "Aluminum"],
}
CropData.registerCrop(cropAluminiumOreberry);
CropData.registerCrop({
    ...cropAluminiumOreberry,
    variantOf: cropAluminiumOreberry,
    name: "Aluminium Oreberry (early harvest)",
    foundationBlock: "",
    possibleDrops: [[['Aluminum Oreberry', 2], 1]],
    growthStages: [500, 3000, 0],
});

let cropCopperOreberry: CropData = {
    ...makeCppBasicTinkerBerryCrop({
        name: "Copper Oreberry",
    }),
    foundationBlock: "Copper Block",
    possibleDrops: [[['Copper Oreberry', 6], 1]],
    growthStages: [500, 3000, 3000, 0],
    attributes: ["OreBerry", "Copper", "Metal", "Shiny"],
}
CropData.registerCrop(cropCopperOreberry);
CropData.registerCrop({
    ...cropCopperOreberry,
    variantOf: cropCopperOreberry,
    name: "Copper Oreberry (early harvest)",
    foundationBlock: "",
    possibleDrops: [[['Copper Oreberry', 2], 1]],
    growthStages: [500, 3000, 0],
});

let cropEssenceOreberry: CropData = {
    ...makeCppBasicTinkerBerryCrop({
        name: "Essence Berry",
    }),
    foundationBlock: "Enderman Head", // It's a bug, it should work with all heads
    possibleDrops: [[['Essence Oreberry', 6], 1]],
    growthStages: [500, 3000, 3000, 0],
    attributes: ["OreBerry", "Essence", "Undead"],
}
CropData.registerCrop(cropEssenceOreberry);
CropData.registerCrop({
    ...cropEssenceOreberry,
    variantOf: cropEssenceOreberry,
    name: "Essence Oreberry (early harvest)",
    foundationBlock: "",
    possibleDrops: [[['Essence Oreberry', 2], 1]],
    growthStages: [500, 3000, 0],
});

let cropGoldOreberry: CropData = {
    ...makeCppBasicTinkerBerryCrop({
        name: "Gold Oreberry",
    }),
    foundationBlock: "Gold Block",
    possibleDrops: [[['Gold Oreberry', 6], 1]],
    growthStages: [500, 3000, 3000, 0],
    attributes: ["OreBerry", "Gold", "Metal"],
}
CropData.registerCrop(cropGoldOreberry);
CropData.registerCrop({
    ...cropGoldOreberry,
    variantOf: cropGoldOreberry,
    name: "Gold Oreberry (early harvest)",
    foundationBlock: "",
    possibleDrops: [[['Gold Oreberry', 2], 1]],
    growthStages: [500, 3000, 0],
});

let cropIronOreberry: CropData = {
    ...makeCppBasicTinkerBerryCrop({
        name: "Iron Oreberry",
    }),
    foundationBlock: "Iron Block",
    possibleDrops: [[['Iron Oreberry', 6], 1]],
    growthStages: [500, 3000, 3000, 0],
    attributes: ["OreBerry", "Iron", "Metal"],
}
CropData.registerCrop(cropIronOreberry);
CropData.registerCrop({
    ...cropIronOreberry,
    variantOf: cropIronOreberry,
    name: "Iron Oreberry (early harvest)",
    foundationBlock: "",
    possibleDrops: [[['Iron Oreberry', 2], 1]],
    growthStages: [500, 3000, 0],
});

let cropTinOreberry: CropData = {
    ...makeCppBasicTinkerBerryCrop({
        name: "Tin Oreberry",
        tier: 4,
    }),
    foundationBlock: "Tin Block",
    possibleDrops: [[['Tin Oreberry', 6], 1]],
    growthStages: [500, 3000, 3000, 0],
    attributes: ["OreBerry", "Tin", "Metal", "Shiny"],
}
CropData.registerCrop(cropTinOreberry);
CropData.registerCrop({
    ...cropTinOreberry,
    variantOf: cropTinOreberry,
    name: "Tin Oreberry (early harvest)",
    foundationBlock: "",
    possibleDrops: [[['Tin Oreberry', 2], 1]],
    growthStages: [500, 3000, 0],
});
