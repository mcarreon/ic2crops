import { CropData } from './CropData.js';
import { BiomeData } from './BiomeData.js';
import { StaticCropData } from './CropMath.js';

class GrowthStageInput {
    private static template = document
        .querySelector<HTMLTemplateElement>('#growth-stage-input')!
        .content
        .querySelector<HTMLDivElement>('div')!; // I just want the div inside the template
    private index: number;
    private valueModificationCallback: (value: number) => void;
    private div: HTMLDivElement;
    private indexDisplayDiv: HTMLDivElement;
    private stageInput: HTMLInputElement;

    constructor(index: number, startingValue: number, valueModificationCallback: (value: number) => void) {
        this.index = index;
        this.valueModificationCallback = valueModificationCallback;

        this.div = GrowthStageInput.template.cloneNode(true) as HTMLDivElement;
        this.indexDisplayDiv = this.div.querySelector('.growth-stage-index') as HTMLDivElement;
        this.stageInput = this.div.querySelector('input') as HTMLInputElement;

        this.stageInput.value = "" + startingValue;
        this.indexDisplayDiv.textContent = "" + (this.index+1);
        this.stageInput.addEventListener('input', (e: Event) => {
            this.valueModificationCallback((e.target as HTMLInputElement).valueAsNumber);
        });
        this.valueModificationCallback(this.stageInput.valueAsNumber);
    }

    getDiv() {
        return this.div;
    }

    // Changes the value displayed in the div invoking the callback
    setVisualValue(newValue: number) {
        this.stageInput.value = "" + newValue;
    }

    hideDiv() {
        this.div.style['display'] = 'none';
    }

    showDiv() {
        this.div.style['display'] = '';
    }
}

export class UI {
    static instance = new UI();
    private cropListSelection = document.getElementById('cropList') as HTMLSelectElement;
    private biomeListSelection = document.getElementById('biomeList') as HTMLSelectElement;
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

    private numberOfGrowthStagesInput = document.getElementById('numberOfGrowthStages') as HTMLInputElement;
    private growthStageInputs: GrowthStageInput[] = [];
    private growthStageAfterHarvestInput = document.getElementById('growthStageAfterHarvest') as HTMLInputElement;
    private randomGrowthStageAfterHarvestInput = document.getElementById('randomGrowthStageAfterHarvest') as HTMLInputElement;

    private gainFactorInput = document.getElementById('gainFactor') as HTMLInputElement;

    private envNeedsDiv = document.getElementById('env-needs') as HTMLDivElement;
    private humidityDiv = document.getElementById('humidity') as HTMLDivElement;
    private nutrientDiv = document.getElementById('nutrient') as HTMLDivElement;
    private airQualityDiv = document.getElementById('airQuality') as HTMLDivElement;
    private environmentalValueDiv = document.getElementById('environmentalValue') as HTMLDivElement;
    private growthStagesDiv = document.getElementById('growth-stages') as HTMLDivElement;
    private growthPointsInfoDiv = document.getElementById('growth-points-info') as HTMLDivElement;
    private growthPointsProbabilitiesDiv = document.getElementById('growth-points-probabilities') as HTMLDivElement;
    private growthStagesInfoDiv = document.getElementById('growth-stages-info') as HTMLDivElement;
    private growthStagesExpectanciesDiv = document.getElementById('growth-stages-expectancies') as HTMLDivElement;
    private expectedTicksBetweenHarvestsDiv = document.getElementById('expectedTicksBetweenHarvests') as HTMLDivElement;
    private dropNumberDistributionDiv = document.getElementById('dropNumberDistribution') as HTMLDivElement;

    private dropsPerHarvestDiv = document.getElementById('dropsPerHarvest') as HTMLDivElement;
    private dropsPerHourDiv = document.getElementById('dropsPerHour') as HTMLDivElement;

    private staticCropData = new StaticCropData();

