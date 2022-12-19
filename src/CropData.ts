export class CropData {
    cropTier: number = 0;
    statGain: number = 0;
    statGrowth: number = 0;
    statResistance: number = 0;

    computeEnvironmentalNeeds() {
        return 4 * (this.cropTier-1) + this.statGrowth + this.statGain + this.statResistance;
    }
}
