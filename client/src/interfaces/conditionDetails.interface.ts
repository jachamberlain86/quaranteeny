import { Condition } from './condition.interface';

export interface ConditionDetails extends Condition {
  readonly name: string;
}