    private constructor() {
        this.initCropList();
        this.initBiomeList();

        this.registerNumericAttributeCallback(this.cropTierInput, value => {
            this.staticCropData.crop.tier = value;
            this.staticCropData.crop.gainFactor = CropData.defaultGainFactor(value);
            this.gainFactorInput.valueAsNumber = this.staticCropData.crop.gainFactor;
        });

        this.registerNumericAttributeCallback(this.statGainInput, value => {
            this.staticCropData.stat.gain = value;
        });

        this.registerNumericAttributeCallback(this.statGrowthInput, value => {
            this.staticCropData.stat.growth = value;
        });

        this.registerNumericAttributeCallback(this.statResistanceInput, value => {
            this.staticCropData.stat.resistance = value;
        });

        this.registerNumericAttributeCallback(this.biomeHumidityBonusInput, value => {
            this.staticCropData.biome.humidityBonus = value;
        });

        this.registerBooleanAttributeCallback(this.hydratedInput, value => {
            this.staticCropData.hydrated = value;
        });

        this.registerBooleanAttributeCallback(this.atopHydratedFarmlandInput, value => {
            this.staticCropData.atopHydratedFarmland = value;
        });

        this.registerNumericAttributeCallback(this.biomeNutrientBonusInput, value => {
            this.staticCropData.biome.nutrientBonus = value;
        });

        this.registerNumericAttributeCallback(this.dirtBlocksUnderneathInput, value => {
            this.staticCropData.dirtBlocksUnderneath = value;
        });

        this.registerNumericAttributeCallback(this.nutrientStorageInput, () => {
            // Not static data, so we don't store it
        });

        this.registerBooleanAttributeCallback(this.fertilizedInput, value => {
            this.staticCropData.fertilized = value;
        });

        this.registerNumericAttributeCallback(this.yValueInput, value => {
            this.staticCropData.yValue = value;
        });

        this.registerNumericAttributeCallback(this.surroundingAirBlocksInput, value => {
            this.staticCropData.surroundingAirBlocks = value;
        });

        this.registerBooleanAttributeCallback(this.skyAccessInput, value => {
            this.staticCropData.skyAccess = value;
        });

        this.registerNumericAttributeCallback(this.humidityWeightInput, value => {
            this.staticCropData.crop.humidityWeight = value;
        });

        this.registerNumericAttributeCallback(this.nutrientsWeightInput, value => {
            this.staticCropData.crop.nutrientsWeight = value;
        });

        this.registerNumericAttributeCallback(this.airQualityWeightInput, value => {
            this.staticCropData.crop.airQualityWeight = value;
        });

        this.registerNumericAttributeCallback(this.numberOfGrowthStagesInput, newNumber => {
            // Custom behavior for growth stages
            this.setNumberOfGrowthStages(newNumber);
        });

        this.registerNumericAttributeCallback(this.growthStageAfterHarvestInput, newStage => {
            this.staticCropData.crop.growthStageAfterHarvest = newStage;
        })

        this.registerBooleanAttributeCallback(this.randomGrowthStageAfterHarvestInput, random => {
            if(random) {
                this.staticCropData.crop.growthStageAfterHarvest = 'random';
                this.growthStageAfterHarvestInput.required = false;
                this.growthStageAfterHarvestInput.disabled = true;
            } else {
                this.staticCropData.crop.growthStageAfterHarvest = this.growthStageAfterHarvestInput.valueAsNumber;
                this.growthStageAfterHarvestInput.required = true;
                this.growthStageAfterHarvestInput.disabled = false;
            }
        })

        this.registerNumericAttributeCallback(this.gainFactorInput, value => {
            this.staticCropData.crop.gainFactor = value;
        })

        /* The this.register functions call the callback with the current values upon registering,
         * but it only calls updateCropData if the value modifies.
         * So we call it once after all values get updated.
         */
        this.updateCropData();
    }

