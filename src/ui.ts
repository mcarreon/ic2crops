import { CropData } from './CropData.js';

export class UI {
    static instance = new UI();
    private cropTierInput = document.getElementById('cropTier') as HTMLInputElement;
    private statGainInput = document.getElementById('statGain') as HTMLInputElement;
    private statGrowthInput = document.getElementById('statGrowth') as HTMLInputElement;
    private statResistanceInput = document.getElementById('statResistance') as HTMLInputElement;
    private envNeedsDiv = document.getElementById('env-needs') as HTMLDivElement;

    private cropData = new CropData();

    private constructor() {
        this.cropTierInput.addEventListener('input', (e: Event) => {
            this.cropData.cropTier = Number((e.target as HTMLInputElement).value);
            this.updateCropData();
        });
        this.statGainInput.addEventListener('input', (e: Event) => {
            this.cropData.statGain = Number((e.target as HTMLInputElement).value);
            this.updateCropData();
        });
        this.statGrowthInput.addEventListener('input', (e: Event) => {
            this.cropData.statGrowth = Number((e.target as HTMLInputElement).value);
            this.updateCropData();
        });
        this.statResistanceInput.addEventListener('input', (e: Event) => {
            this.cropData.statResistance = Number((e.target as HTMLInputElement).value);
            this.updateCropData();
        });
    }

    updateCropData() {
        this.envNeedsDiv.textContent = "" + this.cropData.computeEnvironmentalNeeds();
    }
}
