import ndarray from 'ndarray';
import createPlanner from 'l1-path-finder';
import { store } from '../app/store';
import {
  addCondition,
  removeCondition,
  changeInteraction,
  selectConditions,
  selectCurrentInteraction,
  setInteractionProgress,
} from '../features/sprite/spriteSlice';
import {
  setGameOver,
  selectGameOver,
  selectGameTime,
  increaseStarvation,
  increaseSleepDep,
  increaseSick,
  decreaseStarvation,
  decreaseSleepDep,
  decreaseSick,
  selectStarvation,
  selectSleepDep,
  selectSick,
  selectLightOn,
  selectMusicOn,
  toggleLightOn,
  toggleMusicOn,
  toggleComputerOn,
  toggleTvOn,
  selectDressed,
  toggleDressed,
} from '../features/game/gameSlice';
import {
  selectCurPos,
  setMoveDir,
  changeMovePos,
  setMovingSelf,
} from '../features/character/characterSlice';
import { addModifier, removeModifier } from '../features/meters/metersSlice';
import { MeterModifier } from '../interfaces/meterModifier.interface';
import {
  deductCost,
  triggerChangeMeters,
  triggerIncrementalChange,
} from './meters.helper';
import { calcPercentage } from './game.helper';
import { Entity } from '../interfaces/entity.interface';
import { conditions } from '../data/conditions.data';
import { entities } from '../data/entities.data';
import { day } from '../data/time.data';
import { checkCanMove, checkIndex } from './input.helper';
import { roomMap } from '../data/roomMap.data';
import {
  playObjectSound,
  stopObjectSound,
} from '../audioControllers/houseObjectsSounds';

import { musicController } from '../audioControllers/musicController';

// Calls functions to add condition strings to sprite state and then adjust inc and dec rates based on a modifier in meters state

export function triggerAddConditions(conditionsArr: string[]): void {
  const currentConditions = selectConditions(store.getState());
  conditionsArr.forEach((condition: string) => {
    if (!currentConditions.includes(condition)) {
      store.dispatch(addCondition(condition));
      conditions[condition].modifiers.forEach((modifier: MeterModifier) => {
        store.dispatch(addModifier(modifier));
      });
    }
  });
}

export function triggerRemoveConditions(conditionsArr: string[]): void {
  const currentConditions = selectConditions(store.getState());
  conditionsArr.forEach((condition: string) => {
    if (currentConditions.includes(condition)) {
      store.dispatch(removeCondition(condition));
      conditions[condition].modifiers.forEach((modifier: MeterModifier) => {
        store.dispatch(removeModifier(modifier));
      });
    }
  });
}

export function getEntityData(entity: string): Entity {
  return entities[entity];
}

function handleInteractionTriggers(triggers: string[]): void {
  const music = selectMusicOn(store.getState());
  const light = selectLightOn(store.getState());
  const clothes = selectDressed(store.getState());
  triggers.forEach((trigger) => {
    if (trigger === 'light') store.dispatch(toggleLightOn(!light));
    if (trigger === 'music') store.dispatch(toggleMusicOn(!music));
    if (trigger === 'clothes') store.dispatch(toggleDressed(!clothes));
    if (trigger === 'computer') store.dispatch(toggleComputerOn(true));
    if (trigger === 'tv') store.dispatch(toggleTvOn(true));
    if (trigger === 'clear') {
      store.dispatch(toggleTvOn(true));
      store.dispatch(toggleComputerOn(true));
    }
  });
}

// On a player interacting with an interactable entity, this function is called

export const handleInteraction = (entity: string): void => {
  const entityData: Entity = getEntityData(entity);
  if (deductCost(entityData.cost)) {
    if (entityData.conditions.length)
      triggerAddConditions(entityData.conditions);
    if (entityData.triggers.length)
      handleInteractionTriggers(entityData.triggers);
    triggerChangeMeters(entityData, entity);
  }
};

// Set to null if not interacting with anything or to a string identifying current interaction

export function checkNewInteraction(newInteraction: string): boolean {
  const currentInteraction = selectCurrentInteraction(store.getState());
  if (currentInteraction === newInteraction) return false;
  return true;
}
export function setNewInteraction(newInteraction: string): void {
  store.dispatch(changeInteraction(newInteraction));
  handleInteraction(newInteraction);
}

export const resumeInProgressInteraction = (): void => {
  const currentInteraction = selectCurrentInteraction(store.getState());
  if (currentInteraction && currentInteraction !== 'idle') {
    const entityData: Entity = getEntityData(currentInteraction);
    triggerIncrementalChange(entityData, currentInteraction);
  }
};

