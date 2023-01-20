import { CropData, makeDefaultCrop, makeIC2FlowerCrop } from './Database.js';

CropData.registerCrop(makeIC2FlowerCrop({
    name: "Dandelion",
    attributes: ["Yellow", "Flower"],
    drop: "Dandelion Yellow",
}));

CropData.registerCrop(makeIC2FlowerCrop({
    name: "Rose",
    attributes: ["Red", "Flower", "Rose"],
    drop: "Rose Red",
}));

CropData.registerCrop(makeIC2FlowerCrop({
    name: "Blackthorn",
    attributes: ["Black", "Flower", "Rose"],
    drop: "Ink Sac",
}));

CropData.registerCrop(makeIC2FlowerCrop({
    name: "Tulip",
    attributes: ["Purple", "Flower", "Tulip"],
    drop: "Purple Dye",
}));

CropData.registerCrop(makeIC2FlowerCrop({
    name: "Cyazint",
    attributes: ["Blue", "Flower"],
    drop: "Cyan Dye",
}));

CropData.registerCrop({
    ...makeDefaultCrop({
        name: "Aurelia",
        tier: 8,
        maxSize: 5,
    }),
    attributeChemical: 2,
    attributeFood: 0,
    attributeDefensive: 0,
    attributeColor: 2,
    attributeWeed: 0,
    attributes: ["Gold", "Leaves", "Metal"],
    foundationBlock: "Gold Block or Gold Ore",
    minimumHarvestSize: 5,
    // Plain IC2 Aurelia drops tiny piles of gold dust, GT5 makes it drop aurelia leaves
    possibleDrops: [[["Aurelia Leaf", 1], 1]],
    growthStages: [750, 750, 750, 2200, 0],
    growthStageAfterHarvest: 2,
});

CropData.registerCrop({
    ...makeDefaultCrop({
        name: "Brown Mushroom (IC2)",
        tier: 2,
        maxSize: 3,
    }),
    attributeChemical: 0,
    attributeFood: 4,
    attributeDefensive: 0,
    attributeColor: 0,
    attributeWeed: 4,
    attributes: ["Brown", "Food", "Mushroom"],
    minimumHarvestSize: 3,
    possibleDrops: [[["Brown Mushroom", 1], 1]],
    growthStages: [200, 200, 0],
});

CropData.registerCrop({
    ...makeDefaultCrop({
        name: "Carrot",
        tier: 2,
        maxSize: 3,
    }),
    attributeChemical: 0,
    attributeFood: 4,
    attributeDefensive: 0,
    attributeColor: 0,
    attributeWeed: 2,
    attributes: ["Orange", "Food", "Carrots"],
    minimumHarvestSize: 3,
    possibleDrops: [[["Carrot", 1], 1]],
});

CropData.registerCrop({
    ...makeDefaultCrop({
        name: "Cocoa",
        tier: 3,
        maxSize: 4,
    }),
    attributeChemical: 1,
    attributeFood: 3,
    attributeDefensive: 0,
    attributeColor: 4,
    attributeWeed: 0,
    attributes: ["Brown", "Food", "Stem"],
    humidityWeight: 0.8,
    nutrientsWeight: 1.3,
    airQualityWeight: 0.9,
    minimumHarvestSize: 4,
    possibleDrops: [[["Cocoa Beans", 1], 1]],
    growthStages: [400, 400, 900, 0],
    growthStageAfterHarvest: 3,
});

CropData.registerCrop({
    ...makeDefaultCrop({
        name: "Coffee",
        tier: 7,
        maxSize: 5,
    }),
    attributeChemical: 1,
    attributeFood: 4,
    attributeDefensive: 1,
    attributeColor: 2,
    attributeWeed: 0,
    attributes: ["Leaves", "Ingredient", "Beans"],
    humidityWeight: 0.4,
    nutrientsWeight: 1.4,
    airQualityWeight: 1.2,
    minimumHarvestSize: 4,
    growthStages: [1400, 1400, 750, 2100, 0],
    possibleDrops: [[["Coffee Beans", 1], 1]],
    growthStageAfterHarvest: 3,
});

