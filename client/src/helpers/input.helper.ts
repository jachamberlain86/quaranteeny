import { store } from '../app/store';
import {
  selectLeftFired,
  selectRightFired,
  selectUpFired,
  selectDownFired,
  toggleLeftFired,
  toggleRightFired,
  toggleUpFired,
  toggleDownFired,
  setMoveIntId,
  selectMoveIntId,
  setMoveDir,
  selectMoveDir,
  selectCurPos,
  changeMovePos,
  selectDelay,
} from '../features/character/characterSlice';
import {
  cuteWalkOne,
  shuffleWalkOne,
  shuffleWalkShort,
  collisionOne,
  collisionTwo,
} from '../audioControllers/playerSounds';
import game from '../data/gameMap.data';

function calcNewPos(key: string): number[] {
  const curPos = selectCurPos(store.getState());
  const curPosCopy = [...curPos];
  if (key === 's') curPosCopy[1] += 1;
  if (key === 'w') curPosCopy[1] -= 1;
  if (key === 'a') curPosCopy[0] -= 1;
  if (key === 'd') curPosCopy[0] += 1;
  return curPosCopy;
}

export function checkIndex(x: number, y: number): number {
  const { cols } = game;
  return y * cols + x;
}

function checkCanMove(newPos: number[]): boolean {
  const { layers } = game;
  const mapIndex = checkIndex(newPos[0], newPos[1]);
  const result = layers[0][mapIndex].walk;
  return result;
}

function handleMove(key: string): void {
  const timerDel = selectDelay(store.getState());
  const timer = window.setInterval(() => {
    const newPos = calcNewPos(key);
    console.log(newPos);
    if (checkCanMove(newPos)) {
      shuffleWalkShort.play();
      store.dispatch(changeMovePos());
    } else {
      collisionOne.play();
    }
  }, timerDel);
  store.dispatch(setMoveIntId(timer));
}

function handleStop(): void {
  const timer = selectMoveIntId(store.getState());
  if (timer) {
    window.clearInterval(timer);
    store.dispatch(setMoveIntId(null));
    store.dispatch(setMoveDir(null));
  }
}

export function downHandler(event: KeyboardEvent): void {
  const moveDir = selectMoveDir(store.getState());
  const leftFired = selectLeftFired(store.getState());
  const rightFired = selectRightFired(store.getState());
  const upFired = selectUpFired(store.getState());
  const downFired = selectDownFired(store.getState());
  if (event.key === 'a' && !leftFired) {
    if (moveDir === null) {
      store.dispatch(toggleLeftFired());
      store.dispatch(setMoveDir(event.key));
      handleMove(event.key);
    } else {
      handleStop();
      store.dispatch(toggleLeftFired());
      store.dispatch(setMoveDir(event.key));
      handleMove(event.key);
    }
  }
  if (event.key === 'd' && !rightFired) {
    console.log('registered right');
    if (moveDir === null) {
      store.dispatch(toggleRightFired());
      store.dispatch(setMoveDir(event.key));
      handleMove(event.key);
    } else {
      handleStop();
      store.dispatch(toggleRightFired());
      store.dispatch(setMoveDir(event.key));
      handleMove(event.key);
    }
  }
  if (event.key === 'w' && !upFired) {
    if (moveDir === null) {
      store.dispatch(toggleUpFired());
      store.dispatch(setMoveDir(event.key));
      handleMove(event.key);
    } else {
      handleStop();
      store.dispatch(toggleUpFired());
      store.dispatch(setMoveDir(event.key));
      handleMove(event.key);
    }
  }
  if (event.key === 's' && !downFired) {
    if (moveDir === null) {
      store.dispatch(toggleDownFired());
      store.dispatch(setMoveDir(event.key));
      handleMove(event.key);
    } else {
      handleStop();
      store.dispatch(toggleDownFired());
      store.dispatch(setMoveDir(event.key));
      handleMove(event.key);
    }
  }
}

export function upHandler(event: KeyboardEvent): void {
  const moveDir = selectMoveDir(store.getState());
  const leftFired = selectLeftFired(store.getState());
  const rightFired = selectRightFired(store.getState());
  const upFired = selectUpFired(store.getState());
  const downFired = selectDownFired(store.getState());

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
}