// Used to check whether lose state conditions are present in the sprite's conditions array

export const checkConditionsState = (): void => {
  const { gameHour, updateInterval } = selectGameTime(store.getState().game);
  const timer = setInterval(() => {
    const gameOver = selectGameOver(store.getState());
    if (gameOver) clearInterval(timer);
    else {
      const currentConditions = selectConditions(store.getState());
      if (currentConditions.includes('exhausted')) {
        store.dispatch(increaseSleepDep());
      } else store.dispatch(decreaseSleepDep());
      if (currentConditions.includes('hungry'))
        store.dispatch(increaseStarvation());
      else store.dispatch(decreaseStarvation());
      if (currentConditions.includes('unwell')) store.dispatch(increaseSick());
      else store.dispatch(decreaseSick());
    }
  }, gameHour * updateInterval);
};

// After specific periods of time with certain losing conditions in the sprite's conditions array different states are added and then a gave over is triggered if still unresolved.

export const checkLoseStates = (): void => {
  const { gameHour, updateInterval } = selectGameTime(store.getState().game);
  const timer = setInterval(() => {
    const starvation = selectStarvation(store.getState());
    const sleepDep = selectSleepDep(store.getState());
    const sick = selectSick(store.getState());
    if (starvation > day * 5 || sleepDep > day * 8 || sick > day * 7) {
      store.dispatch(setGameOver());
      stopObjectSound();
      clearInterval(timer);
    }
    if (starvation > day * 3) {
      triggerAddConditions(['starved']);
    }
    if (starvation < day * 3) {
      triggerRemoveConditions(['starved']);
    }
    if (sleepDep > day * 3) {
      triggerAddConditions(['delirious']);
    }
    if (sleepDep < day * 3) {
      triggerRemoveConditions(['delirious']);
    }
    if (sick > day * 4) {
      triggerAddConditions(['feverish']);
    }
    if (sick < day * 4) {
      triggerRemoveConditions(['feverish']);
    }
  }, gameHour * updateInterval);
};

export function updateInteractionProgress(
  current: number,
  total: number
): void {
  let percentageComplete;
  if (current === 0 && total === 0) {
    percentageComplete = null;
  } else {
    percentageComplete = 100 - calcPercentage(current, total);
  }
  store.dispatch(setInteractionProgress(percentageComplete));
}

function checkIfClickable(newPos: { x: number; y: number }): boolean {
  const mapIndex = checkIndex(newPos.x, newPos.y);
  const clickable = roomMap[mapIndex].int;
  if (clickable !== null) return true;
  return false;
}

export function generateRandomPos(incClick: boolean): { x: number; y: number } {
  let canMove = false;
  let validPos;
  const newPos = { x: 0, y: 0 };
  const illegalPos = [
    { x: 7, y: 7 },
    { x: 7, y: 8 },
    { x: 7, y: 9 },
    { x: 7, y: 10 },
    { x: 7, y: 11 },
    { x: 7, y: 12 },
    { x: 12, y: 7 },
    { x: 12, y: 8 },
    { x: 12, y: 9 },
    { x: 12, y: 10 },
    { x: 12, y: 11 },
    { x: 12, y: 12 },
  ];

  do {
    newPos.x = Math.floor(Math.random() * 20);
    newPos.y = Math.floor(Math.random() * 20);
    canMove = checkCanMove(newPos);
    if (!canMove && incClick) {
      canMove = checkIfClickable(newPos);
    }
    validPos = illegalPos.filter((pos) => {
      if (pos.x === newPos.x && pos.y === newPos.y) return true;
      return false;
    });
  } while (validPos.length || canMove === false);
  return newPos;
}

export function calcPath(newPos: { x: number; y: number }): number[] {
  const curPos = selectCurPos(store.getState());
  const tileArr: number[] = [];

  roomMap.forEach((tile) => {
    if (tile.walk) tileArr.push(0);
    else tileArr.push(1);
  });

  const room = ndarray([...tileArr], [20, 20]);
  const planner = createPlanner(room);
  const path: number[] = [];
  planner.search(curPos.y, curPos.x, newPos.y, newPos.x, path);

  return path;
}

