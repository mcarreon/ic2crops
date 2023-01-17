import {
    CropData,
    makeCppBasicDecorationCrop
} from './Database.js';

/* FloweringVines extends this crop. */
export let cropVine: CropData = {
    ...makeCppBasicDecorationCrop({
        tier: 2,
        name: "Vines",
    }),
    attributes: ["Green", "Tendrilly"],
    possibleDrops: [[['Vines', 2], 1]],
};
CropData.registerCrop(cropVine);