CropData.registerCrop({
    ...makeDefaultCrop({
        name: "Cyprium",
        tier: 8,
        maxSize: 4,
    }),
    attributeChemical: 2,
    attributeFood: 0,
    attributeDefensive: 0,
    attributeColor: 1,
    attributeWeed: 0,
    attributes: ["Orange", "Leaves", "Metal"],
    foundationBlock: "Copper Block or Copper Ore",
    minimumHarvestSize: 4,
    possibleDrops: [[["Tiny Pile of Copper Dust", 1], 1]],
    growthStages: [800, 800, 2000, 0],
    growthStageAfterHarvest: 2,
});

CropData.registerCrop({
    ...makeDefaultCrop({
        name: "Eating Plant",
        tier: 6,
        maxSize: 6,
    }),
    attributeChemical: 1,
    attributeFood: 1,
    attributeDefensive: 3,
    attributeColor: 1,
    attributeWeed: 4,
    attributes: ["Bad", "Food"],
    foundationBlock: "Lava",
    minimumHarvestSize: 4,
    possibleDrops: [[["Cactus", 1], 1]],
});

CropData.registerCrop({
    ...makeDefaultCrop({
        name: "Ferru",
        tier: 6,
        maxSize: 4,
    }),
    attributeChemical: 2,
    attributeFood: 0,
    attributeDefensive: 0,
    attributeColor: 1,
    attributeWeed: 0,
    attributes: ["Gray", "Leaves", "Metal"],
    foundationBlock: "Iron Block or Iron Ore",
    minimumHarvestSize: 4,
    // Plain IC2 Ferru drops tiny piles of gold dust, GT5 makes it drop ferru leaves
    possibleDrops: [[["Ferru Leaf", 1], 1]],
    gainFactor: makeDefaultCrop({tier: 6}).gainFactor / 2,
    growthStages: [800, 800, 2200, 0],
    growthStageAfterHarvest: 2,
});

CropData.registerCrop({
    ...makeDefaultCrop({
        name: "Hops",
        tier: 5,
        maxSize: 7,
    }),
    attributeChemical: 2,
    attributeFood: 2,
    attributeDefensive: 0,
    attributeColor: 1,
    attributeWeed: 1,
    attributes: ["Green", "Ingredient", "Wheat"],
    minimumHarvestSize: 7,
    possibleDrops: [[["Hops", 1], 1]],
    growthStages: [600, 600, 600, 600, 600, 600, 0],
    growthStageAfterHarvest: 3,
});

CropData.registerCrop({
    ...makeDefaultCrop({
        name: "Melon",
        tier: 2,
        maxSize: 4,
    }),
    attributeChemical: 0,
    attributeFood: 4,
    attributeDefensive: 0,
    attributeColor: 2,
    attributeWeed: 0,
    attributes: ["Green", "Ingredient", "Stem"],
    humidityWeight: 1.1,
    nutrientsWeight: 0.9,
    airQualityWeight: 1.0,
    minimumHarvestSize: 4,
    possibleDrops: [
        [['Melon Block', 1], 1/3],
        [['Melon Slice', 2], 2/3*1/4],
        [['Melon Slice', 3], 2/3*1/4],
        [['Melon Slice', 4], 2/3*1/4],
        [['Melon Slice', 5], 2/3*1/4],
    ],
    growthStages: [250, 250, 700, 0],
    growthStageAfterHarvest: 3,
});

CropData.registerCrop({
    ...makeDefaultCrop({
        name: "Nether Wart",
        tier: 5,
        maxSize: 3,
    }),
    attributeChemical: 4,
    attributeFood: 2,
    attributeDefensive: 0,
    attributeColor: 2,
    attributeWeed: 1,
    attributes: ["Red", "Nether", "Ingredient", "Soulsand"],
    minimumHarvestSize: 3,
    gainFactor: 2,
    possibleDrops: [[['Nether Wart', 1], 1]],
});

CropData.registerCrop({
    ...makeDefaultCrop({
        name: "Plumbiscus",
        tier: 6,
        maxSize: 4,
    }),
    attributeChemical: 2,
    attributeFood: 0,
    attributeDefensive: 0,
    attributeColor: 1,
    attributeWeed: 0,
    attributes: ["Dense", "Leaves", "Metal"],
    foundationBlock: "Lead Block or Lead Ore",
    minimumHarvestSize: 4,
    possibleDrops: [[["Tiny Pile of Lead Dust", 1], 1]],
    gainFactor: makeDefaultCrop({tier: 6}).gainFactor / 2,
    growthStages: [800, 800, 2000],
    growthStageAfterHarvest: 2,
});

