import { store } from '../app/store';
import {
  changeByAmount,
  selectMeterValue,
  togglePauseDecay,
  selectPauseDecay,
} from '../features/meters/metersSlice';
import { selectGameOver } from '../features/game/gameSlice';
import { selectCurrentInteraction } from '../features/sprite/spriteSlice';
import { MeterChange } from '../interfaces/meterChange.interface';
import { gameMinute } from '../data/gameTime.data';
import { decayFreq } from '../data/time.data';
import { meters, Meters } from '../data/meters.data';
import {
  triggerAddConditions,
  triggerRemoveConditions,
  setCurrentInteraction,
  updateInteractionProgress,
} from './sprite.helper';
import { Entity } from '../interfaces/entity.interface';

function checkPauseDecayState(meter: string): boolean {
  return selectPauseDecay(store.getState(), meter);
}

function triggerPauseDecayToggle(meter: string): void {
  store.dispatch(togglePauseDecay(meter));
}

export const decayMeters = (metersObj: Meters): void => {
  const keysArr = Object.keys(metersObj);
  keysArr.forEach((key) => {
    const meter = metersObj[key];
    const timer = setInterval(() => {
      const gameOver = selectGameOver(store.getState());
      const pausedDecay = checkPauseDecayState(key);
      if (gameOver) clearInterval(timer);
      else if (!pausedDecay) {
        const currentValue = selectMeterValue(store.getState(), key);
        if (currentValue > 0) {
          store.dispatch(
            changeByAmount({ name: key, amount: meter.decayRate })
          );
        }
      }
    }, gameMinute * decayFreq);
  });
};

export const checkMeterStates = (): void => {
  const meterNames = Object.keys(meters);
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
    }, gameMinute);
  });
};

export function deductCost(cost: number): boolean {
  const money = selectMeterValue(store.getState(), 'money');
  if (money < cost) return false;
  const meterImpact = { name: 'money', amount: -cost };
  store.dispatch(changeByAmount(meterImpact));
  return true;
}

function triggerIncrementalChange(entityData: Entity, entity: string): void {
  const iterations = Math.ceil(entityData.timeToComplete / 1000);
  let iterationCount = iterations;
  const timer = setInterval(() => {
    const gameOver = selectGameOver(store.getState());
    const pausedMeters: string[] = [];
    entityData.meterImpacts.forEach((impactObj): void => {
      if (checkPauseDecayState(impactObj.name))
        pausedMeters.push(impactObj.name);
    });
    if (gameOver) {
      clearInterval(timer);
      pausedMeters.forEach((meter) => triggerPauseDecayToggle(meter));
    } else {
      const currentInteraction = selectCurrentInteraction(store.getState());
      if (currentInteraction !== entity) {
        clearInterval(timer);
        triggerRemoveConditions(entityData.conditions);
        pausedMeters.forEach((meter) => triggerPauseDecayToggle(meter));
      } else if (iterationCount === 0) {
        clearInterval(timer);
        triggerRemoveConditions(entityData.conditions);
        pausedMeters.forEach((meter) => triggerPauseDecayToggle(meter));
        setCurrentInteraction(null);
        updateInteractionProgress(0, 0);
      } else {
        updateInteractionProgress(iterationCount, iterations);
        entityData.meterImpacts.forEach((meterImpact: MeterChange) => {
          if (!pausedMeters.includes(meterImpact.name))
            triggerPauseDecayToggle(meterImpact.name);
          const incrementalValue = Math.round(meterImpact.amount / iterations);
          store.dispatch(
            changeByAmount({ name: meterImpact.name, amount: incrementalValue })
          );
          iterationCount -= 1;
        });
      }
    }
  }, gameMinute);
}

function triggerImmediateChange(entityData: Entity): void {
  entityData.meterImpacts.forEach((meterImpact: MeterChange) => {
    store.dispatch(changeByAmount(meterImpact));
  });
  triggerRemoveConditions(entityData.conditions);
  setCurrentInteraction(null);
}

export function triggerChangeMeters(entityData: Entity, entity: string): void {
  if (entityData.timeToComplete === 0) {
    triggerImmediateChange(entityData);
  } else {
    triggerIncrementalChange(entityData, entity);
  }
}
