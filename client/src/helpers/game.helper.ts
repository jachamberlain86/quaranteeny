import { store } from '../app/store';
import { updateClockTime } from '../features/game/gameSlice';
import { second } from '../data/time.data';

export const startClock = (): void => {
  setInterval(() => {
    store.dispatch(
      updateClockTime({
        currTimeReal: Date.now(),
      })
    );
  }, second);
};
