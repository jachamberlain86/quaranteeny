import React from 'react';
import { Image } from 'react-konva';
import Konva from 'konva';
import { store } from '../app/store';
import {
  updateClockTime,
  updateClockWhenFastForwarding,
  selectGameOver,
  selectGameSpeed,
  selectStartTime,
  selectClockTimeReal,
  setStartTime,
  changeGameSpeed,
  userReturnedAfterGap,
  finishedCatchingUpToPresent,
  resetGameState,
} from '../features/game/gameSlice';
import { second, minute } from '../data/time.data';
import game from '../data/gameMap.data';
import { resetMeters } from '../features/meters/metersSlice';
import { resetSprite } from '../features/sprite/spriteSlice';
import { resetCharacter } from '../features/character/characterSlice';
import { imageDirectory, ImageDirectory } from '../assets/images/index';
import { handleInteraction, setCurrentInteraction } from './sprite.helper';

const fastForwardGameSpeed = 10_000;

export const startClock = (): void => {
  const startTime = selectStartTime(store.getState());
  // Set startTime to now if it's not already set. Otherwise leave it as is
  // since game is in progress.
  if (startTime === 0) {
    store.dispatch(setStartTime(Date.now()));
  } else {
    store.dispatch(userReturnedAfterGap());
  }
  const gameSpeedOriginal = selectGameSpeed(store.getState());
  const clockIntervalId: NodeJS.Timeout = setInterval(() => {
    const gameOver = selectGameOver(store.getState());
    if (gameOver) clearInterval(clockIntervalId);
    else {
      // Check how long it's been since the player last closed the game
      const lastRecordedClockTime = selectClockTimeReal(store.getState());
      const timeSinceClosedGame = Date.now() - lastRecordedClockTime;

      if (timeSinceClosedGame > minute) {
        // Speed up game speed to fast forward until we reach present
        store.dispatch(changeGameSpeed(fastForwardGameSpeed));
        store.dispatch(
          updateClockWhenFastForwarding({
            timeNow: Date.now(),
            gameSpeedOriginal,
          })
        );
      } else {
        store.dispatch(finishedCatchingUpToPresent());
        store.dispatch(changeGameSpeed(gameSpeedOriginal));
        store.dispatch(
          updateClockTime({
            timeNow: Date.now(),
          })
        );
      }
    }
  }, second);
};

export const resetGamePlay = (): void => {
  store.dispatch(resetGameState());
  store.dispatch(resetMeters());
  store.dispatch(resetSprite());
  store.dispatch(resetCharacter());
};

export function calcPercentage(current: number, total: number): number {
  const percentage = current / total;
  return Math.round(percentage * 100);
}

export function handleClickSprite(
  event: Konva.KonvaEventObject<MouseEvent>
): void {
  console.log('That tickles!');
  console.log(event);
}

export function handleClickTile(
  event: Konva.KonvaEventObject<MouseEvent>
): void {
  console.log(event);
  const clickedEntity = game.layers[1][event.target.index].int;
  const clickPosX = event.target.attrs.x;
  const clickPosY = event.target.attrs.y;
  if (clickedEntity !== null) {
    console.log(`clicked the ${clickedEntity}`);
    if (setCurrentInteraction(clickedEntity)) {
      handleInteraction(clickedEntity);
    }
  } else {
    setCurrentInteraction(null);
    console.log(`clicked ${clickPosX}, ${clickPosY}`);
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
