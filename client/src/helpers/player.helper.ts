import { setTimeMoved } from '../features/character/characterSlice';
import { store } from '../app/store';

export function triggerSetTimeMoved(currFrameTime: number): void {
  store.dispatch(setTimeMoved(currFrameTime));
}
