import {
    CropData, 
    makeCppBasicCrop,
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
        [['Yellow Garnet Dest', 1],         51/100 * 38/100],
        [['Small Red Garnet Dust', 1],      49/100 * 18/100],
        [['Small Yellow Garnet Dest', 1],   51/100 * 18/100],
        [['Purified Red Garnet Ore', 1],    49/100 * 3/100],
        [['Purified Yellow Garnet Ore', 1], 51/100 * 3/100],
        [['Tiny Red Garnet Dust', 1],       49/100 * 18/100],
        [['Tiny Yellow Garnet Dest', 1],    51/100 * 18/100],
    ],
    growthStageAfterHarvest: 1,
});