    private initCropList() {
        this.cropListSelection.innerHTML = "";
        let cropNames = Array.from(CropData.allCrops.keys()).sort();
        for(let cropName of cropNames) {
            let option = document.createElement('option');
            option.textContent = cropName;
            this.cropListSelection.appendChild(option);
        }
        this.cropListSelection.addEventListener('change', (e: Event) => {
            let cropName = (e.target as HTMLSelectElement).value;
            let crop = CropData.allCrops.get(cropName);
            if(crop === undefined) {
                console.log(`Error: cannot find crop ${cropName}`);
                return;
            }

            this.staticCropData.crop = JSON.parse(JSON.stringify(crop)); // Quick deep clone
            this.cropTierInput.value = "" + crop.tier;
            this.humidityWeightInput.value = "" + crop.humidityWeight;
            this.nutrientsWeightInput.value = "" + crop.nutrientsWeight;
            this.airQualityWeightInput.value = "" + crop.airQualityWeight;

            this.numberOfGrowthStagesInput.value = "" + crop.growthStages.length;
            this.setNumberOfGrowthStages(crop.growthStages.length);
            for(let i = 0; i < crop.growthStages.length - 1; i++) {
                this.growthStageInputs[i]!.setVisualValue(crop.growthStages[i]!);
            }

            if(crop.growthStageAfterHarvest === 'random') {
                this.growthStageAfterHarvestInput.required = false;
                this.growthStageAfterHarvestInput.disabled = true;
                this.randomGrowthStageAfterHarvestInput.checked = true;
                this.growthStageAfterHarvestInput.value = "1"; // Dummy value
            } else {
                this.growthStageAfterHarvestInput.required = true;
                this.growthStageAfterHarvestInput.disabled = false;
                this.randomGrowthStageAfterHarvestInput.checked = false;
                this.growthStageAfterHarvestInput.value = "" + crop.growthStageAfterHarvest;
            }

            this.gainFactorInput.value = "" + crop.gainFactor;

            this.updateCropData();
        });
    }

    private initBiomeList() {
        this.biomeListSelection.innerHTML = "";
        let biomeNames = Array.from(BiomeData.allBiomes.keys()).sort();
        for(let biomeName of biomeNames) {
            let option = document.createElement('option');
            option.textContent = biomeName;
            this.biomeListSelection.appendChild(option);
        }
        this.biomeListSelection.addEventListener('change', (e: Event) => {
            let biomeName = (e.target as HTMLSelectElement).value;
            let biome = BiomeData.allBiomes.get(biomeName);
            if(biome === undefined) {
                console.log(`Error: cannot find biome ${biomeName}`);
                return;
            }

            this.staticCropData.biome = BiomeData.computeBiomeBonuses(biome);
            this.biomeHumidityBonusInput.value = "" + this.staticCropData.biome.humidityBonus;
            this.biomeNutrientBonusInput.value = "" + this.staticCropData.biome.nutrientBonus;
            this.updateCropData();
        });
    }

    private registerNumericAttributeCallback(element: HTMLInputElement, callback: (value: number) => void) {
        element.addEventListener('input', (e: Event) => {
            callback((e.target as HTMLInputElement).valueAsNumber);
            this.updateCropData();
        });
        /* Some browsers (like Firefox) store the last value used in an input field.
         * This makes sure that the internal variables match what's seen by the user.
         */
        callback(element.valueAsNumber);
    }

    private registerBooleanAttributeCallback(element: HTMLInputElement, callback: (value: boolean) => void) {
        element.addEventListener('input', (e: Event) => {
            callback(Boolean((e.target as HTMLInputElement).checked));
            this.updateCropData();
        });
        callback(Boolean(element.checked));
    }

    private setNumberOfGrowthStages(newNumber: number) {
        if(!(newNumber > 0)) return;
        CropData.setNumberOfGrowthStages(this.staticCropData.crop, newNumber);
        while(this.growthStageInputs.length < newNumber-1) {
            let index = this.growthStageInputs.length;
            let startingValue = this.staticCropData.crop.growthStages[index]!;
            let newGrowthStageInput = new GrowthStageInput(index, startingValue, (value: number) => {
                this.staticCropData.crop.growthStages[index] = value;
                this.updateCropData();
            });
            this.growthStageInputs.push(newGrowthStageInput);
            this.growthStagesDiv.appendChild(newGrowthStageInput.getDiv());
        }
        for(let i = 0; i < newNumber-1; i++) {
            this.growthStageInputs[i]!.showDiv();
        }
        for(let i = newNumber-1; i < this.growthStageInputs.length; i++) {
            this.growthStageInputs[i]!.hideDiv();
        }

        this.growthStageAfterHarvestInput.max = "" + (newNumber-1);
    }

