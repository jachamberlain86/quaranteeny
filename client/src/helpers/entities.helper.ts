import { store } from '../app/store';
import { changeByAmount } from '../features/needsMeters/needsMetersSlice';
import { entities } from '../data/entities.data';
import { Entities } from '../interfaces/entities.interface';
import { Entity } from '../interfaces/entity.interface';
import { MeterChange } from '../interfaces/meterChange.interface';

function getEntityData(entity: string): Entity {
  return entities[entity as keyof Entities];
}

export const handleInteraction = (entity: string): void => {
  const entityData: Entity = getEntityData(entity);
  entityData.meterImpacts.forEach((meter: MeterChange) => {
    store.dispatch(changeByAmount(meter));
  });
};
