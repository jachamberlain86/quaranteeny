import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'simple-json', nullable: true })
  game: {
    gameSpeed: number;
    currClockTimeInGame: number;
    currClockTimeReal: number;
    startTime: number;
    gameOver: boolean;
    starvationCounter: number;
    sleepDepCounter: number;
    sickCounter: number;
  };

  @Column({ type: 'simple-json', nullable: true })
  user: {
    userName: string;
    scores: number[];
  };

  @Column({ type: 'simple-json', nullable: true })
  sprite: {
    currentInteraction: string;
    interactionProgress: number | null;
    conditions: string[];
  };

  @Column({ type: 'simple-json', nullable: true })
  meters: {
    hunger: { value: number; incRate: number; decRate: number };
    energy: { value: number; incRate: number; decRate: number };
    health: { value: number; incRate: number; decRate: number };
    money: { value: number; incRate: number; decRate: number };
    mood: { value: number; incRate: number; decRate: number };
    fitness: { value: number; incRate: number; decRate: number };
    hygeine: { value: number; incRate: number; decRate: number };
    comfort: { value: number; incRate: number; decRate: number };
    connection: { value: number; incRate: number; decRate: number };
    engagement: { value: number; incRate: number; decRate: number };
    freedom: { value: number; incRate: number; decRate: number };
    motivation: { value: number; incRate: number; decRate: number };
    appetite: { value: number; incRate: number; decRate: number };
    mind: { value: number; incRate: number; decRate: number };
  };
}
