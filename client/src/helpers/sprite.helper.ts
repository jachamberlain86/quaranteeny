import { store } from '../app/store';
import { addCondition, removeCondition } from '../features/sprite/spriteSlice';
import { addModifier, removeModifier } from '../features/meters/metersSlice';
import { MeterModifier } from '../interfaces/meterModifier.interface';
import { conditions } from '../data/conditions.data';

export function triggerAddConditions(conditionsArr: string[]): void {
  conditionsArr.forEach((condition: string) => {
    store.dispatch(addCondition(condition));
    conditions[condition].modifiers.forEach((modifier: MeterModifier) => {
      store.dispatch(addModifier(modifier));
    });
  });
}

export function triggerRemoveConditions(conditionsArr: string[]): void {
  conditionsArr.forEach((condition: string) => {
    store.dispatch(removeCondition(condition));
    conditions[condition].modifiers.forEach((modifier: MeterModifier) => {
      store.dispatch(removeModifier(modifier));
    });
  });
}
