import { store } from '../app/store';
import { changeByAmount } from '../features/meters/metersSlice';
import { changeInteraction } from '../features/sprite/spriteSlice';
import { interactableEntities } from '../data/entities.data';
import { Entity } from '../interfaces/entity.interface';
import { MeterChange } from '../interfaces/meterChange.interface';
import { gameMinute } from '../data/time.data';

export function setCurrentInteraction(newInteraction: string | null): boolean {
  const appStore = store.getState();
  const { currentInteraction } = appStore.sprite;
  if (currentInteraction === newInteraction) return false;
  store.dispatch(changeInteraction({ interaction: newInteraction }));
  return true;
}

function getEntityData(entity: string): Entity {
  return interactableEntities[entity];
}

function deductCost(cost: number): boolean {
  const appStore = store.getState();
  const { money } = appStore.meters;
  if (money < cost) return false;
  const meterImpact = { name: 'money', amount: -cost };
  store.dispatch(changeByAmount(meterImpact));
  return true;
}

function triggerIncrementalChange(
  time: number,
  meterImpact: MeterChange,
  entity: string
): void {
  let iterations = Math.round(time / 1000);
  const incrementalValue = Math.round(meterImpact.amount / iterations);
  const timer = setInterval(() => {
    const appStore = store.getState();
    const { currentInteraction } = appStore.sprite;
    if (currentInteraction !== entity) clearInterval(timer);
    if (iterations === 0) {
      clearInterval(timer);
      setCurrentInteraction(null);
    }
    store.dispatch(
      changeByAmount({ name: meterImpact.name, amount: incrementalValue })
    );
    iterations -= 1;
  }, gameMinute);
}

export const handleInteraction = (entity: string): void => {
  const entityData: Entity = getEntityData(entity);
  if (deductCost(entityData.cost)) {
    entityData.meterImpacts.forEach((meterImpact: MeterChange) => {
      if (entityData.timeToComplete === 0)
        store.dispatch(changeByAmount(meterImpact));
      else
        triggerIncrementalChange(
          entityData.timeToComplete,
          meterImpact,
          entity
        );
    });
  }
};
