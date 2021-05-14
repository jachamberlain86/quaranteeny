/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { Character } from '../../interfaces/character.interface';
import game from '../../data/gameMap.data';

const initialState: Character = {
  curPos: [1, 1],
  movePos: [1, 1],
  dimensions: [40, 40],
  pixelLocation: [40, 40],
  direction: 'yellow',
  isMoving: false,
  leftFired: false,
  rightFired: false,
  upFired: false,
  downFired: false,
  moveIntId: null,
  moveDir: null,
  delay: 500,
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
export const selectPixelLocation = (state: RootState): number[] =>
  state.character.pixelLocation;
export const selectDelay = (state: RootState): number => state.character.delay;

const { tileSize } = game;

const characterSlice = createSlice({
  name: 'character',
  initialState,
  reducers: {
    resetCharacter: () => initialState,
    toggleLeftFired(state) {
      state.leftFired = !state.leftFired;
      state.direction = 'blue';
    },
    toggleRightFired(state) {
      state.rightFired = !state.rightFired;
      state.direction = 'red';
    },
    toggleUpFired(state) {
      state.upFired = !state.upFired;
      state.direction = 'green';
    },
    toggleDownFired(state) {
      state.downFired = !state.downFired;
      state.direction = 'purple';
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
      if (state.moveDir === 's') {
        state.curPos[1] += 1;
        state.pixelLocation[1] = tileSize * state.curPos[1];
      }
      if (state.moveDir === 'w') {
        state.curPos[1] -= 1;
        state.pixelLocation[1] = tileSize * state.curPos[1];
      }
      if (state.moveDir === 'a') {
        state.curPos[0] -= 1;
        state.pixelLocation[0] = tileSize * state.curPos[0];
      }
      if (state.moveDir === 'd') {
        state.curPos[0] += 1;
        state.pixelLocation[0] = tileSize * state.curPos[0];
      }
    },
  },
});

export const {
  resetCharacter,
  toggleLeftFired,
  toggleRightFired,
  toggleUpFired,
  toggleDownFired,
  setMoveIntId,
  setMoveDir,
  changeMovePos,
} = characterSlice.actions;
export default characterSlice.reducer;
