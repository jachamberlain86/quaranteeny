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
// TODO add triggers for custom logic to fire while certain conditions are active

export const conditionsData: ConditionDetails[] = [
  {
    name: 'asleep',
    modifiers: [
      { meter: 'hunger', incRateModifier: 0, decRateModifier: -2 },
      { meter: 'engagement', incRateModifier: 0, decRateModifier: -2 },
      { meter: 'hygeine', incRateModifier: 0, decRateModifier: 1.5 },
      { meter: 'fitness', incRateModifier: 0, decRateModifier: 1.5 },
    ],
    triggers: [],
  },
  {
    name: 'washing',
    modifiers: [
      { meter: 'engagement', incRateModifier: 0, decRateModifier: -2 },
      { meter: 'energy', incRateModifier: 0, decRateModifier: -1.5 },
    ],
    triggers: [],
  },
  {
    name: 'relaxing',
    modifiers: [
      { meter: 'energy', incRateModifier: 1.5, decRateModifier: -1.5 },
      { meter: 'health', incRateModifier: 0, decRateModifier: -1.5 },
      { meter: 'mood', incRateModifier: 1.5, decRateModifier: -1.5 },
      { meter: 'mind', incRateModifier: 1.5, decRateModifier: -1.5 },
      { meter: 'motivation', incRateModifier: 0, decRateModifier: 1.5 },
    ],
    triggers: [],
  },
  {
    name: 'working',
    modifiers: [
      { meter: 'motivation', incRateModifier: 2, decRateModifier: 0 },
    ],
    triggers: [],
  },
  {
    name: 'cleaning',
    modifiers: [{ meter: 'hygeine', incRateModifier: 0, decRateModifier: -2 }],
    triggers: [],
  },
  {
    name: 'cooking',
    modifiers: [
      { meter: 'engagement', incRateModifier: 0, decRateModifier: -2 },
    ],
    triggers: [],
  },
  {
    name: 'snacking',
    modifiers: [
      { meter: 'engagement', incRateModifier: 0, decRateModifier: -2 },
    ],
    triggers: [],
  },
  {
    name: 'watering',
    modifiers: [
      { meter: 'connection', incRateModifier: 0, decRateModifier: -2 },
    ],
    triggers: [],
  },
  {
    name: 'wallowing',
    modifiers: [],
    triggers: [],
  },
  {
    name: 'hungry',
    modifiers: [
      { meter: 'appetite', incRateModifier: 2, decRateModifier: -2 },
      { meter: 'mood', incRateModifier: -1.5, decRateModifier: 2 },
      { meter: 'energy', incRateModifier: -1.5, decRateModifier: 2 },
      { meter: 'comfort', incRateModifier: -1.5, decRateModifier: 2 },
    ],
    triggers: [],
  },
  {
    name: 'overfed',
    modifiers: [
      { meter: 'appetite', incRateModifier: -2, decRateModifier: 2 },
      { meter: 'comfort', incRateModifier: -1.5, decRateModifier: 2 },
      { meter: 'energy', incRateModifier: -1.5, decRateModifier: 2 },
    ],
    triggers: [],
  },
  {
    name: 'starved',
    modifiers: [
      { meter: 'energy', incRateModifier: -1.5, decRateModifier: 2 },
      { meter: 'health', incRateModifier: -1.5, decRateModifier: 2 },
      { meter: 'motivation', incRateModifier: -1.5, decRateModifier: 2 },
    ],
    triggers: [],
  },
  {
    name: 'lethargic',
    modifiers: [
      { meter: 'energy', incRateModifier: -1.5, decRateModifier: 1.5 },
      { meter: 'mood', incRateModifier: -1.5, decRateModifier: 1.5 },
      { meter: 'motivation', incRateModifier: -1.5, decRateModifier: 1.5 },
    ],
    triggers: [],
  },
  {
    name: 'exhausted',
    modifiers: [
      { meter: 'energy', incRateModifier: -1.5, decRateModifier: 1.5 },
      { meter: 'mood', incRateModifier: -1.5, decRateModifier: 1.5 },
      { meter: 'motivation', incRateModifier: -1.5, decRateModifier: 1.5 },
    ],
    triggers: [],
  },
  {
    name: 'delirious',
    modifiers: [{ meter: 'mind', incRateModifier: -1.5, decRateModifier: 2 }],
    triggers: [],
  },
  {
    name: 'unwell',
    modifiers: [
      { meter: 'energy', incRateModifier: -1.5, decRateModifier: 2 },
      { meter: 'mood', incRateModifier: -1.5, decRateModifier: 2 },
    ],
    triggers: [],
  },
  {
    name: 'hardy',
    modifiers: [
      { meter: 'energy', incRateModifier: -1.5, decRateModifier: 1.5 },
      { meter: 'mood', incRateModifier: -1.5, decRateModifier: 1.5 },
      { meter: 'motivation', incRateModifier: -1.5, decRateModifier: 1.5 },
    ],
    triggers: [],
  },
  {
    name: 'feverish',
    modifiers: [
      { meter: 'mind', incRateModifier: -1.5, decRateModifier: 2 },
      { meter: 'comfort', incRateModifier: -1.5, decRateModifier: 2 },
      { meter: 'hygeine', incRateModifier: -1.5, decRateModifier: 2 },
    ],
    triggers: [],
  },
  {
    name: 'broke',
    modifiers: [
      { meter: 'mind', incRateModifier: -1.5, decRateModifier: 2 },
      { meter: 'mood', incRateModifier: -1.5, decRateModifier: 2 },
    ],
    triggers: [],
  },
  {
    name: 'rich',
    modifiers: [
      { meter: 'connection', incRateModifier: -1.5, decRateModifier: 2 },
      { meter: 'appetite', incRateModifier: 2, decRateModifier: 0 },
    ],
    triggers: [],
  },
  {
    name: 'unfit',
    modifiers: [
      { meter: 'energy', incRateModifier: -1.5, decRateModifier: 2 },
      { meter: 'health', incRateModifier: -1.5, decRateModifier: 1.5 },
      { meter: 'motivation', incRateModifier: -1.5, decRateModifier: 1.5 },
    ],
    triggers: [],
  },
  {
    name: 'injured',
    modifiers: [
      { meter: 'comfort', incRateModifier: -1.5, decRateModifier: 2 },
      { meter: 'health', incRateModifier: -1.5, decRateModifier: 2 },
      { meter: 'mood', incRateModifier: -1.5, decRateModifier: 2 },
    ],
    triggers: [],
  },
  {
    name: 'depressed',
    modifiers: [
      { meter: 'mind', incRateModifier: -1.5, decRateModifier: 2 },
      { meter: 'health', incRateModifier: -1.5, decRateModifier: 2 },
      { meter: 'appetite', incRateModifier: -1.5, decRateModifier: 2 },
      { meter: 'motivation', incRateModifier: -1.5, decRateModifier: 2 },
      { meter: 'energy', incRateModifier: -1.5, decRateModifier: 2 },
      { meter: 'engagement', incRateModifier: -1.5, decRateModifier: 2 },
      { meter: 'freedom', incRateModifier: -1.5, decRateModifier: 2 },
    ],
    triggers: [],
  },
  {
    name: 'ecstatic',
    modifiers: [
      { meter: 'energy', incRateModifier: 1.5, decRateModifier: -1.5 },
      { meter: 'mind', incRateModifier: 1.5, decRateModifier: -1.5 },
      { meter: 'motivation', incRateModifier: 1.5, decRateModifier: -1.5 },
      { meter: 'engagement', incRateModifier: 1.5, decRateModifier: -1.5 },
    ],
    triggers: [],
  },
  {
    name: 'filthy',
    modifiers: [
      { meter: 'health', incRateModifier: -1.5, decRateModifier: 1.5 },
      { meter: 'comfort', incRateModifier: -1.5, decRateModifier: 1.5 },
    ],
    triggers: [],
  },
  {
    name: 'anal',
    modifiers: [
      { meter: 'freedom', incRateModifier: -1.5, decRateModifier: 2 },
      { meter: 'mind', incRateModifier: -1.5, decRateModifier: 2 },
    ],
    triggers: [],
  },
  {
    name: 'achey',
    modifiers: [{ meter: 'mood', incRateModifier: -1.5, decRateModifier: 2 }],
    triggers: [],
  },
  {
    name: 'cosy',
    modifiers: [
      { meter: 'energy', incRateModifier: 1.5, decRateModifier: -1.5 },
      { meter: 'motivation', incRateModifier: -1.5, decRateModifier: 1.5 },
    ],
    triggers: [],
  },
  {
    name: 'lonely',
    modifiers: [
      { meter: 'mood', incRateModifier: -1.5, decRateModifier: 2 },
      { meter: 'mind', incRateModifier: -1.5, decRateModifier: 2 },
      { meter: 'health', incRateModifier: -1.5, decRateModifier: 2 },
    ],
    triggers: [],
  },
  {
    name: 'dependent',
    modifiers: [{ meter: 'mind', incRateModifier: -1.5, decRateModifier: 2 }],
    triggers: [],
  },
  {
    name: 'bored',
    modifiers: [
      { meter: 'appetite', incRateModifier: 2, decRateModifier: 0 },
      { meter: 'energy', incRateModifier: -1.5, decRateModifier: 1.5 },
      { meter: 'freedom', incRateModifier: -1.5, decRateModifier: 1.5 },
    ],
    triggers: [],
  },
  {
    name: 'overstimulated',
    modifiers: [{ meter: 'mind', incRateModifier: -1.5, decRateModifier: 2 }],
    triggers: [],
  },
  {
    name: 'trapped',
    modifiers: [
      { meter: 'mind', incRateModifier: -1.5, decRateModifier: 2 },
      { meter: 'mood', incRateModifier: -1.5, decRateModifier: 2 },
    ],
    triggers: [],
  },
  {
    name: 'wild',
    modifiers: [
      { meter: 'hygeine', incRateModifier: 0, decRateModifier: -2 },
      { meter: 'engagement', incRateModifier: 0, decRateModifier: 2 },
      { meter: 'motivation', incRateModifier: 0, decRateModifier: 1.5 },
    ],
    triggers: [],
  },
  {
    name: 'apathetic',
    modifiers: [
      { meter: 'engagement', incRateModifier: 0, decRateModifier: 2 },
      { meter: 'mood', incRateModifier: 0, decRateModifier: -1.5 },
      { meter: 'freedom', incRateModifier: 0, decRateModifier: -1.5 },
    ],
    triggers: [],
  },
  {
    name: 'ambitious',
    modifiers: [
      { meter: 'engagement', incRateModifier: 0, decRateModifier: 2 },
      { meter: 'freedom', incRateModifier: 0, decRateModifier: -1.5 },
    ],
    triggers: [],
  },
  {
    name: 'nauseous',
    modifiers: [
      { meter: 'hunger', incRateModifier: -2, decRateModifier: -2 },
      { meter: 'health', incRateModifier: 0, decRateModifier: 1.5 },
    ],
    triggers: [],
  },
  {
    name: 'greedy',
    modifiers: [{ meter: 'hunger', incRateModifier: -2, decRateModifier: 2 }],
    triggers: [],
  },
  {
    name: 'unstable',
    modifiers: [
      { meter: 'mood', incRateModifier: 3, decRateModifier: 3 },
      { meter: 'motivation', incRateModifier: 3, decRateModifier: 3 },
      { meter: 'connection', incRateModifier: 3, decRateModifier: 3 },
      { meter: 'freedom', incRateModifier: 3, decRateModifier: 3 },
      { meter: 'energy', incRateModifier: 3, decRateModifier: 3 },
    ],
    triggers: [],
  },
  {
    name: 'enlightened',
    modifiers: [
      { meter: 'connection', incRateModifier: 0, decRateModifier: -2 },
      { meter: 'freedom', incRateModifier: 0, decRateModifier: -2 },
      { meter: 'mood', incRateModifier: 0, decRateModifier: -2 },
    ],
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
