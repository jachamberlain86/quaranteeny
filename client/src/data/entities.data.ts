import { gameMinute, gameHour } from './gameTime.data';
import { hour } from './time.data';
import { Entity } from '../interfaces/entity.interface';
import { EntityDetails } from '../interfaces/entityDetails.interface';

export const entitiesData: EntityDetails[] = [
  {
    name: 'takeaway',
    cost: 50,
    timeToComplete: gameMinute * 30,
    meterImpacts: [
      { name: 'hunger', amount: hour * 8 },
      { name: 'health', amount: -hour * 4 },
    ],
    conditions: [],
  },
  {
    name: 'salad',
    cost: 0,
    timeToComplete: gameMinute * 15,
    meterImpacts: [{ name: 'hunger', amount: hour * 5 }],
    conditions: [],
  },
  {
    name: 'bed',
    cost: 0,
    timeToComplete: gameHour * 8,
    meterImpacts: [{ name: 'energy', amount: hour * 16 }],
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
