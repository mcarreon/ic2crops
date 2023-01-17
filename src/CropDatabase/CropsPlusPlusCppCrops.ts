import {
    CropData,
    makeCppBasicCrop,
    makeCppBasicDecorationCrop,
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

/* Bonsais are created in src/main/java/com/github/bartimaeusnek/cropspp/crops/cpp/Bonsais.java.
 * There's also code for a generic bonsai generator
 * (in src/main/java/com/github/bartimaeusnek/cropspp/crops/cpp/tree/)
 * but this code is unused at the moment.
 */
function makeBonsai({
    treeName = "Unnamed Tree",
    tier = 1, // All tiers are the same
    attributes = ["Tree", "Bonsai", "Leavy"],
    drops = [] as string[], // defaults to ['Log Name', 'Sapling Name']; first must be the wood
    chances = [80, 30], // Value from the code
}): CropData
{
    if(drops.length == 0)
        drops = [`${treeName} Wood`, `${treeName} Sapling`];

    chances.push(0); // Sentinel value
    let baseDrops: [[string, number], number][] = drops.map(
        (drop, i) => [[drop, 1], (chances[i]!-chances[i+1]!)/Math.max(...chances)]
    );
    baseDrops[0]![0][1] = 10; // baseDrops[0] is the log type; the base count is 10

    let possibleDrops: [[string, number], number][] = [];
    for(let [[dropName, dropCount], dropProbability] of baseDrops) {
        const moreorless = 4;
        possibleDrops.push([[dropName, dropCount], dropProbability/4]);
        for(let i = 0; i < moreorless; i++) {
            possibleDrops.push([[dropName, dropCount+i], dropProbability/2/moreorless]);
        }
        for(let i = 0; i < moreorless; i++) {
            if(dropCount-i >= 0) {
                possibleDrops.push([[dropName, dropCount-i], dropProbability/4/moreorless]);
            } else {
                // TODO: figure out what happens and how to handle null drops
            }
        }
    }

    let maxSize = 3;
    let growthStages = makeCppBasicCrop({tier, maxSize}).growthStages.map(s => 3 * s);

    return {
        ...makeCppBasicCrop({name: `${treeName} Bonsai`, tier, maxSize}),
        attributeChemical: 0,
        attributeFood: 0,
        attributeDefensive: 0,
        attributeColor: 1,
        attributeWeed: 0,
        attributes,
        possibleDrops,
        growthStages,
    };
}

CropData.registerCrop(makeBonsai({
    treeName: "Oak",
    attributes: ["Tree", "Bonsai", "Leavy", "Food"],
    drops: ['Oak Wood', 'Oak Sapling', 'Apple'],
    chances: [100, 50, 10],
}));
CropData.registerCrop(makeBonsai({treeName: "Spruce"}));
CropData.registerCrop(makeBonsai({treeName: "Birch"}));
CropData.registerCrop(makeBonsai({treeName: "Jungle"}));
CropData.registerCrop(makeBonsai({treeName: "Acacia"}));
CropData.registerCrop(makeBonsai({treeName: "Dark Oak"}));