/* Last-stage potatos drop poisonous potatos.
 */
let cropPotato: CropData = {
    ...makeDefaultCrop({
        name: "Potato",
        tier: 2,
        maxSize: 4,
    }),
    attributeChemical: 0,
    attributeFood: 4,
    attributeDefensive: 0,
    attributeColor: 0,
    attributeWeed: 2,
    attributes: ["Yellow", "Food", "Potato"],
    minimumHarvestSize: 3,
    possibleDrops: [[["Poisonous Potato", 1], 1]],
    growthStageAfterHarvest: 1,
};
CropData.registerCrop(cropPotato);
CropData.registerCrop({
    ...cropPotato,
    variantOf: cropPotato,
    name: "Potato (early harvest)",
    growthStages: makeDefaultCrop({tier: 2, maxSize: 3}).growthStages,
    possibleDrops: [[["Potato", 1], 1]],
});


CropData.registerCrop({
    ...makeDefaultCrop({
        name: "Pumpkin",
        tier: 1,
        maxSize: 4,
    }),
    attributeChemical: 0,
    attributeFood: 1,
    attributeDefensive: 0,
    attributeColor: 3,
    attributeWeed: 1,
    attributes: ["Orange", "Decoration", "Stem"],
    humidityWeight: 1.1,
    nutrientsWeight: 0.9,
    airQualityWeight: 1.0,
    minimumHarvestSize: 4,
    possibleDrops: [[["Pumpkin", 1], 1]],
    growthStages: [200, 200, 600, 0],
    growthStageAfterHarvest: 3,
});

CropData.registerCrop({
    ...makeDefaultCrop({
        name: "Red Mushroom (IC2)",
        tier: 2,
        maxSize: 3,
    }),
    attributeChemical: 0,
    attributeFood: 4,
    attributeDefensive: 0,
    attributeColor: 0,
    attributeWeed: 4,
    attributes: ["Red", "Food", "Mushroom"],
    growthStages: [200, 200, 0],
    minimumHarvestSize: 3,
    possibleDrops: [[["Red Mushroom", 1], 1]],
});

/* If the crop block is not powered by redstone,
 * Redwheats have 50% of chance of dropping wheat instead of redstone dust.
 */
let cropRedWheat: CropData = {
    ...makeDefaultCrop({
        name: "Redwheat",
        tier: 6,
        maxSize: 7,
    }),
    attributeChemical: 3,
    attributeFood: 0,
    attributeDefensive: 0,
    attributeColor: 2,
    attributeWeed: 0,
    attributes: ["Red", "Redstone", "Wheat"],
    minimumHarvestSize: 7,
    gainFactor: 0.5,
    possibleDrops: [
        [["Redstone dust", 1], 1/2],
        [["Wheat", 1], 1/2]
    ],
    growthStages: [600, 600, 600, 600, 600, 600, 0],
    growthStageAfterHarvest: 2,
};
CropData.registerCrop(cropRedWheat);
CropData.registerCrop({
    ...cropRedWheat,
    variantOf: cropRedWheat,
    name: "Redwheat (powered by redstone)",
    possibleDrops: [[["Redstone dust", 1], 1]],
});

CropData.registerCrop({
    ...makeDefaultCrop({
        name: "Reed",
        tier: 2,
        maxSize: 3,
    }),
    attributeChemical: 0,
    attributeFood: 0,
    attributeDefensive: 1,
    attributeColor: 0,
    attributeWeed: 2,
    attributes: ["Reed"],
    humidityWeight: 1.2,
    nutrientsWeight: 1.0,
    airQualityWeight: 0.8,
    minimumHarvestSize: 2,
    possibleDrops: [[["Sugar Canes", 2], 1]],
    growthStages: [200, 200, 0],
});

