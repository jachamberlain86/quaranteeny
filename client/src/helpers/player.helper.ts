import {
  processMovement,
  setTimeMoved,
} from '../features/character/characterSlice';
import { store } from '../app/store';

export function triggerProcessMovement(t: number): void {
  store.dispatch(processMovement({ time: t }));
}

export function triggerSetTimeMoved(currFrameTime: number): void {
  store.dispatch(setTimeMoved(currFrameTime));
}
