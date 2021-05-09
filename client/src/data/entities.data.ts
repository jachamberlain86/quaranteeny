import { gameMinute, gameHour } from './time.data';
import { Entity } from '../interfaces/entity.interface';
import { EntityDetails } from '../interfaces/entityDetails.interface';

export const entities: EntityDetails[] = [
  {
    name: 'fridge',
    timeToComplete: gameMinute * 30,
    meterImpacts: [
      { name: 'hunger', amount: 1000 },
      { name: 'money', amount: -50 },
    ],
  },
  {
    name: 'bed',
    timeToComplete: gameHour * 8,
    meterImpacts: [{ name: 'energy', amount: 2000 }],
  },
];

class Entities {
  [key: string]: Entity;

  constructor(entitiesArr: EntityDetails[]) {
    entitiesArr.forEach((entity: EntityDetails) => {
      this[entity.name] = {
        timeToComplete: entity.timeToComplete,
        meterImpacts: entity.meterImpacts,
      };
    });
  }
}

export const interactableEntities = new Entities(entities);
