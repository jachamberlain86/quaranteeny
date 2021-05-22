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
import {
  resetSprite,
  selectCurrentInteraction,
} from '../features/sprite/spriteSlice';
import {
  resetCharacter,
  selectCurPos,
  selectMovingSelf,
} from '../features/character/characterSlice';
import {
  checkNewInteraction,
  spriteMoveSelf,
  spriteMoveSelfThenInteract,
} from './sprite.helper';
import { checkIndex, cancelCurrentInteraction } from './input.helper';
import { roomMap } from '../data/roomMap.data';

const fastForwardGameSpeed = 10_000;

export const startClock = (): NodeJS.Timeout => {
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
  return clockIntervalId;
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

/* checks whether sprite is currently interacting and if so cancels it.
If sprite is walking, the click is ignored. For interactable tiles,
activates move and interact logic. For walkable tiles, activates move logic. */

export function handleClickTile(
  event: Konva.KonvaEventObject<MouseEvent>
): void {
  const currentInteraction = selectCurrentInteraction(store.getState());
  const clickedIdx = event.target.index;
  const clickedEntity = roomMap[clickedIdx].int;
  const clickPosX = event.target.attrs.x;
  const clickPosY = event.target.attrs.y;
  const curPos = selectCurPos(store.getState());
  const curIdxLegs = checkIndex(curPos.x, curPos.y);
  const curIdxHead = checkIndex(curPos.x, curPos.y - 1);
  const { tileSize } = game;
  const isMovingSelf = selectMovingSelf(store.getState());
  if (!isMovingSelf) {
    if (currentInteraction === 'idle' || currentInteraction === 'walking') {
      if (curIdxLegs === clickedIdx || curIdxHead === clickedIdx) {
        // TODO trigger click animation
      } else if (clickedEntity !== null) {
        if (checkNewInteraction(clickedEntity)) {
          spriteMoveSelfThenInteract(clickedEntity);
        }
      } else {
        const clickTarget = {
          x: clickPosX / tileSize,
          y: clickPosY / tileSize,
        };
        spriteMoveSelf(clickTarget);
      }
    } else cancelCurrentInteraction();
  }
}
