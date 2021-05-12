import { gameMinute, gameHour } from './gameTime.data';
import { hour } from './time.data';
import { Entity } from '../interfaces/entity.interface';
import { EntityDetails } from '../interfaces/entityDetails.interface';

// A reference for unchanging game data in relation to interactable game entities. Generates an entities object based off hard coded entity names, cost values, timeToComplete values, arrays of meter impact objects, and conditions activated during the interaction.

// timeToComplete values use scaling time variables from gameTime.data.ts. This enables the interaction duration to scale with game speed.

// Meter impact objects are passed a string, indentifying the meter impacted during the interaction, and a value that indicates the total amount by which that meter will change by if the full duration of the interaction is allowed to be carried out. These values can be positive or negative and should be set using the fix time variables in time.data.ts

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
    conditions: ['unconcious'],
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
