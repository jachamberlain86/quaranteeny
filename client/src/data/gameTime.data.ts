import { store } from '../app/store';
import { selectGameSpeed } from '../features/game/gameSlice';
import { minute, hour, day } from './time.data';

const gameSpeed = selectGameSpeed(store.getState());

export const gameMinute = minute / gameSpeed;
export const gameHour = hour / gameSpeed;
export const gameDay = day / gameSpeed;
