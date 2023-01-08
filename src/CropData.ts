// Data from the crop that must be harvested from the source code
export class CropData {
    /* Tier of the crop.
     */
    tier: number = 0;

    /* Weighting of each of the three environmental values.
     * These numbers may be fractional and negative and don't need to sum to 3.
     */
    humidityWeight: number = 1;
    nutrientsWeight: number = 1;
    airQualityWeight: number = 1;

    /* The duration of each growth stage.
     * Crops don't grow in the very last growth stage,
     * so growthStages[growthStages.length-1] is assumed to be 0.
     *
     * In the code (and in most places providing documentation),
     * the growth stages are indexed by 1,
     * whereas this list is indexed by zero.
     * So, for example,
     * the growth stage durations for the essence berry would be [500, 3000, 3000, 0].
     */
    growthStages: number[] = [1000, 1000, 1000, 0];

    /* The "gain factor" is the return value of CropCard.dropGainChance(),
     * and is used to increase or decrease the average number of drops.
     *
     * May be above 1 (e.g. SaltyRoot's is 4).
     * Defaults to 0.95 ** cropTier.
     */
    gainFactor: number = 1;
    setDefaultGainFactor() {
        this.gainFactor = Math.pow(0.95, this.tier);
    }

    /* Growth stage that the crop goes to after harvest.
     *
     * Some crops (notably Stickreed) transition to some random stage except the last one;
     * for these crops, this attribute reads 'random'.
     *
     * This field is "indexed by 1",
     * so a value of 1 means the crop reverts to its very frist growth stage
     * and the largest meaningful value is growthStages.length-1.
     */
    growthStageAfterHarvest: number | 'random' = 1;

    /* Enlarge or shrinks this.growthStages so its length matches the given number.
     * Newly created stages will be assigned the default duration of 1000.
     */
    setNumberOfGrowthStages(numberOfStages: number) {
        let oldLength = this.growthStages.length;
        this.growthStages.length = numberOfStages;
        this.growthStages[numberOfStages-1] = 0;
        if(oldLength < numberOfStages) { // We added stages, must fill array
            for(let i = oldLength; i < numberOfStages-1; i++) {
                this.growthStages[i] = 1000;
            }
        }
    }
}
