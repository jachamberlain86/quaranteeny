import { store } from '../app/store';
import { changeByAmount, MetersState } from '../features/meters/metersSlice';
import { MeterChange } from '../interfaces/meterChange.interface';
import { gameMinute } from '../data/time.data';

export const decayNeedsMeter = (change: MeterChange): void => {
  const { name } = change;
  const timer = setInterval(() => {
    const appStore = store.getState();
    const { meters } = appStore;
    const currentValue = meters[name as keyof MetersState].value;
    if (currentValue > 0) {
      store.dispatch(changeByAmount(change));
    }
    if (currentValue <= 0) {
      clearInterval(timer);
    }
  }, gameMinute * 5);
};
