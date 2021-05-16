/* eslint-disable no-sparse-arrays */
/* eslint-disable prettier/prettier */
import { GameMap } from '../interfaces/gameMap.interface';
import { floorMap } from './floorsWallsMap.data';
import { furniturerMap } from './furnitureMap.data';
import { topLayerMap } from './topLayerMap.data';

const game: GameMap = {
  cols: 20,
  layers: [floorMap, furniturerMap, topLayerMap],
  tileSize: 40,
};

export default game;
