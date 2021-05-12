import { processMovement } from '../features/character/characterSlice';
import { store } from '../app/store';

export function triggerProcessMovement(x: number, y: number, t: number): void {
  store.dispatch(processMovement({ coordinates: [x, y], time: t }));
}
