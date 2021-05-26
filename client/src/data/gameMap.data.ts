/* eslint-disable no-sparse-arrays */
/* eslint-disable prettier/prettier */
import { GameMap } from '../interfaces/gameMap.interface';
import { roomMap } from './roomMap.data';

// TODO connect tileSize to change dynamically based on window size

const height = window.innerHeight;
const boardMax = height * 0.8;
const tileMax = boardMax / 20;

const game: GameMap = {
  cols: 20,
  layers: [roomMap],
  tileSize: tileMax,
};

export default game;
