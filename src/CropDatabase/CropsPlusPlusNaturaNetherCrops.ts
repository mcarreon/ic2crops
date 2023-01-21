import {
    CropData,
    makeCppBasicNetherBerryCrop,
    makeCppBasicDecorationCrop,
} from './Database.js';
import { cropVine } from './CropsPlusPlusCppCrops.js';

function makeNetherShroomCrop({
    name = "",
    drop = "",
}): CropData
{
    return {
        ...makeCppBasicNetherBerryCrop({name, tier: 3}),
        attributeChemical: 1,
        attributeFood: 3,
        attributeDefensive: 0,
        attributeColor: 4,
        attributeWeed: 0,
        growthStages: [600, 0],
        minimumHarvestSize: 2,
        attributes: ["Food", "Mushroom", "Ingredient", "Nether"],
        possibleDrops: [[[drop, 1], 1]],
        growthStageAfterHarvest: 1,
    };
}

CropData.registerCrop(makeNetherShroomCrop({
    name: "Glowshroom",
    drop: "Glowshroom (Biomes O' Plenty)",
}));

CropData.registerCrop(makeNetherShroomCrop({
    name: "Blue Glowshroom",
    drop: "Blue Glowshroom (Natura)",
}));

CropData.registerCrop(makeNetherShroomCrop({
    name: "Green Glowshroom",
    drop: "Green Glowshroom (Natura)",
}));

CropData.registerCrop(makeNetherShroomCrop({
    name: "Purple Glowshroom",
    drop: "Purple Glowshroom (Natura)",
}));

CropData.registerCrop({
    ...makeCppBasicNetherBerryCrop({
        name: "Blightberry",
    }),
    attributes: ["Berry", "Toxic", "Bad", "Green", "Nether", "Addictive"],
    possibleDrops: [[["Blightberry", 2], 1]],
});

CropData.registerCrop({
    ...makeCppBasicNetherBerryCrop({
        name: "Duskberry",
    }),
    attributes: ["Berry", "Toxic", "Bad", "Gray", "Nether", "Addictive"],
    possibleDrops: [[["Duskberry", 2], 1]],
});

CropData.registerCrop({
    ...makeCppBasicNetherBerryCrop({
        name: "Skyberry",
    }),
    attributes: ["Berry", "Toxic", "Bad", "Blue", "Nether", "Addictive"],
    possibleDrops: [[["Skyberry", 2], 1]],
});

CropData.registerCrop({
    ...makeCppBasicNetherBerryCrop({
        name: "Stingberry",
    }),
    attributes: ["Berry", "Toxic", "Bad", "Green", "Nether", "Addictive"],
    possibleDrops: [[["Stingberry", 2], 1]],
});

CropData.registerCrop({
    ...cropVine,
    name: "Thornvines",
    tier: 3,
    gainFactor: makeCppBasicDecorationCrop({tier: 3}).gainFactor,
    possibleDrops: [[["Thornvines", 2], 1]],
    attributes: ["Nether", "Climbable", "Bad"],
});
