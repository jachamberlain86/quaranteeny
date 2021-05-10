import { gameMinute, gameHour } from './time.data';
import { Entity } from '../interfaces/entity.interface';
import { EntityDetails } from '../interfaces/entityDetails.interface';

export const entitiesData: EntityDetails[] = [
  {
    name: 'takeaway',
    cost: 50,
    timeToComplete: gameMinute * 30,
    meterImpacts: [
      { name: 'hunger', amount: 1000 },
      { name: 'health', amount: -100 },
    ],
    conditions: [],
  },
  {
    name: 'salad',
    cost: 0,
    timeToComplete: gameMinute * 15,
    meterImpacts: [{ name: 'hunger', amount: 500 }],
    conditions: [],
  },
  {
    name: 'bed',
    cost: 0,
    timeToComplete: gameHour * 8,
    meterImpacts: [{ name: 'energy', amount: 2000 }],
    conditions: ['sleeping'],
  },
];

class Entities {
  [key: string]: Entity;

  constructor(entitiesArr: EntityDetails[]) {
    entitiesArr.forEach((entity: EntityDetails) => {
      this[entity.name] = {
        cost: entity.cost,
        timeToComplete: entity.timeToComplete,
        meterImpacts: entity.meterImpacts,
        conditions: entity.conditions,
      };
    });
  }
}

export const entities = new Entities(entitiesData);
