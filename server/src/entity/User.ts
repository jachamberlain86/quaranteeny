import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  hunger: number;

  @Column()
  energy: number;

  @Column()
  health: number;

  @Column()
  money: number;
}
