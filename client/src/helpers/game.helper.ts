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
