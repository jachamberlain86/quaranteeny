import { store } from '../app/store';
import {
  changeValueScaled,
  changeValueFixed,
  selectMeterValue,
  pauseDecayOn,
  resetMeterPauseDecayToInit,
  selectPauseDecay,
} from '../features/meters/metersSlice';
import { selectGameOver, selectGameTime } from '../features/game/gameSlice';
import {
  changeInteraction,
  selectCurrentInteraction,
  selectInteractionChangesRemaining,
  setInteractionChangesRemaining,
  decrementInteractionChangesRemaining,
  setInteractionProgress,
  updateCurrentThought,
} from '../features/sprite/spriteSlice';
import { MeterChange } from '../interfaces/meterChange.interface';
import { meters, Meters } from '../data/meters.data';
import {
  triggerAddConditions,
  triggerRemoveConditions,
  updateInteractionProgress,
} from './sprite.helper';
import { Entity } from '../interfaces/entity.interface';
import { stopObjectSound } from '../audioControllers/houseObjectsSounds';
import { minute } from '../data/time.data';

function checkPauseDecayState(meter: string): boolean {
  return selectPauseDecay(store.getState(), meter);
}

function deductRent(): void {
  const currentValue = selectMeterValue(store.getState(), 'money');
  if (currentValue > 0) {
    store.dispatch(changeValueFixed({ name: 'money', amount: -200 }));
  }
}

// On game init, all meters will state to decay at their defined decay rate. At faster game speeds, calls to decay the meter are reduced by updateInterval. Meters decay by greater amounts when there are greater intervals between function calls.

export const decayMeters = (metersObj: Meters): NodeJS.Timeout[] => {
  const { gameMinute, gameDay, updateInterval } = selectGameTime(
    store.getState().game
  );
  const timersArr: NodeJS.Timeout[] = [];
  const keysArr = Object.keys(metersObj);
  keysArr.forEach((key) => {
    const meter = metersObj[key];
    const decayTimer = setInterval(() => {
      const gameOver = selectGameOver(store.getState());
      const pausedDecay = checkPauseDecayState(key);
      if (gameOver) clearInterval(decayTimer);
      else if (!pausedDecay) {
        const currentValue = selectMeterValue(store.getState(), key);
        if (currentValue > 0) {
          store.dispatch(
            changeValueScaled({
              name: key,
              amount: meter.decayRate * updateInterval,
            })
          );
        }
      }
    }, gameMinute * updateInterval);
    timersArr.push(decayTimer);
  });
  const minuteTimer = setInterval(() => {
    const gameOver = selectGameOver(store.getState());
    if (gameOver) clearInterval(minuteTimer);
    store.dispatch(updateCurrentThought());
  }, minute / 2);
  const weekTimer = setInterval(() => {
    const gameOver = selectGameOver(store.getState());
    if (gameOver) clearInterval(weekTimer);
    else {
      deductRent();
    }
  }, gameDay * 7);

  return [minuteTimer, weekTimer, ...timersArr];
};

// Used to watch meters falling in an out of danger zones, adding and removing relevant conditions when necessary.

export const checkMeterStates = (): NodeJS.Timeout[] => {
  const { gameMinute, updateInterval } = selectGameTime(store.getState().game);
  const meterNames = Object.keys(meters);
  const timersArr: NodeJS.Timeout[] = [];
  meterNames.forEach((meter) => {
    let deficitAdded = false;
    let excessAdded = false;
    const timer = setInterval(() => {
      const gameOver = selectGameOver(store.getState());
      if (gameOver) clearInterval(timer);
      else {
        const meterValue = selectMeterValue(store.getState(), meter);
        if (meterValue < meters[meter].deficitPoint && !deficitAdded) {
          triggerAddConditions(meters[meter].deficitImpacts);
          deficitAdded = true;
          excessAdded = false;
        } else if (meterValue > meters[meter].excessPoint && !excessAdded) {
          triggerAddConditions(meters[meter].excessImpacts);
          excessAdded = true;
          deficitAdded = false;
        } else if (meterValue > meters[meter].deficitPoint && deficitAdded) {
          triggerRemoveConditions(meters[meter].deficitImpacts);
          deficitAdded = false;
        } else if (meterValue < meters[meter].excessPoint && excessAdded) {
          triggerRemoveConditions(meters[meter].excessImpacts);
          excessAdded = false;
        }
      }
    }, gameMinute * updateInterval);
    timersArr.push(timer);
  });
  return timersArr;
};

