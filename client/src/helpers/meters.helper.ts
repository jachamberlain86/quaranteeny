import { store } from '../app/store';
import {
  changeByAmount,
  NeedsMetersState,
} from '../features/needsMeters/needsMetersSlice';
import { MeterChange } from '../interfaces/meterChange.interface';
import { gameMinute } from '../data/time.data';

export const decayNeedsMeter = (change: MeterChange): void => {
  const { name } = change;
  const timer = setInterval(() => {
    const appStore = store.getState();
    const { needsMeters } = appStore;
    const currentValue = needsMeters[name as keyof NeedsMetersState];
    if (currentValue > 0) {
      store.dispatch(changeByAmount(change));
    }
    if (currentValue <= 0) {
      clearInterval(timer);
    }
  }, gameMinute * 5);
};
