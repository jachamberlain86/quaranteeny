import { Meter } from '../interfaces/meter.interface';
import { Need } from '../interfaces/need.interface';
import { minute, hour, day } from './time.data';

const calcDeficit = (safe: number): number => Math.ceil(safe * 0.5);
const calcExcess = (safe: number): number => safe + Math.ceil(safe * 0.5);
const calcMax = (safe: number): number => safe + Math.ceil(safe * 0.5) * 2;
const calcInitialValue = (safe: number): number =>
  Math.floor(Math.random() * (safe * 2));

const needs: Need[] = [
  {
    name: 'hunger',
    decayRate: -minute,
    safeSize: hour * 8,
    deficitImpacts: ['starving'],
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
    deficitImpacts: ['anorexic'],
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
        initialIncRate: 100,
        initialDecRate: 100,
      };
    });
  }
}

export const meters = new Meters(needs);
