import { placeAt } from '../features/character/characterSlice';
import { store } from '../app/store';

export function triggerPlaceAt(x: number, y: number, direction: string): void {
  store.dispatch(placeAt({ coordinates: [x, y], direction }));
}
