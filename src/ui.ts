import { StaticCropData } from './CropData.js';

export class UI {
    static instance = new UI();
    private cropTierInput = document.getElementById('cropTier') as HTMLInputElement;
    private statGainInput = document.getElementById('statGain') as HTMLInputElement;
    private statGrowthInput = document.getElementById('statGrowth') as HTMLInputElement;
    private statResistanceInput = document.getElementById('statResistance') as HTMLInputElement;
    private biomeHumidityBonusInput = document.getElementById('biomeHumidityBonus') as HTMLInputElement;
    private hydratedInput = document.getElementById('hydrated') as HTMLInputElement;
    private atopHydratedFarmlandInput = document.getElementById('atopHydratedFarmland') as HTMLInputElement;

    private envNeedsDiv = document.getElementById('env-needs') as HTMLDivElement;
    private humidityDiv = document.getElementById('humidity') as HTMLDivElement;

    private staticCropData = new StaticCropData();

    private constructor() {
        this.cropTierInput.addEventListener('input', (e: Event) => {
            this.staticCropData.cropTier = Number((e.target as HTMLInputElement).value);
            this.updateCropData();
        });

        this.statGainInput.addEventListener('input', (e: Event) => {
            this.staticCropData.statGain = Number((e.target as HTMLInputElement).value);
            this.updateCropData();
        });

        this.statGrowthInput.addEventListener('input', (e: Event) => {
            this.staticCropData.statGrowth = Number((e.target as HTMLInputElement).value);
            this.updateCropData();
        });

        this.statResistanceInput.addEventListener('input', (e: Event) => {
            this.staticCropData.statResistance = Number((e.target as HTMLInputElement).value);
            this.updateCropData();
        });

        this.biomeHumidityBonusInput.addEventListener('input', (e: Event) => {
            this.staticCropData.biomeHumidityBonus = Number((e.target as HTMLInputElement).value);
            this.updateCropData();
        });

        this.hydratedInput.addEventListener('input', (e: Event) => {
            this.staticCropData.hydrated = Boolean((e.target as HTMLInputElement).checked);
            this.updateCropData();
        });

        this.atopHydratedFarmlandInput.addEventListener('input', (e: Event) => {
            this.staticCropData.atopHydratedFarmland = Boolean((e.target as HTMLInputElement).checked);
            this.updateCropData();
        });
    }

    updateCropData() {
        this.envNeedsDiv.textContent = "" + this.staticCropData.computeEnvironmentalNeeds();
        this.humidityDiv.textContent = "" + this.staticCropData.computeHumidityBonus();
    }
}
