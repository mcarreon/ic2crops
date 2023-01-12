import { CropData, makeDefaultGTplusplusCrop } from './Database.js';

CropData.registerCrop({
    ...makeDefaultGTplusplusCrop({
        name: "Force",
        tier: 4,
        growthStageDuration: 800,
    }),
    attributes: ["Power", "Soil", "Yellow", "Gold"],
    possibleDrops: [
        /* For some reason, GT++ crops have a very high chance of returning an ItemStack
         * with zero items.
         * It does act like a proper ItemStack for IC2 purposes though
         * (e.g. it grants the 80% chance for seedbags with left click).
         */
        [['Force Nugget', 0], 9/10],
        [['Force Nugget', 4], 1/40],
        [['Force Nugget', 5], 1/40],
        [['Force Nugget', 6], 1/40],
        [['Force Nugget', 7], 1/40],
    ],
});

CropData.registerCrop({
    ...makeDefaultGTplusplusCrop({
        name: "Hemp",
        tier: 2,
        growthStageDuration: 550,
    }),
    attributes: ["Green", "Soil", "Orange"],
    possibleDrops: [
        [['Rope', 0], 9/10],
        [['Rope', 1], 1/30],
        [['Rope', 2], 1/30],
        [['Rope', 3], 1/30],
    ],
});
