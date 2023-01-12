import { CropData, makeDefaultCrop } from './Database.js';

/* Good Generator has a single crop,
 * defined in src/main/java/goodgenerator/crossmod/ic2/GGCropsSaltyRoot.java.
 */

CropData.registerCrop({
    ...makeDefaultCrop({
        name: "Salty Root",
        tier: 4,
        maxSize: 3,
    }),
    attributes: ["Salt", "Gray", "Root", "Hydrophobic"],
    possibleDrops: [[['Salty Root', 1], 1]],
    minimumCrossSize: 2,
    gainFactor: 4,
    humidityWeight: -1,
    nutrientsWeight: 2,
    airQualityWeight: 1,
});
