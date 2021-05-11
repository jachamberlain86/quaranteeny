import { MeterState } from '../interfaces/meterState.interface';
import { Need } from '../interfaces/need.interface';
import { needs, meters, Meters } from './meters.data';

export class MetersStateBuilder {
  [key: string]: MeterState;

  constructor(needsArr: Need[], metersObj: Meters) {
    needsArr.forEach((need: Need) => {
      this[need.name] = {
        value: metersObj[need.name].initialValue,
        incRate: 100,
        decRate: 100,
      };
    });
  }
}

export const metersStateBuilder = new MetersStateBuilder(needs, meters);
