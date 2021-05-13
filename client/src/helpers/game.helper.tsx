import React from 'react';
import { Image } from 'react-konva';
import Konva from 'konva';
import { store } from '../app/store';
import {
  updateClockTime,
  setClockIntervalId,
} from '../features/game/gameSlice';
import { second } from '../data/time.data';
import game from '../data/gameMap.data';
import { imageDirectory, ImageDirectory } from '../assets/library/index';
import { selectCurPos } from '../features/character/characterSlice';
import { checkIndex } from './input.helper';

export const startClock = (): void => {
  // TODO: Set startTime to now
  const clockIntervalId: NodeJS.Timeout | null = setInterval(() => {
    store.dispatch(
      updateClockTime({
        currTimeReal: Date.now(),
      })
    );
  }, second);
  store.dispatch(setClockIntervalId(clockIntervalId));
};

export const stopClock = (clockIntervalId: NodeJS.Timeout | null): void => {
  if (clockIntervalId !== null) {
    clearInterval(clockIntervalId);
    store.dispatch(setClockIntervalId(null));
  }
};

export function calcPercentage(current: number, total: number): number {
  const percentage = current / total;
  return Math.round(percentage * 100);
}

export function handleClickTile(
  event: Konva.KonvaEventObject<MouseEvent>
): void {
  const curPos = selectCurPos(store.getState());
  const curIdx = checkIndex(curPos[0], curPos[1]);
  if (curIdx === event.target.index) {
    console.log('clicked the sprite');
  } else if (game.layers[1][event.target.index].int) {
    console.log(`clicked the ${game.layers[1][event.target.index].int}`);
  } else {
    console.log('clicked something not interactive');
  }
}

export function renderLayer(layer: number): JSX.Element[] {
  const { cols, layers, tileSize } = game;

  const layerArr: JSX.Element[] = [];
  for (let yAxis = 0; yAxis < cols; yAxis += 1) {
    for (let xAxis = 0; xAxis < cols; xAxis += 1) {
      const tileKey = layers[layer][yAxis * cols + xAxis].key;
      const img = new window.Image();
      img.src = imageDirectory[tileKey as keyof ImageDirectory];
      img.crossOrigin = 'Anonymous';
      if (layer === 1) {
        layerArr.push(
          <Image
            x={xAxis * tileSize}
            y={yAxis * tileSize}
            key={`${xAxis}, ${yAxis}`}
            image={img}
            height={tileSize}
            width={tileSize}
            onClick={handleClickTile}
          />
        );
      } else {
        layerArr.push(
          <Image
            x={xAxis * tileSize}
            y={yAxis * tileSize}
            key={`${xAxis}, ${yAxis}`}
            image={img}
            height={tileSize}
            width={tileSize}
          />
        );
      }
    }
  }
  return layerArr;
}
