import { processMovement, move } from '../features/character/characterSlice';
import { store } from '../app/store';

export function triggerProcessMovement(t: number): void {
  store.dispatch(processMovement({ time: t }));
}
export function triggerMove(direction: string): void {
  store.dispatch(move(direction));
}
