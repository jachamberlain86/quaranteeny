/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { Character } from '../../interfaces/character.interface';
import game from '../../data/gameMap.data';

const initialState: Character = {
  curPos: [1, 1],
  movePos: [1, 1],
  timeMoved: 0,
  dimensions: [40, 40],
  position: [45, 45],
  delayMove: 700,
  direction: 'left',
  isMoving: false,
  leftFired: false,
  rightFired: false,
  upFired: false,
  downFired: false,
  moveIntId: null,
  moveDir: null,
};

export const selectCharacter = (state: RootState): Character => state.character;
export const selectLeftFired = (state: RootState): boolean =>
  state.character.leftFired;
export const selectRightFired = (state: RootState): boolean =>
  state.character.rightFired;
export const selectUpFired = (state: RootState): boolean =>
  state.character.upFired;
export const selectDownFired = (state: RootState): boolean =>
  state.character.downFired;
export const selectMoveIntId = (state: RootState): number | null =>
  state.character.moveIntId;
export const selectMoveDir = (state: RootState): string | null =>
  state.character.moveDir;
export const selectCurPos = (state: RootState): number[] =>
  state.character.curPos;
export const selectMovePos = (state: RootState): number[] =>
  state.character.movePos;

const { tileSize } = game;

const characterSlice = createSlice({
  name: 'character',
  initialState,
  reducers: {
    resetCharacter: () => initialState,
    toggleLeftFired(state) {
      state.leftFired = !state.leftFired;
    },
    toggleRightFired(state) {
      state.rightFired = !state.rightFired;
    },
    toggleUpFired(state) {
      state.upFired = !state.upFired;
    },
    toggleDownFired(state) {
      state.downFired = !state.downFired;
    },
    setMoveIntId(state, action: PayloadAction<number | null>) {
      state.moveIntId = action.payload;
    },
    setMoveDir(state, action: PayloadAction<string | null>) {
      if (action.payload === 's') state.moveDir = action.payload;
      if (action.payload === 'w') state.moveDir = action.payload;
      if (action.payload === 'a') state.moveDir = action.payload;
      if (action.payload === 'd') state.moveDir = action.payload;
    },
    changeMovePos(state) {
      if (state.moveDir === 's') state.curPos[1] += 1;
      if (state.moveDir === 'w') state.curPos[1] -= 1;
      if (state.moveDir === 'a') state.curPos[0] -= 1;
      if (state.moveDir === 'd') state.curPos[0] += 1;
    },
    processMovement(state, action) {
      const t = action.payload.time;
      if (
        state.curPos[0] === state.movePos[0] &&
        state.curPos[1] === state.movePos[1]
      ) {
        state.isMoving = false;
      }

      if (t - state.timeMoved >= state.delayMove) {
        state.curPos = [state.movePos[0], state.movePos[1]];
        state.curPos = [state.movePos[0], state.movePos[1]];
        state.position = [
          tileSize * state.movePos[0] + (tileSize - state.dimensions[0] / 2),
          tileSize * state.movePos[1] + (tileSize - state.dimensions[1] / 2),
        ];
      } else {
        state.position[0] =
          state.curPos[0] * tileSize + (tileSize - state.dimensions[0]) / 2;
        state.position[1] =
          state.curPos[1] * tileSize + (tileSize - state.dimensions[1] / 2);

        if (state.curPos[0] !== state.movePos[0]) {
          const diff = (tileSize / state.delayMove) * (t - state.timeMoved);
          state.position[0] +=
            state.curPos[0] < state.movePos[0] ? 0 - diff : diff;
        }

        if (state.curPos[1] !== state.movePos[1]) {
          const diff = (tileSize / state.delayMove) * (t - state.timeMoved);
          state.position[1] +=
            state.curPos[1] < state.movePos[1] ? 0 - diff : diff;
        }

        state.position[0] = Math.round(state.position[0]);
        state.position[1] = Math.round(state.position[1]);
      }
      state.isMoving = true;
    },
    setTimeMoved(state, action) {
      const currFrameTime = action.payload;
      state.timeMoved = currFrameTime;
    },
  },
});

export const {
  resetCharacter,
  processMovement,
  setTimeMoved,
  toggleLeftFired,
  toggleRightFired,
  toggleUpFired,
  toggleDownFired,
  setMoveIntId,
  setMoveDir,
  changeMovePos,
} = characterSlice.actions;
export default characterSlice.reducer;

// placeAt(state, action) {
//   const [x, y] = action.payload.coordinates;
//   // console.log('coming from placeAt', x, y);
//   state.tileFrom = [x, y];
//   state.tileTo = [x, y];
//   state.position = [
//     game.tileSize * x + (game.tileSize - state.dimensions[0] / 2),
//     game.tileSize * y + (game.tileSize - state.dimensions[1] / 2),
//   ];
// },
