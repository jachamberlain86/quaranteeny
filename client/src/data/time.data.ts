import { store } from '../app/store';

const baseTime = 1000;

const appStore = store.getState();
const { gameSpeed } = appStore.time;

export const gameMinute = baseTime / gameSpeed;
export const gameHour = gameMinute * 60;
export const gameDay = gameHour * 24;
