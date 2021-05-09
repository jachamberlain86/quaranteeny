import { Entity } from './entity.interface';

export interface EntityDetails extends Entity {
  readonly name: string;
}
