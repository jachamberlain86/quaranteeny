/* eslint-disable no-sparse-arrays */
/* eslint-disable prettier/prettier */
import { GameMap } from '../interfaces/gameMap.interface';
import { roomMap } from './roomMap.data'

const game: GameMap = {
  cols: 20,
  layers: [roomMap],
  tileSize: 32,
};

export default game;