CropData.registerCrop({
    ...makeDefaultCrop({
        name: "Shining",
        tier: 8,
        maxSize: 5,
    }),
    attributeChemical: 2,
    attributeFood: 0,
    attributeDefensive: 0,
    attributeColor: 2,
    attributeWeed: 0,
    attributes: ["Silver", "Leaves", "Metal"],
    minimumHarvestSize: 5,
    possibleDrops: [[["Tiny Pile of Silver Dust", 1], 1]],
    growthStages: [750, 750, 750, 2000, 0],
    growthStageAfterHarvest: 2,
});

CropData.registerCrop({
    ...makeDefaultCrop({
        name: "Stagnium",
        tier: 6,
        maxSize: 4,
    }),
    attributeChemical: 2,
    attributeFood: 0,
    attributeDefensive: 0,
    attributeColor: 1,
    attributeWeed: 0,
    attributes: ["Shiny", "Leaves", "Metal"],
    foundationBlock: "Tin Block or Tin Ore",
    minimumHarvestSize: 4,
    possibleDrops: [[["Tiny Pile of Tin Dust", 1], 1]],
    gainFactor: makeDefaultCrop({tier: 6}).gainFactor / 2,
    growthStages: [800, 800, 2000, 0],
    growthStageAfterHarvest: 2,
});

CropData.registerCrop({
    ...makeDefaultCrop({
        name: "Stickreed",
        tier: 4,
        maxSize: 4,
    }),
    attributeChemical: 2,
    attributeFood: 0,
    attributeDefensive: 1,
    attributeColor: 0,
    attributeWeed: 1,
    attributes: ["Reed", "Resin"],
    humidityWeight: 1.2,
    nutrientsWeight: 1.0,
    airQualityWeight: 0.8,
    minimumHarvestSize: 2,
    possibleDrops: [[["Sticky Resin", 1], 1]],
    growthStageAfterHarvest: 'random',
    growthStages: [100, 100, 100, 0],
});

CropData.registerCrop({
    ...makeDefaultCrop({
        name: "Nether Wart",
        tier: 5,
        maxSize: 3,
    }),
    attributeChemical: 2,
    attributeFood: 4,
    attributeDefensive: 0,
    attributeColor: 3,
    attributeWeed: 0,
    attributes: ["Blue", "Aether", "Consumable", "Snow"],
    minimumHarvestSize: 3,
    gainFactor: 0.8,
    possibleDrops: [[['Terra Wart', 1], 1]],
});

/* Venomilias only drop grin powder on stage 5,
 * which is the optimal harvest stage caught by IC2's crop harvester.
 */
let cropVenomilia: CropData = {
    ...makeDefaultCrop({
        name: "Venomilia",
        tier: 3,
        maxSize: 6,
    }),
    attributeChemical: 3,
    attributeFood: 1,
    attributeDefensive: 3,
    attributeColor: 3,
    attributeWeed: 3,
    attributes: ["Purple", "Flower", "Tulip", "Poison"],
    minimumHarvestSize: 4,
    possibleDrops: [[['Purple Dye', 1], 1]],
    growthStageAfterHarvest: 2,
    growthStages: [400, 400, 600, 600, 600, 0],
};
CropData.registerCrop(cropVenomilia);
CropData.registerCrop({
    ...cropVenomilia,
    variantOf: cropVenomilia,
    name: "Venomilia (optimal harvest)",
    growthStages: [400, 400, 600, 600, 0],
    possibleDrops: [[['Grin Powder', 1], 1]],
});

CropData.registerCrop({
    ...makeDefaultCrop({
        name: "Weed",
        tier: 0,
        maxSize: 5,
    }),
    attributeChemical: 0,
    attributeFood: 0,
    attributeDefensive: 1,
    attributeColor: 0,
    attributeWeed: 5,
    attributes: ["Weed", "Bad"],
    possibleDrops: [],
    growthStages: [300, 300, 300, 300, 0],
});

CropData.registerCrop({
    ...makeDefaultCrop({
        name: "Wheat",
        tier: 1,
        maxSize: 7,
    }),
    attributeChemical: 0,
    attributeFood: 4,
    attributeDefensive: 0,
    attributeColor: 0,
    attributeWeed: 2,
    attributes: ["Yellow", "Food", "Wheat"],
    minimumHarvestSize: 7,
    possibleDrops: [[["Wheat", 1], 1/2]],
    growthStageAfterHarvest: 2,
});
