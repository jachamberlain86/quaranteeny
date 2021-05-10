import { MeterChange } from './meterChange.interface';

export interface Entity {
  readonly timeToComplete: number;
  readonly cost: number;
  readonly meterImpacts: MeterChange[];
  readonly conditions: string[];
}
