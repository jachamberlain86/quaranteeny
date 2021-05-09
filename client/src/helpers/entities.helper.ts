import { store } from '../app/store';
import { changeByAmount } from '../features/meters/metersSlice';
import { interactableEntities } from '../data/entities.data';
import { Entity } from '../interfaces/entity.interface';
import { MeterChange } from '../interfaces/meterChange.interface';

function getEntityData(entity: string): Entity {
  return interactableEntities[entity];
}

export const handleInteraction = (entity: string): void => {
  const entityData: Entity = getEntityData(entity);
  entityData.meterImpacts.forEach((meter: MeterChange) => {
    store.dispatch(changeByAmount(meter));
  });
};
