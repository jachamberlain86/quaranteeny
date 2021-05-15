import { Meter } from '../interfaces/meter.interface';
import { Need } from '../interfaces/need.interface';
import { minute, hour, day } from './time.data';

// A reference for unchanging game data in relation to status meters. Generates a meters object based off hard coded meter names, a rate of decay, the size of the meter's safe zone, and arrays containing strings of conditions activated should the player allow meters to fall outside of that safe zone.

// Hunger, Energy, Health, and Money are all visiable to the player through the interface. All remaining meters are hidden. Only the results of their statuses are seen by the player.

// Meter decay rate is set using fixed time variables. This impacts the value by which the meter decays not the frequency.

// Safe size values determine the overall size of a meter. Appropriate deficit and excess zones are calculate automatically. Fixed time variables from time.data.ts are used to set meter sizes to make calculations easier. Setting a meter's safe size to hour * 8 will mean that meter's safe zone will take 8 game hours to deplete if full.

// The Meters class also generates a max value for each meter and a randomised initial value for that meter on starting a new game

const calcDeficit = (safe: number): number => Math.ceil(safe / 2);
const calcExcess = (safe: number): number => safe + calcDeficit(safe);
const calcMax = (safe: number): number => calcDeficit(safe) + calcExcess(safe);
const calcInitialValue = (safe: number): number =>
  Math.round(
    Math.random() * (calcExcess(safe) - calcDeficit(safe) + 1) +
      calcDeficit(safe)
  );

export const needs: Need[] = [
  {
    name: 'hunger',
    decayRate: -minute,
    safeSize: hour * 8,
    deficitImpacts: ['hungry'],
    excessImpacts: ['overfed'],
  },
  {
    name: 'energy',
    decayRate: -minute,
    safeSize: hour * 16,
    deficitImpacts: ['exhausted'],
    excessImpacts: ['lethargic'],
  },
  {
    name: 'health',
    decayRate: -minute,
    safeSize: day * 14,
    deficitImpacts: ['unwell'],
    excessImpacts: ['hardy'],
  },
  {
    name: 'money',
    decayRate: 0,
    safeSize: 1000,
    deficitImpacts: ['broke'],
    excessImpacts: ['rich'],
  },
  {
    name: 'fitness',
    decayRate: -minute,
    safeSize: day * 7,
    deficitImpacts: ['unfit'],
    excessImpacts: ['injured'],
  },
  {
    name: 'mood',
    decayRate: 0,
    safeSize: day * 3,
    deficitImpacts: ['depressed'],
    excessImpacts: ['ecstatic'],
  },
  {
    name: 'hygeine',
    decayRate: -minute,
    safeSize: day * 4,
    deficitImpacts: ['filthy'],
    excessImpacts: ['anal'],
  },
  {
    name: 'comfort',
    decayRate: 0,
    safeSize: hour * 4,
    deficitImpacts: ['hurt'],
    excessImpacts: ['cosy'],
  },
  {
    name: 'connection',
    decayRate: -minute,
    safeSize: day * 7,
    deficitImpacts: ['lonely'],
    excessImpacts: ['dependent'],
  },
  {
    name: 'engagement',
    decayRate: -minute,
    safeSize: hour * 6,
    deficitImpacts: ['bored'],
    excessImpacts: ['hooked'],
  },
  {
    name: 'freedom',
    decayRate: -minute,
    safeSize: day * 14,
    deficitImpacts: ['trapped'],
    excessImpacts: ['wild'],
  },
  {
    name: 'motivation',
    decayRate: 0,
    safeSize: day * 10,
    deficitImpacts: ['apathetic'],
    excessImpacts: ['ambitious'],
  },
  {
    name: 'appetite',
    decayRate: 0,
    safeSize: day,
    deficitImpacts: ['nauseous'],
    excessImpacts: ['greedy'],
  },
  {
    name: 'mind',
    decayRate: 0,
    safeSize: day * 14,
    deficitImpacts: ['unstable'],
    excessImpacts: ['enlightened'],
  },
];

export class Meters {
  [key: string]: Meter;

  constructor(needsArr: Need[]) {
    needsArr.forEach((need: Need) => {
      this[need.name] = {
        decayRate: need.decayRate,
        safeSize: need.safeSize,
        deficitPoint: calcDeficit(need.safeSize),
        deficitImpacts: need.deficitImpacts,
        excessPoint: calcExcess(need.safeSize),
        excessImpacts: need.excessImpacts,
        max: calcMax(need.safeSize),
        initialValue: calcInitialValue(need.safeSize),
      };
    });
  }
}

export const meters = new Meters(needs);
