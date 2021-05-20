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
    Math.random() * (calcExcess(safe) - calcDeficit(safe)) + calcDeficit(safe)
  );

export const needs: Need[] = [
  {
    name: 'hunger',
    decayRate: -minute,
    pauseDecay: false,
    safeSize: hour * 12,
    deficitImpacts: ['hungry'],
    excessImpacts: ['overfed'],
  },
  {
    name: 'energy',
    decayRate: -minute,
    pauseDecay: false,
    safeSize: day,
    deficitImpacts: ['exhausted'],
    excessImpacts: ['lethargic'],
  },
  {
    name: 'health',
    decayRate: -minute,
    pauseDecay: true,
    safeSize: day,
    deficitImpacts: ['unwell'],
    excessImpacts: ['hardy'],
  },
  {
    name: 'money',
    decayRate: -1,
    pauseDecay: true,
    safeSize: 1000,
    deficitImpacts: ['broke'],
    excessImpacts: ['rich'],
  },
  {
    name: 'fitness',
    decayRate: -minute,
    pauseDecay: false,
    safeSize: day * 7,
    deficitImpacts: ['unfit'],
    excessImpacts: ['injured'],
  },
  {
    name: 'mood',
    decayRate: -minute,
    pauseDecay: true,
    safeSize: hour * 6,
    deficitImpacts: ['depressed'],
    excessImpacts: ['ecstatic'],
  },
  {
    name: 'hygeine',
    decayRate: -minute,
    pauseDecay: false,
    safeSize: day,
    deficitImpacts: ['filthy'],
    excessImpacts: ['anal'],
  },
  {
    name: 'comfort',
    decayRate: -minute,
    pauseDecay: true,
    safeSize: hour * 6,
    deficitImpacts: ['achey'],
    excessImpacts: ['cosy'],
  },
  {
    name: 'connection',
    decayRate: -minute,
    pauseDecay: false,
    safeSize: day * 7,
    deficitImpacts: ['lonely'],
    excessImpacts: ['dependent'],
  },
  {
    name: 'engagement',
    decayRate: -minute,
    pauseDecay: false,
    safeSize: hour * 12,
    deficitImpacts: ['bored'],
    excessImpacts: ['overstimulated'],
  },
  {
    name: 'freedom',
    decayRate: -minute,
    pauseDecay: false,
    safeSize: day * 7,
    deficitImpacts: ['trapped'],
    excessImpacts: ['wild'],
  },
  {
    name: 'motivation',
    decayRate: -minute,
    pauseDecay: true,
    safeSize: day * 7,
    deficitImpacts: ['apathetic'],
    excessImpacts: ['ambitious'],
  },
  {
    name: 'appetite',
    decayRate: -minute,
    pauseDecay: true,
    safeSize: day,
    deficitImpacts: ['nauseous'],
    excessImpacts: ['greedy'],
  },
  {
    name: 'mind',
    decayRate: -minute,
    pauseDecay: true,
    safeSize: day * 7,
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
        pauseDecay: need.pauseDecay,
      };
    });
  }
}

export const meters = new Meters(needs);
