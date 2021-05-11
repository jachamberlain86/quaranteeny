import { Condition } from '../interfaces/condition.interface';
import { ConditionDetails } from '../interfaces/conditionDetails.interface';
import { minute } from './time.data';

export const conditionsData: ConditionDetails[] = [
  {
    name: 'sleeping',
    modifiers: [
      { meter: 'hunger', incRateModifier: 0, decRateModifier: -(minute / 2) },
    ],
  },
  {
    name: 'starving',
    modifiers: [],
  },
  {
    name: 'overfed',
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
    name: 'hallucinating',
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
    name: 'food averse',
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
