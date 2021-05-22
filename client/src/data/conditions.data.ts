import { Condition } from '../interfaces/condition.interface';
import { ConditionDetails } from '../interfaces/conditionDetails.interface';

/* A reference for unchanging game data in relation to conditions.
Generates a conditions object based off hard coded condition names
and arrays of meter modifiers.

Any new conditions resulting from game counters,
entity interactions, or meter deficit or excess zones
need to be added here.

In the meter modifier object, incRateModifier and decRateModifier
sets the multiplier for the amount which a meter will increase
or decrease while the condition is active.
The values passed indicate a positive or negative multiplier
for that increase or decrease.

All meters have an initial incRate and decRate values of 100%,
representing a multiplier of 1. Pos or neg multipliers can go no higher than 10.

For example, passing a value of -2 to incRateModifier will divide the current
incRate by 2, halving the amount by which the meter of increases at each tick.
Passing a value of 2 to decRateModifier will multiply the current decRate by 2,
doubling the amount by which this meter decreases at each tick.

The triggers array is not currently used but will function in the same way
that it does in the entitiesData object */

// TODO add correct modifiers for each condition
// TOTO add triggers for custom logic to fire while certain conditions are active

export const conditionsData: ConditionDetails[] = [
  {
    name: 'asleep',
    modifiers: [{ meter: 'hunger', incRateModifier: 0, decRateModifier: -2 }],
    triggers: [],
  },
  {
    name: 'washing',
    modifiers: [{ meter: 'hunger', incRateModifier: 0, decRateModifier: -2 }],
    triggers: [],
  },
  {
    name: 'relaxing',
    modifiers: [],
    triggers: [],
  },
  {
    name: 'working',
    modifiers: [],
    triggers: [],
  },
  {
    name: 'cleaning',
    modifiers: [],
    triggers: [],
  },
  {
    name: 'cooking',
    modifiers: [],
    triggers: [],
  },
  {
    name: 'snacking',
    modifiers: [],
    triggers: [],
  },
  {
    name: 'watering',
    modifiers: [],
    triggers: [],
  },
  {
    name: 'wallowing',
    modifiers: [],
    triggers: [],
  },
  {
    name: 'hungry',
    modifiers: [],
    triggers: [],
  },
  {
    name: 'overfed',
    modifiers: [],
    triggers: [],
  },
  {
    name: 'starved',
    modifiers: [],
    triggers: [],
  },
  {
    name: 'lethargic',
    modifiers: [],
    triggers: [],
  },
  {
    name: 'exhausted',
    modifiers: [],
    triggers: [],
  },
  {
    name: 'delirious',
    modifiers: [],
    triggers: [],
  },
  {
    name: 'unwell',
    modifiers: [],
    triggers: [],
  },
  {
    name: 'hardy',
    modifiers: [],
    triggers: [],
  },
  {
    name: 'feverish',
    modifiers: [],
    triggers: [],
  },
  {
    name: 'broke',
    modifiers: [],
    triggers: [],
  },
  {
    name: 'rich',
    modifiers: [],
    triggers: [],
  },
  {
    name: 'unfit',
    modifiers: [],
    triggers: [],
  },
  {
    name: 'injured',
    modifiers: [],
    triggers: [],
  },
  {
    name: 'depressed',
    modifiers: [],
    triggers: [],
  },
  {
    name: 'ecstatic',
    modifiers: [],
    triggers: [],
  },
  {
    name: 'filthy',
    modifiers: [],
    triggers: [],
  },
  {
    name: 'anal',
    modifiers: [],
    triggers: [],
  },
  {
    name: 'achey',
    modifiers: [],
    triggers: [],
  },
  {
    name: 'cosy',
    modifiers: [],
    triggers: [],
  },
  {
    name: 'lonely',
    modifiers: [],
    triggers: [],
  },
  {
    name: 'dependent',
    modifiers: [],
    triggers: [],
  },
  {
    name: 'bored',
    modifiers: [],
    triggers: [],
  },
  {
    name: 'overstimulated',
    modifiers: [],
    triggers: [],
  },
  {
    name: 'trapped',
    modifiers: [],
    triggers: [],
  },
  {
    name: 'wild',
    modifiers: [],
    triggers: [],
  },
  {
    name: 'apathetic',
    modifiers: [],
    triggers: [],
  },
  {
    name: 'ambitious',
    modifiers: [],
    triggers: [],
  },
  {
    name: 'nauseous',
    modifiers: [],
    triggers: [],
  },
  {
    name: 'greedy',
    modifiers: [],
    triggers: [],
  },
  {
    name: 'unstable',
    modifiers: [],
    triggers: [],
  },
  {
    name: 'enlightened',
    modifiers: [],
    triggers: [],
  },
];

class Conditions {
  [key: string]: Condition;

  constructor(conditionsArr: ConditionDetails[]) {
    conditionsArr.forEach((condition: ConditionDetails) => {
      this[condition.name] = {
        modifiers: condition.modifiers,
        triggers: condition.triggers,
      };
    });
  }
}

export const conditions = new Conditions(conditionsData);
