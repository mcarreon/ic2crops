import {
    CropData, 
    makeCppBasicCrop,
    makeCppBasicDecorationCrop,
} from './Database.js';

/* From src/main/java/com/github/bartimaeusnek/cropspp/crops/gregtechCrops/GarnydniaCrop.java:
 * the getGain method is a mess,
 * it has a few off-by-one errors that bias drops towards yellow garnets (51% vs 49%)
 * and, in 4% of the cases,
 * it fails to return a drop at all.
 */
CropData.registerCrop({
    ...makeCppBasicCrop({
        name: "Garnydinia",
        tier: 7,
        maxSize: 3,
    }),
    humidityWeight: 0.5,
    nutrientsWeight: 2.0,
    airQualityWeight: 0.5,
    attributeChemical: 4,
    attributeFood: 0,
    attributeDefensive: 2,
    attributeColor: 4,
    attributeWeed: 0,
    attributes: ["Shiny", "Crystal", "Red", "Yellow", "Metal"],
    foundationBlock: "Yellow/Red Garnet Block/Ore",
    growthStages: [300, 550, 0],
    minimumHarvestSize: 3,
    possibleDrops: [
        [['Exquisite Red Garnet', 1],       49/100 * 4/100],
        [['Exquisite Yellow Garnet', 1],    51/100 * 4/100],
        [['Red Garnet', 1],                 49/100 * 14/100],
        [['Yellow Garnet', 1],              51/100 * 14/100],
        [['Purified Garnet Sand', 1],                 1/100],
        [['Red Garnet Dust', 1],            49/100 * 38/100],
        [['Yellow Garnet Dust', 1],         51/100 * 38/100],
        [['Small Red Garnet Dust', 1],      49/100 * 18/100],
        [['Small Yellow Garnet Dust', 1],   51/100 * 18/100],
        [['Purified Red Garnet Ore', 1],    49/100 * 3/100],
        [['Purified Yellow Garnet Ore', 1], 51/100 * 3/100],
        [['Tiny Red Garnet Dust', 1],       49/100 * 18/100],
        [['Tiny Yellow Garnet Dust', 1],    51/100 * 18/100],
    ],
    growthStageAfterHarvest: 1,
});

function makeStonelilly({ // Base stonelilly, with combined attributes for all of them
    color = "",
    additionalAttribute = "",
}): CropData
{
    return {
        ...makeCppBasicDecorationCrop({
            name: `${color} Stonelilly`,
        }),
        attributes: ["Stone", additionalAttribute],
        growthStages: [300, 300, 0],
    }
}

let cropRedStonelilly: CropData = {
    ...makeStonelilly({
        color: "Red",
        additionalAttribute: "Fire",
    }),
    foundationBlock: "Red Granite (#stoneGraniteRed)",
    possibleDrops: [[['Red Granite Dust', 9], 1]],
};
CropData.registerCrop(cropRedStonelilly);
CropData.registerCrop({
    ...cropRedStonelilly,
    variantOf: cropRedStonelilly,
    name: "Red Stonelilly (with granite underneath)",
    foundationBlock: "Granite (Chisel)",
    possibleDrops: [[['Granite (Chisel)', 1], 1]],
});

let cropBlackStonelilly: CropData = {
    ...makeStonelilly({
        color: "Black",
        additionalAttribute: "Dark",
    }),
    foundationBlock: "Black Granite (#stoneGraniteBlack)",
    possibleDrops: [[['Black Granite Dust', 9], 1]],
};
CropData.registerCrop(cropBlackStonelilly);
CropData.registerCrop({
    ...cropBlackStonelilly,
    variantOf: cropBlackStonelilly,
    name: "Black Stonelilly (with basalt underneath)",
    foundationBlock: "Basalt",
    possibleDrops: [[['Basalt Dust', 9], 1]],
});

let cropWhiteStonelilly: CropData = {
    ...makeStonelilly({
        color: "White",
        additionalAttribute: "Shiny",
    }),
    foundationBlock: "Marble (#blockMarble)",
    possibleDrops: [[['Marble Dust', 9], 1]],
};
CropData.registerCrop(cropWhiteStonelilly);
CropData.registerCrop({
    ...cropWhiteStonelilly,
    variantOf: cropWhiteStonelilly,
    name: "White Stonelilly (with diorite underneath)",
    foundationBlock: "Diorite (#blockDiorite)",
    possibleDrops: [[['Diorite (Chisel)', 1], 1]],
});

let cropGrayStonelilly: CropData = {
    ...makeStonelilly({
        color: "Gray",
        additionalAttribute: "Metal",
    }),
    foundationBlock: "Stone or Cobblestone",
    possibleDrops: [[['Stone Dust', 9], 1]],
};
CropData.registerCrop(cropGrayStonelilly);
CropData.registerCrop({
    ...cropGrayStonelilly,
    variantOf: cropGrayStonelilly,
    name: "Gray Stonelilly (with andesite underneath)",
    foundationBlock: "Andesite (#blockAndesite)",
    possibleDrops: [[['Diorite (Chisel)', 1], 1]],
});

let cropYellowStonelilly: CropData = {
    ...makeStonelilly({
        color: "Yellow",
        additionalAttribute: "Alien",
    }),
    foundationBlock: "Sand or Sandstone",
    possibleDrops: [[['Sand', 4], 1]],
};
CropData.registerCrop(cropYellowStonelilly);
CropData.registerCrop({
    ...cropYellowStonelilly,
    variantOf: cropYellowStonelilly,
    name: "Yellow Stonelilly (with End Stone underneath)",
    foundationBlock: "End Stone",
    growthStages: [300, 550, 0],
    possibleDrops: [[['Endstone Dust', 2], 1]],
});

let cropNetherStonelilly: CropData = {
    ...makeStonelilly({
        color: "Nether",
        additionalAttribute: "Evil",
    }),
    foundationBlock: "Netherrack or Nether Brick",
    possibleDrops: [[['Netherrack Dust', 9], 1]],
};
CropData.registerCrop(cropNetherStonelilly);
