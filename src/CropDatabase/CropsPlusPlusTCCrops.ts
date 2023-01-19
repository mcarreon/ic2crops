import {
    CropData,
    makeCppBasicCrop,
} from './Database.js';

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
