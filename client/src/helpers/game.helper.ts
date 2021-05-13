import { store } from '../app/store';
import {
  updateClockTime,
  selectGameOver,
  selectStartTime,
  setStartTime,
  resetGameState,
} from '../features/game/gameSlice';
import { resetMeters } from '../features/meters/metersSlice';
import { resetSprite } from '../features/sprite/spriteSlice';
import { resetCharacter } from '../features/character/characterSlice';
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

export const resetGamePlay = (): void => {
  store.dispatch(resetGameState());
  store.dispatch(resetMeters());
  store.dispatch(resetSprite());
  store.dispatch(resetCharacter());
};
