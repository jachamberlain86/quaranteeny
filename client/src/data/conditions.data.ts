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
  },
  {
    name: 'washing',
    modifiers: [{ meter: 'hunger', incRateModifier: 0, decRateModifier: -2 }],
  },
  {
    name: 'hungry',
    modifiers: [],
  },
  {
    name: 'overfed',
    modifiers: [],
  },
  {
    name: 'starved',
    modifiers: [],
  },
  {
    name: 'lethargic',
    modifiers: [],
  },
  {
    name: 'exhausted',
    modifiers: [],
  },
  {
    name: 'strange',
    modifiers: [],
  },
  {
    name: 'unwell',
    modifiers: [],
  },
  {
    name: 'hardy',
    modifiers: [],
  },
  {
    name: 'feverish',
    modifiers: [],
  },
  {
    name: 'broke',
    modifiers: [],
  },
  {
    name: 'rich',
    modifiers: [],
  },
  {
    name: 'unfit',
    modifiers: [],
  },
  {
    name: 'injured',
    modifiers: [],
  },
  {
    name: 'depressed',
    modifiers: [],
  },
  {
    name: 'ecstatic',
    modifiers: [],
  },
  {
    name: 'filthy',
    modifiers: [],
  },
  {
    name: 'anal',
    modifiers: [],
  },
  {
    name: 'hurt',
    modifiers: [],
  },
  {
    name: 'cosy',
    modifiers: [],
  },
  {
    name: 'lonely',
    modifiers: [],
  },
  {
    name: 'dependent',
    modifiers: [],
  },
  {
    name: 'bored',
    modifiers: [],
  },
  {
    name: 'hooked',
    modifiers: [],
  },
  {
    name: 'trapped',
    modifiers: [],
  },
  {
    name: 'wild',
    modifiers: [],
  },
  {
    name: 'apathetic',
    modifiers: [],
  },
  {
    name: 'ambitious',
    modifiers: [],
  },
  {
    name: 'nauseous',
    modifiers: [],
  },
  {
    name: 'greedy',
    modifiers: [],
  },
  {
    name: 'unstable',
    modifiers: [],
  },
  {
    name: 'enlightened',
    modifiers: [],
  },
];

class Conditions {
  [key: string]: Condition;

  constructor(conditionsArr: ConditionDetails[]) {
    conditionsArr.forEach((condition: ConditionDetails) => {
      this[condition.name] = {
        modifiers: condition.modifiers,
      };
    });
  }
}

export const conditions = new Conditions(conditionsData);
