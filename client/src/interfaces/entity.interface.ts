import { MeterChange } from './meterChange.interface';

export interface Entity {
  timeToComplete: number;
  meterImpacts: MeterChange[];
}