export function spriteCalcMoves(newPos: {
  x: number;
  y: number;
}): { x: number; y: number }[] {
  const pathArr: number[] = calcPath(newPos);
  const curPos = selectCurPos(store.getState());
  const movesArr: { x: number; y: number }[] = [];
  const targetTiles = pathArr.slice(2);

  const lastPos = { x: curPos.x, y: curPos.y };
  let targetY: number | undefined;
  let targetX: number | undefined;
  while (targetTiles.length) {
    targetY = targetTiles.shift();
    targetX = targetTiles.shift();

    while (targetX !== lastPos.x || targetY !== lastPos.y) {
      if (targetX && lastPos.x !== targetX) {
        lastPos.x = lastPos.x < targetX ? lastPos.x + 1 : lastPos.x - 1;
      } else if (targetY && lastPos.y !== targetY) {
        lastPos.y = lastPos.y < targetY ? lastPos.y + 1 : lastPos.y - 1;
      }
      const nextMove = { x: lastPos.x, y: lastPos.y };
      movesArr.push(nextMove);
    }
  }

  return movesArr;
}
export function updateSpritePos(direction: string): void {
  store.dispatch(setMoveDir(direction));
  store.dispatch(changeMovePos());
}

export function spriteMoveSelf(newPos: { x: number; y: number }): void {
  store.dispatch(setMovingSelf(true));
  const movesArr = spriteCalcMoves(newPos);
  for (let i = 0; i < movesArr.length; i += 1) {
    setTimeout(() => {
      if (i === 0) store.dispatch(changeInteraction('walking'));
      const curPos = selectCurPos(store.getState());
      let direction = 'w';
      if (curPos.x > movesArr[i].x) direction = 'a';
      if (curPos.y > movesArr[i].y) direction = 'w';
      if (curPos.x < movesArr[i].x) direction = 'd';
      if (curPos.y < movesArr[i].y) direction = 's';
      updateSpritePos(direction);
      if (i === movesArr.length - 1) store.dispatch(changeInteraction('idle'));
    }, (i + 1) * 200);
  }
}

export function spriteMoveSelfThenInteract(interaction: string): void {
  store.dispatch(setMovingSelf(true));
  const newPos: { x: number; y: number } = { x: 0, y: 0 };

  if (interaction === 'bath') {
    newPos.x = 17;
    newPos.y = 5;
  } else if (interaction === 'phone') {
    newPos.x = 17;
    newPos.y = 15;
  } else if (interaction === 'oven') {
    newPos.x = 17;
    newPos.y = 12;
  } else if (interaction === 'fridge') {
    newPos.x = 18;
    newPos.y = 12;
  } else if (interaction === 'exercise') {
    newPos.x = 12;
    newPos.y = 18;
  } else if (interaction === 'table') {
    newPos.x = 13;
    newPos.y = 15;
  } else if (interaction === 'bed') {
    newPos.x = 2;
    newPos.y = 4;
  } else if (interaction === 'sofa') {
    newPos.x = 6;
    newPos.y = 16;
  } else if (interaction === 'desk') {
    newPos.x = 9;
    newPos.y = 13;
  } else if (interaction === 'dresser') {
    newPos.x = 6;
    newPos.y = 4;
  } else if (interaction === 'basin') {
    newPos.x = 12;
    newPos.y = 4;
  } else if (interaction === 'toilet') {
    newPos.x = 14;
    newPos.y = 4;
  } else if (interaction === 'lamp') {
    newPos.x = 2;
    newPos.y = 12;
  } else if (interaction === 'bookcase') {
    newPos.x = 3;
    newPos.y = 12;
  } else if (interaction === 'jukebox') {
    newPos.x = 5;
    newPos.y = 12;
  } else if (interaction === 'bin') {
    newPos.x = 11;
    newPos.y = 12;
  } else if (interaction === 'sink') {
    newPos.x = 15;
    newPos.y = 12;
  } else if (interaction === 'plant') {
    newPos.x = 8;
    newPos.y = 15;
  }

  const movesArr: { x: number; y: number }[] = spriteCalcMoves(newPos);
  for (let i = 0; i < movesArr.length + 1; i += 1) {
    setTimeout(() => {
      if (i === 0) store.dispatch(changeInteraction('walking'));
      if (i === movesArr.length) {
        setNewInteraction(interaction);
        playObjectSound(interaction);
        if (interaction === 'jukebox') musicController.handlePause();
      } else {
        const curPos = selectCurPos(store.getState());
        let direction = 'w';
        if (curPos.x > movesArr[i].x) direction = 'a';
        if (curPos.y > movesArr[i].y) direction = 'w';
        if (curPos.x < movesArr[i].x) direction = 'd';
        if (curPos.y < movesArr[i].y) direction = 's';
        updateSpritePos(direction);
      }
    }, (i + 1) * 210);
  }
}

export function startSpriteDecisions(): void {
  const newPos = generateRandomPos(true);
  const newIdx = checkIndex(newPos.x, newPos.y);
  const tile = roomMap[newIdx].int;
  if (tile !== null) spriteMoveSelfThenInteract(tile);
  else spriteMoveSelf(newPos);
}
