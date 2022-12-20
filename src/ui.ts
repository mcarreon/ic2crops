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

    private biomeNutrientBonusInput = document.getElementById('biomeNutrientBonus') as HTMLInputElement;
    private dirtBlocksUnderneathInput = document.getElementById('dirtBlocksUnderneath') as HTMLInputElement;
    private nutrientStorageInput = document.getElementById('nutrientStorage') as HTMLInputElement;
    private fertilizedInput = document.getElementById('fertilized') as HTMLInputElement;

    private yValueInput = document.getElementById('yValue') as HTMLInputElement;
    private surroundingAirBlocksInput = document.getElementById('surroundingAirBlocks') as HTMLInputElement;
    private skyAccessInput = document.getElementById('skyAccess') as HTMLInputElement;

    private humidityWeightInput = document.getElementById('humidityWeight') as HTMLInputElement;
    private nutrientsWeightInput = document.getElementById('nutrientsWeight') as HTMLInputElement;
    private airQualityWeightInput = document.getElementById('airQualityWeight') as HTMLInputElement;

    private envNeedsDiv = document.getElementById('env-needs') as HTMLDivElement;
    private humidityDiv = document.getElementById('humidity') as HTMLDivElement;
    private nutrientDiv = document.getElementById('nutrient') as HTMLDivElement;
    private airQualityDiv = document.getElementById('airQuality') as HTMLDivElement;
    private environmentalValueDiv = document.getElementById('environmentalValue') as HTMLDivElement;

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

        this.biomeNutrientBonusInput.addEventListener('input', (e: Event) => {
            this.staticCropData.biomeNutrientBonus = Number((e.target as HTMLInputElement).value);
            this.updateCropData();
        });

        this.dirtBlocksUnderneathInput.addEventListener('input', (e: Event) => {
            this.staticCropData.dirtBlocksUnderneath = Number((e.target as HTMLInputElement).value);
            this.updateCropData();
        });

        this.nutrientStorageInput.addEventListener('input', () => {
            // Not static data, so we don't store it
            this.updateCropData();
        });

        this.fertilizedInput.addEventListener('input', (e: Event) => {
            this.staticCropData.fertilized = Boolean((e.target as HTMLInputElement).checked);
            this.updateCropData();
        });

        this.yValueInput.addEventListener('input', (e: Event) => {
            this.staticCropData.yValue = Number((e.target as HTMLInputElement).value);
            this.updateCropData();
        });

        this.surroundingAirBlocksInput.addEventListener('input', (e: Event) => {
            this.staticCropData.surroundingAirBlocks = Number((e.target as HTMLInputElement).value);
            this.updateCropData();
        });

        this.skyAccessInput.addEventListener('input', (e: Event) => {
            this.staticCropData.skyAccess = Boolean((e.target as HTMLInputElement).checked);
            this.updateCropData();
        });

        this.humidityWeightInput.addEventListener('input', (e: Event) => {
            this.staticCropData.humidityWeight = Number((e.target as HTMLInputElement).value);
            this.updateCropData();
        });

        this.nutrientsWeightInput.addEventListener('input', (e: Event) => {
            this.staticCropData.nutrientsWeight = Number((e.target as HTMLInputElement).value);
            this.updateCropData();
        });

        this.airQualityWeightInput.addEventListener('input', (e: Event) => {
            this.staticCropData.airQualityWeight = Number((e.target as HTMLInputElement).value);
            this.updateCropData();
        });
    }

    updateCropData() {
        this.envNeedsDiv.textContent = "" + this.staticCropData.computeEnvironmentalNeeds();
        this.humidityDiv.textContent = "" + this.staticCropData.computeHumidity();
        let currentNutrientStorage = Number(this.nutrientStorageInput.value);
        this.nutrientDiv.textContent = "" + this.staticCropData.computeNutrients(currentNutrientStorage);
        this.airQualityDiv.textContent = "" + this.staticCropData.computeAirQuality();
        this.environmentalValueDiv.textContent = "" + this.staticCropData.computeEnvironmentalValue(currentNutrientStorage);
    }
}
