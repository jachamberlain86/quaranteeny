import { NeedsMeter } from '../interfaces/needsMeter.interface';
import { Need } from '../interfaces/need.interface';

const calcDeficit = (safe: number): number => Math.ceil(safe * 0.5);
const calcExcess = (safe: number): number => safe + Math.ceil(safe * 0.5);
const calcMax = (safe: number): number => safe + Math.ceil(safe * 0.5) * 2;

export const needs: Need[] = [
  {
    name: 'hunger',
    decayRate: -10,
    safeSize: 1000,
  },
  {
    name: 'energy',
    decayRate: -10,
    safeSize: 2000,
  },
  {
    name: 'health',
    decayRate: -1,
    safeSize: 500,
  },
  {
    name: 'money',
    decayRate: 0,
    safeSize: 1000,
  },
];

class NeedsMeters {
  [key: string]: NeedsMeter;

  constructor(needsArr: Need[]) {
    needsArr.forEach((need: Need) => {
      this[need.name] = {
        decayRate: need.decayRate,
        safeSize: need.safeSize,
        deficitPoint: calcDeficit(need.safeSize),
        excessPoint: calcExcess(need.safeSize),
        max: calcMax(need.safeSize),
      };
    });
  }
}

export const needsMeters = new NeedsMeters(needs);
