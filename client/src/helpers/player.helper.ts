import {
  processMovement,
  move,
  setTimeMoved,
} from '../features/character/characterSlice';
import { store } from '../app/store';

export function triggerProcessMovement(t: number): void {
  store.dispatch(processMovement({ time: t }));
}
export function triggerMove(direction: string): void {
  console.log('this called');

  store.dispatch(move(direction));
}

export function triggerSetTimeMoved(currFrameTime: number): void {
  store.dispatch(setTimeMoved(currFrameTime));
}
