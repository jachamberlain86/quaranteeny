import { store } from '../app/store';
import {
  selectClockTime,
  selectGameSpeed,
  updateClockTime,
} from '../features/game/gameSlice';

export const startClock = (): void => {
  const prevClockTime = selectClockTime(store.getState());
  const gameSpeed = selectGameSpeed(store.getState());
  setInterval(() => {
    store.dispatch(updateClockTime({ gameSpeed, prevClockTime }));
  }, 1000);
};
