import { store } from '../app/store';
import {
  updateClockTime,
  setClockIntervalId,
} from '../features/game/gameSlice';
import { second } from '../data/time.data';

export const startClock = (): void => {
  // TODO: Set startTime to now
  const clockIntervalId: NodeJS.Timeout | null = setInterval(() => {
    store.dispatch(
      updateClockTime({
        currTimeReal: Date.now(),
      })
    );
  }, second);
  store.dispatch(setClockIntervalId(clockIntervalId));
};

export const stopClock = (clockIntervalId: NodeJS.Timeout | null): void => {
  if (clockIntervalId !== null) {
    clearInterval(clockIntervalId);
    store.dispatch(setClockIntervalId(null));
  }
};

export function calcPercentage(current: number, total: number): number {
  const percentage = current / total;
  return Math.round(percentage * 100);
}
