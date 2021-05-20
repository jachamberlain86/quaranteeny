import { Howl } from 'howler';
import { store } from '../app/store';
import {
  selectLeftFired,
  selectRightFired,
  selectUpFired,
  selectDownFired,
  selectKFired,
  selectLFired,
  toggleLeftFired,
  toggleRightFired,
  toggleUpFired,
  toggleDownFired,
  toggleKFired,
  toggleLFired,
  setMoveIntId,
  selectMoveIntId,
  setMoveDir,
  selectMoveDir,
  selectCurPos,
  changeMovePos,
  updateLastInput,
  selectMovingSelf,
} from '../features/character/characterSlice';
import {
  changeInteraction,
  selectCurrentInteraction,
  updateObjectsNearBy,
} from '../features/sprite/spriteSlice';
import {
  handleInteraction,
  setNewInteraction,
  checkNewInteraction,
  triggerRemoveConditions,
  getEntityData,
} from './sprite.helper';
import {
  cuteWalkOne,
  shuffleWalkOne,
  shuffleWalkShort,
  collisionOne,
  collisionTwo,
  howlCollisionsObj,
  collisionArray,
} from '../audioControllers/playerSounds';
import {
  playObjectSound,
  stopObjectSound,
} from '../audioControllers/houseObjectsSounds';
import game from '../data/gameMap.data';
import { roomMap } from '../data/roomMap.data';
import { musicController } from '../audioControllers/musicController';

function calcNewPos(key: string): { x: number; y: number } {
  const curPos = selectCurPos(store.getState());
  const curPosCopy = { ...curPos };
  if (key === 's') curPosCopy.y += 1;
  if (key === 'w') curPosCopy.y -= 1;
  if (key === 'a') curPosCopy.x -= 1;
  if (key === 'd') curPosCopy.x += 1;
  return curPosCopy;
}

export function checkIndex(x: number, y: number): number {
  const { cols } = game;
  return y * cols + x;
}

export function checkCanMove(newPos: { x: number; y: number }): boolean {
  const { layers } = game;
  const mapIndex = checkIndex(newPos.x, newPos.y);
  const result = layers[0][mapIndex].walk;
  return result;
}

function handleMove(key: string): NodeJS.Timeout {
  store.dispatch(changeInteraction('walking'));
  const timer = setInterval(() => {
    const newPos = calcNewPos(key);
    if (checkCanMove(newPos)) {
      shuffleWalkShort.play();
      store.dispatch(changeMovePos());
      const mapIndex = checkIndex(newPos.x, newPos.y);
      const nearByObjects = roomMap[mapIndex].intPos;
      store.dispatch(updateObjectsNearBy(nearByObjects));
    } else {
      const randomCollisionSound =
        collisionArray[Math.floor(Math.random() * collisionArray.length)];
      howlCollisionsObj[randomCollisionSound].play();
    }
  }, 200);
  store.dispatch(setMoveIntId(timer));
  return timer;
}

function handleStop(): void {
  const timer = selectMoveIntId(store.getState());
  if (timer) {
    window.clearInterval(timer);
    store.dispatch(changeInteraction('idle'));
    store.dispatch(setMoveIntId(null));
    store.dispatch(setMoveDir(null));
  }
}

export function cancelCurrentInteraction(): void {
  const currentInteraction = selectCurrentInteraction(store.getState());
  const entityData = getEntityData(currentInteraction);
  triggerRemoveConditions(entityData.conditions);
  store.dispatch(changeInteraction('cancel'));
  stopObjectSound();
}

const runInteractionAnimations = (interaction: string): void => {
  if (checkNewInteraction(interaction)) {
    playObjectSound(interaction);
    setNewInteraction(interaction);
    if (interaction === 'jukebox') musicController.handlePause();
  }
};

