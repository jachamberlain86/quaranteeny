import { store } from '../app/store';
import {
  addCondition,
  removeCondition,
  changeInteraction,
  selectConditions,
  selectCurrentInteraction,
  setInteractionProgress,
} from '../features/sprite/spriteSlice';
import {
  setGameOver,
  selectGameOver,
  selectGameTime,
  increaseStarvation,
  increaseSleepDep,
  increaseSick,
  decreaseStarvation,
  decreaseSleepDep,
  decreaseSick,
  selectStarvation,
  selectSleepDep,
  selectSick,
} from '../features/game/gameSlice';
import { addModifier, removeModifier } from '../features/meters/metersSlice';
import { MeterModifier } from '../interfaces/meterModifier.interface';
import { deductCost, triggerChangeMeters } from './meters.helper';
import { calcPercentage } from './game.helper';
import { Entity } from '../interfaces/entity.interface';
import { conditions } from '../data/conditions.data';
import { entities } from '../data/entities.data';
import { day } from '../data/time.data';
import { houseInteractablesObj } from '../audioControllers/houseObjectsSounds';

// Calls functions to add condition strings to sprite state and then adjust inc and dec rates based on a modifier in meters state

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

// Set to null if not interacting with anything or to a string identifying current interaction

export function setCurrentInteraction(newInteraction: string | null): boolean {
  const currentInteraction = selectCurrentInteraction(store.getState());
  if (currentInteraction === newInteraction) return false;
  store.dispatch(changeInteraction(newInteraction));
  return true;
}

function getEntityData(entity: string): Entity {
  return entities[entity];
}

// On a player interacting with an interactable entity, this function is called

export const handleInteraction = (entity: string): void => {
  const entityData: Entity = getEntityData(entity);
  if (deductCost(entityData.cost)) {
    if (entityData.conditions.length)
      triggerAddConditions(entityData.conditions);
    triggerChangeMeters(entityData, entity);
  }
};

// Used to check whether lose state conditions are present in the sprite's conditions array

export const checkConditionsState = (): void => {
  const { gameHour, updateInterval } = selectGameTime(store.getState().game);
  const timer = setInterval(() => {
    const gameOver = selectGameOver(store.getState());
    if (gameOver) clearInterval(timer);
    else {
      const currentConditions = selectConditions(store.getState());
      if (currentConditions.includes('exhausted'))
        store.dispatch(increaseSleepDep());
      else store.dispatch(decreaseSleepDep());
      if (currentConditions.includes('malnourished'))
        store.dispatch(increaseStarvation());
      else store.dispatch(decreaseStarvation());
      if (currentConditions.includes('unwell')) store.dispatch(increaseSick());
      else store.dispatch(decreaseSick());
    }
  }, gameHour * updateInterval);
};

// After specific periods of time with certain losing conditions in the sprite's conditions array different states are added and then a gave over is triggered if still unresolved.

export const checkLoseStates = (): void => {
  const { gameHour, updateInterval } = selectGameTime(store.getState().game);
  const timer = setInterval(() => {
    const starvation = selectStarvation(store.getState());
    const sleepDep = selectSleepDep(store.getState());
    const sick = selectSick(store.getState());
    if (starvation > day * 5 || sleepDep > day * 8 || sick > day * 7) {
      store.dispatch(setGameOver());
      clearInterval(timer);
    }
    if (starvation > day * 3) {
      triggerAddConditions(['starved']);
    }
    if (starvation < day * 3) {
      triggerRemoveConditions(['starved']);
    }
    if (sleepDep > day * 3) {
      triggerAddConditions(['strange']);
    }
    if (sleepDep < day * 3) {
      triggerRemoveConditions(['strange']);
    }
    if (sick > day * 4) {
      triggerAddConditions(['feverish']);
    }
    if (sick < day * 4) {
      triggerRemoveConditions(['feverish']);
    }
  }, gameHour * updateInterval);
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
