import { store } from '../app/store';
import { selectGameSpeed } from '../features/game/gameSlice';

const baseTime = 60000;

const gameSpeed = selectGameSpeed(store.getState());

export const gameMinute = baseTime / gameSpeed;
export const gameHour = gameMinute * 60;
export const gameDay = gameHour * 24;
