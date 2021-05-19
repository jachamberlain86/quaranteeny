import { MeterChange } from './meterChange.interface';

export interface Entity {
  readonly hoursToComplete: number;
  readonly cost: number;
  readonly meterImpacts: MeterChange[];
  readonly conditions: string[];
  readonly triggers: string[];
}
