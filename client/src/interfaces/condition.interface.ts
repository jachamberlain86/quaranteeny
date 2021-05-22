import { MeterModifier } from './meterModifier.interface';

export interface Condition {
  readonly modifiers: MeterModifier[];
  readonly triggers: string[];
}
