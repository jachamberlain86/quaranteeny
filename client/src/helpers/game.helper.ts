import { store } from '../app/store';
import {
  selectClockTime,
  selectGameSpeed,
  updateClockTime,
} from '../features/game/gameSlice';
import { second } from '../data/time.data';

export const startClock = (): void => {
  const prevClockTime = selectClockTime(store.getState());
  const gameSpeed = selectGameSpeed(store.getState());
  setInterval(() => {
    store.dispatch(updateClockTime({ gameSpeed, prevClockTime }));
  }, second);
};

export function calcPercentage(current: number, total: number): number {
  const percentage = current / total;
  return Math.round(percentage * 100);
}
