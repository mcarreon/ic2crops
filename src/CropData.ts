/* Stores all crop-related info that is unlikely to change
 * if the crop is being used to produce resources.
 */
export class StaticCropData {
    /* Tier of the crop.
     */
    cropTier: number = 0;

    /* The three crop stats (growth, gain, resistance).
     */
    statGain: number = 0;
    statGrowth: number = 0;
    statResistance: number = 0;

    /* Biome-dependent humidity bonus; an integer between -10 and 10.
     */
    biomeHumidityBonus: number = 0;

    /* Whether the crop sits atop hydrated farmland or not.
     *
     * IC2 crops can also be planted on Ztones' Garden Soil,
     * for example,
     * but then no hydration bonus is granted.
     */
    atopHydratedFarmland: boolean = false;

    /* Whether the crop constantly receives hydration or not.
     *
     * In IC2's code, the water storage fluctuates between 0 and 200.
     * IC2's Crop Matron and GT5's Crop Manager
     * both can keep the water storage constantly at 200,
     * so if this.hydrated is true the water storage is always considered to be 200,
     * and if it is false the water storage is always considered to be 0.
     */
    hydrated: boolean = false;

    computeEnvironmentalNeeds() {
        return 4 * (this.cropTier-1) + this.statGrowth + this.statGain + this.statResistance;
    }

    computeHumidityBonus() {
        let farmlandBonus = this.atopHydratedFarmland ? 2 : 0;
        let hydrationBonus = this.hydrated ? 10 : 0;
        return this.biomeHumidityBonus + farmlandBonus + hydrationBonus;
    }
}