    updateCropData() {
        this.envNeedsDiv.textContent = "" + this.staticCropData.computeEnvironmentalNeeds();
        this.humidityDiv.textContent = "" + this.staticCropData.computeHumidity();
        let currentNutrientStorage = this.nutrientStorageInput.valueAsNumber;
        this.nutrientDiv.textContent = "" + this.staticCropData.computeNutrients(currentNutrientStorage);
        this.airQualityDiv.textContent = "" + this.staticCropData.computeAirQuality();
        this.environmentalValueDiv.textContent = "" + this.staticCropData.computeEnvironmentalValue(currentNutrientStorage);

        this.updateGrowthPointsProbabilities();
        this.updateGrowthStagesExpectedDurations();

        this.expectedTicksBetweenHarvestsDiv.textContent =
            this.staticCropData.computeExpectedTicksBetweenHarvests().toFixed(2) + " ticks";

        this.updateDropNumberDistribution();
        this.updateDropsPerPeriod();
    }

    updateGrowthPointsProbabilities() {
        let growthPoints;
        if(this.staticCropData.fertilized) {
            this.growthPointsInfoDiv.textContent = "Average probabilities of each growth value:"
            growthPoints = this.staticCropData.computeAverageGrowthPointsWithNutrition();
        } else {
            this.growthPointsInfoDiv.textContent = "Probabilities of each growth value:"
            growthPoints = this.staticCropData.computeGainedGrowthPoints();
        }

        if(growthPoints.length == 0) {
            this.growthPointsProbabilitiesDiv.textContent =
                "Not enough environmental resources, the crop will die in the long run.";
        } else {
            this.growthPointsProbabilitiesDiv.textContent = "";
            for(let [growth, probability] of growthPoints) {
                let p = (100 * probability).toFixed(2);
                this.growthPointsProbabilitiesDiv.textContent += `[${growth}: ${p}%] `;
            }
        }
    }

    updateGrowthStagesExpectedDurations() {
        let growthPoints;
        if(this.staticCropData.fertilized) {
            this.growthStagesInfoDiv.textContent = "(Estimated) expected duration of each growth stage: ";
            growthPoints = this.staticCropData.computeAverageGrowthPointsWithNutrition();
        } else {
            this.growthStagesInfoDiv.textContent = "Expected duration of each growth stage: ";
            growthPoints = this.staticCropData.computeGainedGrowthPoints();
        }

        if(growthPoints.length == 0) {
            this.growthStagesExpectanciesDiv.textContent =
                "Not enough environmental resources, the crop will die in the long run.";
        } else {
            this.growthStagesExpectanciesDiv.textContent = "";
            for(let i = 0; i < this.staticCropData.crop.growthStages.length - 1; i++) {
                let expectancy = StaticCropData.computeExpectedStepsInGrowthStage(
                        this.staticCropData.crop.growthStages[i]!, growthPoints
                );
                let e = expectancy.toFixed(2);
                this.growthStagesExpectanciesDiv.textContent += `[${i}: ${e} steps] `;
            }
        }
    }

    updateDropNumberDistribution() {
        this.dropNumberDistributionDiv.textContent = "";
        let distribution = this.staticCropData.computeDropCountDistribution();
        for(let [value, probability] of distribution) {
            let p;
            if(probability >= 1e-3) {
                p = (100 * probability).toFixed(3) + '%';
            } else {
                p = probability.toExponential(3);
            }
            this.dropNumberDistributionDiv.textContent += `[${value}: ${p}] `;
        }
    }

    updateDropsPerPeriod() {
        this.dropsPerHarvestDiv.textContent = "";
        this.dropsPerHourDiv.textContent = "";
        let averageDropsPerHarvest = this.staticCropData.computeAverageItemsPerHarvest();
        let meanTimeBetweenHarvests = this.staticCropData.computeExpectedTicksBetweenHarvests();
        for(let [item, count] of averageDropsPerHarvest) {
            let c = count.toFixed(4);
            this.dropsPerHarvestDiv.textContent += `[${item}: ${c}] `;
            let perHour = count / meanTimeBetweenHarvests / 12.8 * 3600;
            let h = perHour.toFixed(4);
            this.dropsPerHourDiv.textContent += `[${item}: ${h}] `;
        }
    }
}
