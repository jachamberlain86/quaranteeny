import { store } from '../app/store';
import {
  addCondition,
  removeCondition,
  changeInteraction,
  selectConditions,
  selectCurrentInteraction,
  increaseStarvation,
  increaseSleepDep,
  increaseSick,
  decreaseStarvation,
  decreaseSleepDep,
  decreaseSick,
  selectStarvation,
  selectSleepDep,
  selectSick,
  setInteractionProgress,
} from '../features/sprite/spriteSlice';
import { setGameOver, selectGameOver } from '../features/game/gameSlice';
import { addModifier, removeModifier } from '../features/meters/metersSlice';
import { MeterModifier } from '../interfaces/meterModifier.interface';
import { deductCost, triggerChangeMeters } from './meters.helper';
import { calcPercentage } from './game.helper';
import { Entity } from '../interfaces/entity.interface';
import { conditions } from '../data/conditions.data';
import { entities } from '../data/entities.data';
import { gameHour } from '../data/gameTime.data';
import { day } from '../data/time.data';

export function triggerAddConditions(conditionsArr: string[]): void {
  const currentConditions = selectConditions(store.getState());
  conditionsArr.forEach((condition: string) => {
    if (!currentConditions.includes(condition)) {
      store.dispatch(addCondition(condition));
      conditions[condition].modifiers.forEach((modifier: MeterModifier) => {
        store.dispatch(addModifier(modifier));
      });
    }
  });
}

export function triggerRemoveConditions(conditionsArr: string[]): void {
  const currentConditions = selectConditions(store.getState());
  conditionsArr.forEach((condition: string) => {
    if (currentConditions.includes(condition)) {
      store.dispatch(removeCondition(condition));
      conditions[condition].modifiers.forEach((modifier: MeterModifier) => {
        store.dispatch(removeModifier(modifier));
      });
    }
  });
}

export function setCurrentInteraction(newInteraction: string | null): boolean {
  const currentInteraction = selectCurrentInteraction(store.getState());
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
    if (entityData.conditions.length)
      triggerAddConditions(entityData.conditions);
    triggerChangeMeters(entityData, entity);
  }
};

export const checkConditionsState = (): void => {
  const timer = setInterval(() => {
    const gameOver = selectGameOver(store.getState());
    if (gameOver) clearInterval(timer);
    else {
      const currentConditions = selectConditions(store.getState());
      if (currentConditions.includes('exhausted'))
        store.dispatch(increaseSleepDep());
      else store.dispatch(decreaseSleepDep());
      if (currentConditions.includes('starving'))
        store.dispatch(increaseStarvation());
      else store.dispatch(decreaseStarvation());
      if (currentConditions.includes('unwell')) store.dispatch(increaseSick());
      else store.dispatch(decreaseSick());
    }
  }, gameHour);
};

export const checkLoseStates = (): void => {
  const timer = setInterval(() => {
    const starvation = selectStarvation(store.getState());
    const sleepDep = selectSleepDep(store.getState());
    const sick = selectSick(store.getState());
    if (starvation > day * 5 || sleepDep > day * 8 || sick > day * 7) {
      store.dispatch(setGameOver());
      clearInterval(timer);
    }
    if (starvation > day * 3) {
      triggerAddConditions(['emaciated']);
    }
    if (starvation < day * 3) {
      triggerRemoveConditions(['emaciated']);
    }
    if (sleepDep > day * 3) {
      triggerAddConditions(['hallucinating']);
    }
    if (sleepDep < day * 3) {
      triggerRemoveConditions(['hallucinating']);
    }
    if (sick > day * 4) {
      triggerAddConditions(['feverish']);
    }
    if (sick < day * 4) {
      triggerRemoveConditions(['feverish']);
    }
  }, gameHour);
};

export function updateInteractionProgress(
  current: number,
  total: number
): void {
  let percentageComplete;
  if (current === 0 && total === 0) {
    percentageComplete = null;
  } else {
    percentageComplete = 100 - calcPercentage(current, total);
  }
  store.dispatch(setInteractionProgress(percentageComplete));
}
