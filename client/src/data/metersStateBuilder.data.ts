import { MeterState } from '../interfaces/meterState.interface';
import { Need } from '../interfaces/need.interface';
import { needs, meters, Meters } from './meters.data';

// Uses the meters object generated in meters.data.ts to generate an object used by metersSlice to set initial values for all meters on starting a new game

export class MetersStateBuilder {
  [key: string]: MeterState;

  constructor(needsArr: Need[], metersObj: Meters) {
    needsArr.forEach((need: Need) => {
      this[need.name] = {
        value: metersObj[need.name].initialValue,
        incRate: 100,
        decRate: 100,
        pauseDecay: false,
      };
    });
  }
}

export const metersStateBuilder = new MetersStateBuilder(needs, meters);
