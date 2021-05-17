import { Condition } from '../interfaces/condition.interface';
import { ConditionDetails } from '../interfaces/conditionDetails.interface';

// A reference for unchanging game data in relation to conditions. Generates a conditions object based off hard coded condition names and arrays of meter modifiers.

// Any new conditions resulting from game counters, entity interactions, or meter deficit or excess zones need to be added here.

// In the meter modifier object, incRateModifier and decRateModifier sets the multiplier for the amount which a meter will increase or decrease while the condition is active. The values passed indicate a positive or negative multiplier for that increase or decrease.

// All meters have an initial incRate and decRate values of 100%, representing a multiplier of 1. Multipliers can go no lower than 0% (0) and no higher than 1000% (10).

// For example, passing a value of -2 to incRateModifier will divide the current incRate by 2 halving the amount by which the meter of increases at each tick. Passing a value of 2 to decRateModifier will multiply the current decRate by 2 doubling the amount by which this meter decreases at each tick.

export const conditionsData: ConditionDetails[] = [
  {
    name: 'asleep',
    modifiers: [{ meter: 'hunger', incRateModifier: 0, decRateModifier: -2 }],
    impacts: [],
  },
  {
    name: 'washing',
    modifiers: [{ meter: 'hunger', incRateModifier: 0, decRateModifier: -2 }],
    impacts: [],
  },
  {
    name: 'changing',
    modifiers: [],
    impacts: [],
  },
  {
    name: 'relaxing',
    modifiers: [],
    impacts: [],
  },
  {
    name: 'working',
    modifiers: [],
    impacts: [],
  },
  {
    name: 'music',
    modifiers: [],
    impacts: [],
  },
  {
    name: 'cleaning',
    modifiers: [],
    impacts: [],
  },
  {
    name: 'cooking',
    modifiers: [],
    impacts: [],
  },
  {
    name: 'snacking',
    modifiers: [],
    impacts: [],
  },
  {
    name: 'watering',
    modifiers: [],
    impacts: [],
  },
  {
    name: 'wallowing',
    modifiers: [],
    impacts: [],
  },
  {
    name: 'hungry',
    modifiers: [],
    impacts: [],
  },
  {
    name: 'overfed',
    modifiers: [],
    impacts: [],
  },
  {
    name: 'starved',
    modifiers: [],
    impacts: [],
  },
  {
    name: 'lethargic',
    modifiers: [],
    impacts: [],
  },
  {
    name: 'exhausted',
    modifiers: [],
    impacts: [],
  },
  {
    name: 'delirious',
    modifiers: [],
    impacts: [],
  },
  {
    name: 'unwell',
    modifiers: [],
    impacts: [],
  },
  {
    name: 'hardy',
    modifiers: [],
    impacts: [],
  },
  {
    name: 'feverish',
    modifiers: [],
    impacts: [],
  },
  {
    name: 'broke',
    modifiers: [],
    impacts: [],
  },
  {
    name: 'rich',
    modifiers: [],
    impacts: [],
  },
  {
    name: 'unfit',
    modifiers: [],
    impacts: [],
  },
  {
    name: 'injured',
    modifiers: [],
    impacts: [],
  },
  {
    name: 'depressed',
    modifiers: [],
    impacts: [],
  },
  {
    name: 'ecstatic',
    modifiers: [],
    impacts: [],
  },
  {
    name: 'filthy',
    modifiers: [],
    impacts: [],
  },
  {
    name: 'anal',
    modifiers: [],
    impacts: [],
  },
  {
    name: 'achey',
    modifiers: [],
    impacts: [],
  },
  {
    name: 'cosy',
    modifiers: [],
    impacts: [],
  },
  {
    name: 'lonely',
    modifiers: [],
    impacts: [],
  },
  {
    name: 'dependent',
    modifiers: [],
    impacts: [],
  },
  {
    name: 'bored',
    modifiers: [],
    impacts: [],
  },
  {
    name: 'hooked',
    modifiers: [],
    impacts: [],
  },
  {
    name: 'trapped',
    modifiers: [],
    impacts: [],
  },
  {
    name: 'wild',
    modifiers: [],
    impacts: [],
  },
  {
    name: 'apathetic',
    modifiers: [],
    impacts: [],
  },
  {
    name: 'ambitious',
    modifiers: [],
    impacts: [],
  },
  {
    name: 'nauseous',
    modifiers: [],
    impacts: [],
  },
  {
    name: 'greedy',
    modifiers: [],
    impacts: [],
  },
  {
    name: 'unstable',
    modifiers: [],
    impacts: [],
  },
  {
    name: 'enlightened',
    modifiers: [],
    impacts: [],
  },
];

class Conditions {
  [key: string]: Condition;

  constructor(conditionsArr: ConditionDetails[]) {
    conditionsArr.forEach((condition: ConditionDetails) => {
      this[condition.name] = {
        modifiers: condition.modifiers,
        impacts: condition.impacts,
      };
    });
  }
}

export const conditions = new Conditions(conditionsData);
