import { Condition } from '../interfaces/condition.interface';
import { ConditionDetails } from '../interfaces/conditionDetails.interface';

export const conditionsData: ConditionDetails[] = [
  {
    name: 'sleeping',
    modifiers: [{ meter: 'hunger', incRateModifier: 0, decRateModifier: -50 }],
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