export function deductCost(cost: number): boolean {
  const money = selectMeterValue(store.getState(), 'money');
  if (money < cost) return false;
  const meterImpact = { name: 'money', amount: -cost };
  store.dispatch(changeValueFixed(meterImpact));
  return true;
}

// Called when interacting with an interactable entity that does not have an immediate effect. Works out number of iterations based on intervals between function calls. Pauses meter decay for each meter on activation and unpauses if cancelled or complete. Also calls function to update interaction progress.

export function triggerIncrementalChange(
  entityData: Entity,
  entity: string
): NodeJS.Timeout {
  const { gameMinute, gameHour, updateInterval } = selectGameTime(
    store.getState().game
  );
  const iterations = Math.ceil(
    (entityData.hoursToComplete * gameHour) / (gameMinute * updateInterval)
  );
  // This is to check if the interaction is already in progress
  const interactionChangesRemainingInitial = selectInteractionChangesRemaining(
    store.getState()
  );
  if (interactionChangesRemainingInitial === 0) {
    store.dispatch(setInteractionChangesRemaining(iterations));
    // This is so that the progress bar displays as soon as an interaction is
    // started, and we don't have to wait until the first setInterval runs
    // before the progress bar shows.
    store.dispatch(setInteractionProgress(0));
  }
  const timer = setInterval(() => {
    const gameOver = selectGameOver(store.getState());
    const interactionChangesRemaining = selectInteractionChangesRemaining(
      store.getState()
    );
    const pausedMeters: string[] = [];
    entityData.meterImpacts.forEach((impactObj): void => {
      if (checkPauseDecayState(impactObj.name))
        pausedMeters.push(impactObj.name);
    });
    if (gameOver) {
      clearInterval(timer);
    } else {
      const currentInteraction = selectCurrentInteraction(store.getState());
      if (currentInteraction !== entity) {
        stopObjectSound();
        clearInterval(timer);
        triggerRemoveConditions(entityData.conditions);
        updateInteractionProgress(0, 0);
        pausedMeters.forEach((meter) =>
          store.dispatch(resetMeterPauseDecayToInit(meter))
        );
      } else if (interactionChangesRemaining <= 0) {
        stopObjectSound();
        clearInterval(timer);
        triggerRemoveConditions(entityData.conditions);
        pausedMeters.forEach((meter) =>
          store.dispatch(resetMeterPauseDecayToInit(meter))
        );
        store.dispatch(changeInteraction('cancel'));
        updateInteractionProgress(0, 0);
      } else {
        updateInteractionProgress(interactionChangesRemaining, iterations);

        entityData.meterImpacts.forEach((meterImpact: MeterChange) => {
          if (!pausedMeters.includes(meterImpact.name))
            store.dispatch(pauseDecayOn(meterImpact.name));
          const incrementalValue = Math.ceil(meterImpact.amount / iterations);
          store.dispatch(
            changeValueScaled({
              name: meterImpact.name,
              amount: incrementalValue,
            })
          );
        });
        store.dispatch(decrementInteractionChangesRemaining());
      }
    }
  }, gameMinute * updateInterval);
  return timer;
}

function triggerImmediateChange(entityData: Entity): void {
  if (entityData.meterImpacts.length) {
    entityData.meterImpacts.forEach((meterImpact: MeterChange) => {
      store.dispatch(changeValueScaled(meterImpact));
    });
    triggerRemoveConditions(entityData.conditions);
  }
  setTimeout(() => {
    store.dispatch(changeInteraction('cancel'));
  }, 200);
}

export function triggerChangeMeters(entityData: Entity, entity: string): void {
  if (entityData.hoursToComplete === 0) {
    triggerImmediateChange(entityData);
  } else {
    triggerIncrementalChange(entityData, entity);
  }
}
