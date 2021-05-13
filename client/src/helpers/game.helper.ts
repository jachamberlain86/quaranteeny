import { store } from '../app/store';
import {
  updateClockTime,
  selectGameOver,
  selectStartTime,
  setStartTime,
} from '../features/game/gameSlice';
import { second } from '../data/time.data';

export const startClock = (): void => {
  const startTime = selectStartTime(store.getState());
  // Set startTime to now if it's not already set. Otherwise leave it as is
  // since game is in progress.
  if (startTime === 0) {
    store.dispatch(setStartTime(Date.now()));
  }
  const clockIntervalId: NodeJS.Timeout = setInterval(() => {
    const gameOver = selectGameOver(store.getState());
    if (gameOver) clearInterval(clockIntervalId);
    else {
      store.dispatch(
        updateClockTime({
          currTimeReal: Date.now(),
        })
      );
    }
  }, second);
};

export function calcPercentage(current: number, total: number): number {
  const percentage = current / total;
  return Math.round(percentage * 100);
}
