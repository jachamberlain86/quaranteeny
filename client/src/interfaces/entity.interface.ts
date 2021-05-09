import { MeterChange } from './meterChange.interface';

export interface Entity {
  readonly timeToComplete: number;
  readonly meterImpacts: MeterChange[];
}
