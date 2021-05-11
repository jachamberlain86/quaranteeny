import { Meter } from '../interfaces/meter.interface';
import { Need } from '../interfaces/need.interface';
import { minute, hour, day, decayFreq } from './time.data';

const calcDeficit = (safe: number): number => Math.ceil(safe * 0.5);
const calcExcess = (safe: number): number => safe + calcDeficit(safe);
const calcMax = (safe: number): number =>
  safe + calcDeficit(safe) + calcExcess(safe);
const calcInitialValue = (safe: number): number =>
  Math.round(
    Math.random() * (calcMax(safe) - calcDeficit(safe) + 1) +
      calcDeficit(safe) * 1.5
  );

export const needs: Need[] = [
  {
    name: 'hunger',
    decayRate: -minute * decayFreq,
    safeSize: hour * 8,
    deficitImpacts: ['starving'],
    excessImpacts: ['overfed'],
  },
  {
    name: 'energy',
    decayRate: -minute * decayFreq,
    safeSize: hour * 16,
    deficitImpacts: ['exhausted'],
    excessImpacts: ['lethargic'],
  },
  {
    name: 'health',
    decayRate: -minute * decayFreq,
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
    decayRate: -minute * decayFreq,
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
    decayRate: -minute * decayFreq,
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
    decayRate: -minute * decayFreq,
    safeSize: day * 7,
    deficitImpacts: ['lonely'],
    excessImpacts: ['dependent'],
  },
  {
    name: 'engagement',
    decayRate: -minute * decayFreq,
    safeSize: hour * 6,
    deficitImpacts: ['bored'],
    excessImpacts: ['hooked'],
  },
  {
    name: 'freedom',
    decayRate: -minute * decayFreq,
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
    deficitImpacts: ['food averse'],
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
