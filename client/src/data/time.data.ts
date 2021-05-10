import { store } from '../app/store';
import { selectGameSpeed } from '../features/game/gameSlice';

const gameSpeed = selectGameSpeed(store.getState());

export const minute = 60000;
export const hour = minute * 60;
export const day = hour * 24;

export const gameMinute = minute / gameSpeed;
export const gameHour = hour / gameSpeed;
export const gameDay = day / gameSpeed;
