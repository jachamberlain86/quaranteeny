import { store } from '../app/store';
import { changeInteraction } from '../features/sprite/spriteSlice';
import { entities } from '../data/entities.data';
import { Entity } from '../interfaces/entity.interface';
import { deductCost, triggerChangeMeters } from './meters.helper';
import { triggerAddConditions } from './sprite.helper';

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
