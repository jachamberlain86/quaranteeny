import { store } from '../app/store';
import { changeByAmount } from '../features/meters/metersSlice';
import {
  changeInteraction,
  addCondition,
  removeCondition,
} from '../features/sprite/spriteSlice';
import { entities } from '../data/entities.data';
import { Entity } from '../interfaces/entity.interface';
import { MeterChange } from '../interfaces/meterChange.interface';
import { gameMinute } from '../data/time.data';

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

function deductCost(cost: number): boolean {
  const appStore = store.getState();
  const { money } = appStore.meters;
  if (money < cost) return false;
  const meterImpact = { name: 'money', amount: -cost };
  store.dispatch(changeByAmount(meterImpact));
  return true;
}

function triggerRemoveConditions(conditions: string[]): void {
  conditions.forEach((condition: string) => {
    store.dispatch(removeCondition(condition));
  });
}

function triggerIncrementalChange(entityData: Entity, entity: string): void {
  const iterations = Math.round(entityData.timeToComplete / 1000);
  let iterationCount = iterations;
  const timer = setInterval(() => {
    const appStore = store.getState();
    const { currentInteraction } = appStore.sprite;
    if (currentInteraction !== entity) {
      clearInterval(timer);
      triggerRemoveConditions(entityData.conditions);
    } else if (iterationCount === 0) {
      clearInterval(timer);
      triggerRemoveConditions(entityData.conditions);
      setCurrentInteraction(null);
    } else {
      entityData.meterImpacts.forEach((meterImpact: MeterChange) => {
        const incrementalValue = Math.round(meterImpact.amount / iterations);
        store.dispatch(
          changeByAmount({ name: meterImpact.name, amount: incrementalValue })
        );
        iterationCount -= 1;
      });
    }
  }, gameMinute);
}

function triggerAddConditions(conditions: string[]): void {
  conditions.forEach((condition: string) => {
    store.dispatch(addCondition(condition));
  });
}

function triggerImmediateChange(entityData: Entity): void {
  entityData.meterImpacts.forEach((meterImpact: MeterChange) => {
    store.dispatch(changeByAmount(meterImpact));
  });
  triggerRemoveConditions(entityData.conditions);
  setCurrentInteraction(null);
}

function triggerChangeMeters(entityData: Entity, entity: string): void {
  if (entityData.timeToComplete === 0) {
    triggerImmediateChange(entityData);
  } else {
    triggerIncrementalChange(entityData, entity);
  }
}

export const handleInteraction = (entity: string): void => {
  const entityData: Entity = getEntityData(entity);
  if (deductCost(entityData.cost)) {
    triggerAddConditions(entityData.conditions);
    triggerChangeMeters(entityData, entity);
  }
};
