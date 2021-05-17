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
  setTimeLasted,
  selectClockTimeInGame,
  selectTimeLasted,
} from '../features/game/gameSlice';
<<<<<<< HEAD
import { second, day } from '../data/time.data';
=======
import { second, minute } from '../data/time.data';
>>>>>>> 7a2f29eab0512455ab93c87da9a3578cf12266c1
import game from '../data/gameMap.data';
import { resetMeters } from '../features/meters/metersSlice';
import { resetSprite } from '../features/sprite/spriteSlice';
import {
  resetCharacter,
  selectCurPos,
} from '../features/character/characterSlice';
import { imageDirectory, ImageDirectory } from '../assets/images/index';
import { handleInteraction, setCurrentInteraction } from './sprite.helper';
import { checkIndex } from './input.helper';
import { houseInteractablesObj } from '../audioControllers/houseObjectsSounds';

const fastForwardGameSpeed = 10_000;

export const startClock = (): void => {
  const startTime = selectStartTime(store.getState());
  // Set startTime to now if it's not already set. Otherwise leave it as is
  // since game is in progress.
  if (startTime === 0) {
    store.dispatch(setStartTime(Date.now()));
    store.dispatch(setTimeLasted(0));
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

// export function handleClickSprite(
//   event: Konva.KonvaEventObject<MouseEvent>
// ): void {
//   console.log('That tickles!');
//   console.log(event);
// }

export function handleClickTile(
  event: Konva.KonvaEventObject<MouseEvent>
): void {
  console.log(event);
  const clickedIdx = event.target.index;
  const clickedEntity = game.layers[1][clickedIdx].int;
  const clickPosX = event.target.attrs.x;
  const clickPosY = event.target.attrs.y;
  const curPos = selectCurPos(store.getState());
  const curIdxLegs = checkIndex(curPos[0], curPos[1]);
  const curIdxHead = checkIndex(curPos[0], curPos[1] - 1);
  if (curIdxLegs === clickedIdx || curIdxHead === clickedIdx) {
    console.log('That tickles!');
  } else if (clickedEntity !== null) {
    console.log(`clicked the ${clickedEntity}`);
    // TODO move sound logic to sprite collision logic when in place.
    // sound file logic
    // might be more useful in spriteHelper line: 66
    const houseSoundsArray = Object.entries(houseInteractablesObj);
    for (let i = 0; i < houseSoundsArray.length; i += 1) {
      const soundFile = houseSoundsArray[i];
      if (soundFile[0].includes(clickedEntity)) {
        soundFile[1].play();
      }
    }
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

  // const imageObj = new window.Image();
  // imageObj.onload = () => {

  const layerArr: JSX.Element[] = [];
  for (let yAxis = 0; yAxis < cols; yAxis += 1) {
    for (let xAxis = 0; xAxis < cols; xAxis += 1) {
      const img = new window.Image();
      img.crossOrigin = 'Anonymous';
      const tileKey = layers[layer][yAxis * cols + xAxis].key;
      let tile: null | JSX.Element = null;
      img.onload = () => {
        if (layer === 2) {
          tile = (
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
          tile = (
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
        layerArr.push(tile);
      };
      img.src = imageDirectory[tileKey];
    }
  }
  // };

  return layerArr;
}
