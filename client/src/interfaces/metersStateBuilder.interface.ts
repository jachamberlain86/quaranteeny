import { MeterState } from './meterState.interface';

export interface MetersStateBuilder {
  hunger: MeterState;
  energy: MeterState;
  health: MeterState;
  money: MeterState;
  fitness: MeterState;
  mood: MeterState;
  hygeine: MeterState;
  comfort: MeterState;
  connection: MeterState;
  engagement: MeterState;
  freedom: MeterState;
  motivation: MeterState;
  appetite: MeterState;
  mind: MeterState;
}
