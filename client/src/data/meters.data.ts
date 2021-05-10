import { Meter } from '../interfaces/meter.interface';
import { Need } from '../interfaces/need.interface';

const calcDeficit = (safe: number): number => Math.ceil(safe * 0.5);
const calcExcess = (safe: number): number => safe + Math.ceil(safe * 0.5);
const calcMax = (safe: number): number => safe + Math.ceil(safe * 0.5) * 2;

const needs: Need[] = [
  {
    name: 'hunger',
    decayRate: -10,
    safeSize: 1000,
    deficitImpacts: ['starving'],
    excessImpacts: ['overfed'],
  },
  {
    name: 'energy',
    decayRate: -10,
    safeSize: 2000,
    deficitImpacts: ['lethargic'],
    excessImpacts: ['exhausted'],
  },
  {
    name: 'health',
    decayRate: -1,
    safeSize: 500,
    deficitImpacts: ['unwell'],
    excessImpacts: ['energised'],
  },
  {
    name: 'money',
    decayRate: 0,
    safeSize: 1000,
    deficitImpacts: ['broke'],
    excessImpacts: ['rich'],
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
      };
    });
  }
}

export const meters = new Meters(needs);
