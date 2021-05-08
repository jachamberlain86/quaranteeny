import { MeterChange } from './meterChange.interface';

export interface Element {
  timeToComplete: number;
  meterImpacts: MeterChange[];
}