export function downHandler(event: KeyboardEvent): NodeJS.Timeout | undefined {
  const moveDir = selectMoveDir(store.getState());
  const leftFired = selectLeftFired(store.getState());
  const rightFired = selectRightFired(store.getState());
  const upFired = selectUpFired(store.getState());
  const downFired = selectDownFired(store.getState());
  const currentInteraction = selectCurrentInteraction(store.getState());
  const untimedInteractions = ['walking', 'idle'];
  const ignoreKeys = ['k', 'l'];
  const isMovingSelf = selectMovingSelf(store.getState());
  let currentTimer;
  if (!isMovingSelf) {
    if (
      !untimedInteractions.includes(currentInteraction) &&
      !ignoreKeys.includes(event.key) &&
      currentInteraction
    ) {
      console.log(currentInteraction);
      cancelCurrentInteraction();
    }

    if (event.key === 'a' && !leftFired) {
      if (moveDir === null) {
        store.dispatch(toggleLeftFired());
        store.dispatch(setMoveDir(event.key));
        currentTimer = handleMove(event.key);
      } else {
        handleStop();
        store.dispatch(toggleLeftFired());
        store.dispatch(setMoveDir(event.key));
        currentTimer = handleMove(event.key);
      }
    }
    if (event.key === 'd' && !rightFired) {
      if (moveDir === null) {
        store.dispatch(toggleRightFired());
        store.dispatch(setMoveDir(event.key));
        currentTimer = handleMove(event.key);
      } else {
        handleStop();
        store.dispatch(toggleRightFired());
        store.dispatch(setMoveDir(event.key));
        currentTimer = handleMove(event.key);
      }
    }
    if (event.key === 'w' && !upFired) {
      if (moveDir === null) {
        store.dispatch(toggleUpFired());
        store.dispatch(setMoveDir(event.key));
        currentTimer = handleMove(event.key);
      } else {
        handleStop();
        store.dispatch(toggleUpFired());
        store.dispatch(setMoveDir(event.key));
        currentTimer = handleMove(event.key);
      }
    }
    if (event.key === 's' && !downFired) {
      if (moveDir === null) {
        store.dispatch(toggleDownFired());
        store.dispatch(setMoveDir(event.key));
        currentTimer = handleMove(event.key);
      } else {
        handleStop();
        store.dispatch(toggleDownFired());
        store.dispatch(setMoveDir(event.key));
        currentTimer = handleMove(event.key);
      }
    }
  }
  return currentTimer;
}

export function upHandler(event: KeyboardEvent): void {
  const moveDir = selectMoveDir(store.getState());
  const leftFired = selectLeftFired(store.getState());
  const rightFired = selectRightFired(store.getState());
  const upFired = selectUpFired(store.getState());
  const downFired = selectDownFired(store.getState());
  store.dispatch(updateLastInput);
  const isMovingSelf = selectMovingSelf(store.getState());
  if (!isMovingSelf) {
    if (event.key === 'a') {
      if (leftFired) {
        store.dispatch(toggleLeftFired());
      }
      if (moveDir === event.key) {
        handleStop();
      }
    }
    if (event.key === 'd') {
      if (rightFired) {
        store.dispatch(toggleRightFired());
      }
      if (moveDir === event.key) {
        handleStop();
      }
    }
    if (event.key === 'w') {
      if (upFired) {
        store.dispatch(toggleUpFired());
      }
      if (moveDir === event.key) {
        handleStop();
      }
    }
    if (event.key === 's') {
      if (downFired) {
        store.dispatch(toggleDownFired());
      }
      if (moveDir === event.key) {
        handleStop();
      }
    }

    const untimedInteractions = ['walking', 'idle'];
    const currentInteraction = selectCurrentInteraction(store.getState());

    if (!untimedInteractions.includes(currentInteraction))
      cancelCurrentInteraction();
    else {
      if (event.key === 'k') {
        const interactionOne = store.getState().sprite.objectsNearBy[0];
        if (typeof interactionOne === 'string')
          runInteractionAnimations(interactionOne);
      }
      if (event.key === 'l') {
        const interactionTwo = store.getState().sprite.objectsNearBy[1];
        if (typeof interactionTwo === 'string')
          runInteractionAnimations(interactionTwo);
      }
    }
  }
}
