import { hour } from './time.data';
import { Entity } from '../interfaces/entity.interface';
import { EntityDetails } from '../interfaces/entityDetails.interface';
import { selectGameTime } from '../features/game/gameSlice';
import { store } from '../app/store';

// A reference for unchanging game data in relation to interactable game entities. Generates an entities object based off hard coded entity names, cost values, timeToComplete values, arrays of meter impact objects, and conditions activated during the interaction.

// timeToComplete values use scaling time variables from gameTime.data.ts. This enables the interaction duration to scale with game speed.

// Meter impact objects are passed a string, indentifying the meter impacted during the interaction, and a value that indicates the total amount by which that meter will change by if the full duration of the interaction is allowed to be carried out. These values can be positive or negative and should be set using the fix time variables in time.data.ts

const entitiesData: EntityDetails[] = [
  {
    name: 'bed',
    cost: 0,
    hoursToComplete: 8,
    meterImpacts: [{ name: 'energy', amount: hour * 16 }],
    conditions: ['unconscious'],
  },
  {
    name: 'dresser',
    cost: 0,
    hoursToComplete: 8,
    meterImpacts: [{ name: 'energy', amount: hour * 16 }],
    conditions: [],
  },
  {
    name: 'basin',
    cost: 0,
    hoursToComplete: 8,
    meterImpacts: [{ name: 'energy', amount: hour * 16 }],
    conditions: [],
  },
  {
    name: 'bath',
    cost: 0,
    hoursToComplete: 8,
    meterImpacts: [{ name: 'energy', amount: hour * 16 }],
    conditions: [],
  },
  {
    name: 'lamp',
    cost: 0,
    hoursToComplete: 8,
    meterImpacts: [{ name: 'energy', amount: hour * 16 }],
    conditions: [],
  },
  {
    name: 'bookcase',
    cost: 0,
    hoursToComplete: 8,
    meterImpacts: [{ name: 'energy', amount: hour * 16 }],
    conditions: [],
  },
  {
    name: 'jukebox',
    cost: 0,
    hoursToComplete: 8,
    meterImpacts: [{ name: 'energy', amount: hour * 16 }],
    conditions: [],
  },
  {
    name: 'desk',
    cost: 0,
    hoursToComplete: 8,
    meterImpacts: [{ name: 'energy', amount: hour * 16 }],
    conditions: [],
  },
  {
    name: 'sink',
    cost: 0,
    hoursToComplete: 8,
    meterImpacts: [{ name: 'energy', amount: hour * 16 }],
    conditions: [],
  },
  {
    name: 'oven',
    cost: 0,
    hoursToComplete: 8,
    meterImpacts: [{ name: 'energy', amount: hour * 16 }],
    conditions: [],
  },
  {
    name: 'fridge',
    cost: 0,
    hoursToComplete: 8,
    meterImpacts: [{ name: 'energy', amount: hour * 16 }],
    conditions: [],
  },
  {
    name: 'sofa',
    cost: 0,
    hoursToComplete: 8,
    meterImpacts: [{ name: 'energy', amount: hour * 16 }],
    conditions: [],
  },
  {
    name: 'plant',
    cost: 0,
    hoursToComplete: 8,
    meterImpacts: [{ name: 'energy', amount: hour * 16 }],
    conditions: [],
  },
  {
    name: 'table',
    cost: 0,
    hoursToComplete: 8,
    meterImpacts: [{ name: 'energy', amount: hour * 16 }],
    conditions: [],
  },
];

export class Entities {
  [key: string]: Entity;

  constructor(entitiesArr: EntityDetails[]) {
    entitiesArr.forEach((entity: EntityDetails) => {
      this[entity.name] = {
        cost: entity.cost,
        hoursToComplete: entity.hoursToComplete,
        meterImpacts: entity.meterImpacts,
        conditions: entity.conditions,
      };
    });
  }
}

export const entities = new Entities(entitiesData);
