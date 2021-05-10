import { store } from '../app/store';
import {
  addCondition,
  removeCondition,
  changeInteraction,
  selectConditions,
  increaseStarvation,
  increaseSleepDep,
  increaseSick,
  decreaseStarvation,
  decreaseSleepDep,
  decreaseSick,
  selectStarvation,
  selectSleepDep,
  selectSick,
} from '../features/sprite/spriteSlice';
import { setGameOver, selectGameOver } from '../features/game/gameSlice';
import { addModifier, removeModifier } from '../features/meters/metersSlice';
import { MeterModifier } from '../interfaces/meterModifier.interface';
import { deductCost, triggerChangeMeters } from './meters.helper';
import { Entity } from '../interfaces/entity.interface';
import { conditions } from '../data/conditions.data';
import { entities } from '../data/entities.data';
import { gameHour } from '../data/time.data';

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

export function setCurrentInteraction(newInteraction: string | null): boolean {
  const appStore = store.getState();
  const { currentInteraction } = appStore.sprite;
  if (currentInteraction === newInteraction) return false;
  store.dispatch(changeInteraction(newInteraction));
  return true;
}

function getEntityData(entity: string): Entity {
  return entities[entity];
}

export const handleInteraction = (entity: string): void => {
  const entityData: Entity = getEntityData(entity);
  if (deductCost(entityData.cost)) {
    triggerAddConditions(entityData.conditions);
    triggerChangeMeters(entityData, entity);
  }
};

export const checkConditionsState = (): void => {
  const timer = setInterval(() => {
    const gameOver = selectGameOver(store.getState());
    if (gameOver) clearInterval(timer);
    else {
      const currentConditions = selectConditions(store.getState().sprite);
      if (currentConditions.includes('exhausted'))
        store.dispatch(increaseSleepDep());
      else store.dispatch(decreaseSleepDep());
      if (currentConditions.includes('starving'))
        store.dispatch(increaseStarvation());
      else store.dispatch(decreaseStarvation());
      if (currentConditions.includes('unwell')) store.dispatch(increaseSick());
      else store.dispatch(decreaseSick());
      console.log(currentConditions);
    }
  }, gameHour);
};

export const checkLoseStates = (): void => {
  let sleepDepAdded = false;
  const timer = setInterval(() => {
    const starvation = selectStarvation(store.getState().sprite);
    const sleepDep = selectSleepDep(store.getState().sprite);
    const sick = selectSick(store.getState().sprite);
    console.log(
      'starvation ',
      starvation,
      ' sleepDep ',
      sleepDep,
      ' sick ',
      sick
    );
    if (starvation > 190 || sleepDep > 260 || sick > 160) {
      store.dispatch(setGameOver());
      clearInterval(timer);
      console.log('You died!');
    }
    if (sleepDep > 72 && sleepDepAdded === false) {
      triggerAddConditions(['hallucinating']);
      sleepDepAdded = true;
    }
    if (sleepDep < 72 && sleepDepAdded === true) {
      triggerRemoveConditions(['hallucinating']);
      sleepDepAdded = false;
    }
  }, gameHour);
};
