import { store } from '../app/store';

const baseTime = 60000;

const appStore = store.getState();
const { gameSpeed } = appStore.game;

export const gameMinute = baseTime / gameSpeed;
export const gameHour = gameMinute * 60;
export const gameDay = gameHour * 24;
