import { hour, day } from './time.data';
import { Entity } from '../interfaces/entity.interface';
import { EntityDetails } from '../interfaces/entityDetails.interface';

/* A reference for unchanging game data in relation to interactable game entities.
Generates an entities object based off hard coded entity names, cost values,
timeToComplete values, arrays of meter impact objects,
and conditions activated during the interaction.

timeToComplete values are used with scaling time variables
found in gameSlice to calculate iterations required.
This enables the interaction duration to scale with game speed.

Meter impact objects are passed a string, indentifying the meter
impacted during the interaction, and a value that indicates the total
amount by which that meter will change by if the full duration
of the interaction is allowed to be carried out.
These values can be positive or negative and should be set using
the fixed time variables in time.data.ts

The triggers array causes custom logic to fire on the activation of
specific interactions */

const entitiesData: EntityDetails[] = [
  {
    name: 'bed',
    cost: 0,
    hoursToComplete: 8,
    meterImpacts: [
      { name: 'energy', amount: hour * 16 },
      { name: 'comfort', amount: hour * 6 },
      { name: 'motivation', amount: -hour * 6 },
      { name: 'mind', amount: hour * 16 },
    ],
    conditions: ['asleep'],
    triggers: [],
  },
  {
    name: 'dresser',
    cost: 0,
    hoursToComplete: 0,
    meterImpacts: [],
    conditions: [],
    triggers: ['clothes'],
  },
  {
    name: 'basin',
    cost: 0,
    hoursToComplete: 0.25,
    meterImpacts: [
      { name: 'hygeine', amount: hour * 4 },
      { name: 'energy', amount: hour * 2 },
    ],
    conditions: ['washing'],
    triggers: [],
  },
  {
    name: 'bath',
    cost: 0,
    hoursToComplete: 1,
    meterImpacts: [
      { name: 'mood', amount: hour * 3 },
      { name: 'hygeine', amount: hour * 16 },
    ],
    conditions: ['washing'],
    triggers: [],
  },
  {
    name: 'bookcase',
    cost: 0,
    hoursToComplete: 1,
    meterImpacts: [
      { name: 'mood', amount: hour * 2 },
      { name: 'engagement', amount: hour * 4 },
      { name: 'mind', amount: hour * 6 },
    ],
    conditions: ['relaxing'],
    triggers: [],
  },
  {
    name: 'jukebox',
    cost: 1,
    hoursToComplete: 0,
    meterImpacts: [],
    conditions: [],
    triggers: ['music'],
  },
  {
    name: 'desk',
    cost: 0,
    hoursToComplete: 8,
    meterImpacts: [
      { name: 'energy', amount: -hour * 2 },
      { name: 'money', amount: 80 },
      { name: 'mood', amount: -hour * 2 },
      { name: 'comfort', amount: -hour * 2 },
      { name: 'connection', amount: -hour * 3 },
      { name: 'engagement', amount: -hour * 0.5 },
      { name: 'mind', amount: -hour * 2 },
      { name: 'freedom', amount: -hour * 4 },
    ],
    conditions: ['working'],
    triggers: ['computer'],
  },
  {
    name: 'sink',
    cost: 0,
    hoursToComplete: 0.25,
    meterImpacts: [{ name: 'freedom', amount: -hour * 2 }],
    conditions: ['cleaning'],
    triggers: [],
  },
  {
    name: 'oven',
    cost: 5,
    hoursToComplete: 1,
    meterImpacts: [
      { name: 'hunger', amount: hour * 10 },
      { name: 'mind', amount: hour * 4 },
      { name: 'comfort', amount: hour * 1 },
    ],
    conditions: ['cooking'],
    triggers: [],
  },
  {
    name: 'lamp',
    cost: 3,
    hoursToComplete: 0,
    meterImpacts: [],
    conditions: [],
    triggers: ['light'],
  },
  {
    name: 'fridge',
    cost: 5,
    hoursToComplete: 0.25,
    meterImpacts: [
      { name: 'hunger', amount: hour * 5 },
      {
        name: 'energy',
        amount: hour * 2,
      },
      {
        name: 'mood',
        amount: hour * 1,
      },
      {
        name: 'fitness',
        amount: -hour * 4,
      },
    ],
    conditions: ['snacking'],
    triggers: [],
  },
  {
    name: 'sofa',
    cost: 0,
    hoursToComplete: 2,
    meterImpacts: [
      { name: 'energy', amount: hour * 1 },
      { name: 'fitness', amount: -hour * 3 },
      { name: 'comfort', amount: hour * 3 },
      { name: 'engagement', amount: hour * 4 },
      { name: 'connection', amount: -hour * 3 },
      { name: 'motivation', amount: -hour * 3 },
    ],
    conditions: ['relaxing'],
    triggers: ['tv'],
  },
  {
    name: 'plant',
    cost: 0,
    hoursToComplete: 0.25,
    meterImpacts: [
      { name: 'health', amount: hour * 0.25 },
      { name: 'mind', amount: hour * 1 },
    ],
    conditions: ['watering'],
    triggers: [],
  },
  {
    name: 'table',
    cost: 0,
    hoursToComplete: 4,
    meterImpacts: [
      { name: 'fitness', amount: -hour * 3 },
      { name: 'mood', amount: -hour * 3 },
      { name: 'comfort', amount: -hour * 3 },
      { name: 'connection', amount: -hour * 3 },
      { name: 'engagement', amount: -hour * 3 },
      { name: 'motivation', amount: -hour * 3 },
      { name: 'mind', amount: -hour * 3 },
      { name: 'appetite', amount: -hour * 3 },
    ],
    conditions: ['wallowing'],
    triggers: [],
  },
  {
    name: 'exercise',
    cost: 0,
    hoursToComplete: 1,
    meterImpacts: [
      { name: 'fitness', amount: day * 2 },
      { name: 'appetite', amount: hour * 2 },
      { name: 'energy', amount: -hour * 1 },
      { name: 'health', amount: hour * 1 },
      { name: 'hygeine', amount: -hour * 2 },
      { name: 'comfort', amount: -hour * 2 },
      { name: 'freedom', amount: hour * 3 },
      { name: 'motivation', amount: hour * 4 },
      { name: 'mind', amount: hour * 5 },
    ],
    conditions: [],
    triggers: [],
  },
  {
    name: 'phone',
    cost: 0,
    hoursToComplete: 2,
    meterImpacts: [
      { name: 'mood', amount: hour * 2 },
      { name: 'connection', amount: day * 3 },
      { name: 'money', amount: -10 },
      { name: 'engagement', amount: hour * 2 },
      { name: 'freedom', amount: hour * 6 },
      { name: 'motivation', amount: hour * 2 },
    ],
    conditions: [],
    triggers: [],
  },
  {
    name: 'toilet',
    cost: 0,
    hoursToComplete: 0.5,
    meterImpacts: [
      { name: 'mood', amount: hour * 1 },
      { name: 'hygeine', amount: -hour * 1 },
      { name: 'comfort', amount: hour * 2 },
    ],
    conditions: [],
    triggers: [],
  },
  {
    name: 'bin',
    cost: 0,
    hoursToComplete: 0,
    meterImpacts: [{ name: 'freedom', amount: -hour * 2 }],
    conditions: ['cleaning'],
    triggers: [],
  },
  {
    name: 'idle',
    cost: 0,
    hoursToComplete: 0,
    meterImpacts: [],
    conditions: [],
    triggers: [],
  },
  {
    name: 'cancel',
    cost: 0,
    hoursToComplete: 0,
    meterImpacts: [],
    conditions: [],
    triggers: [],
  },
  {
    name: 'walking',
    cost: 0,
    hoursToComplete: 0,
    meterImpacts: [],
    conditions: [],
    triggers: [],
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
        triggers: entity.triggers,
      };
    });
  }
}

export const entities = new Entities(entitiesData);
