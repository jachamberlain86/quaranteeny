/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { Character } from '../../interfaces/character.interface';
import game from '../../data/gameMap.data';
import { generateRandomPos } from '../../helpers/sprite.helper';

const initialState: Character = {
  curPos: [1, 4],
  movePos: [1, 4],
  leftFired: false,
  rightFired: false,
  upFired: false,
  downFired: false,
  moveIntId: null,
  moveDir: null,
  lastInput: Date.now(),
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
export const selectLastInput = (state: RootState): number =>
  state.character.lastInput;

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
      if (action.payload === 's') {
        state.moveDir = action.payload;
      }
      if (action.payload === 'w') {
        state.moveDir = action.payload;
      }
      if (action.payload === 'a') {
        state.moveDir = action.payload;
      }
      if (action.payload === 'd') {
        state.moveDir = action.payload;
      }
    },
    changeMovePos(state) {
      if (state.moveDir === 's') {
        state.curPos[1] += 1;
      }
      if (state.moveDir === 'w') {
        state.curPos[1] -= 1;
      }
      if (state.moveDir === 'a') {
        state.curPos[0] -= 1;
      }
      if (state.moveDir === 'd') {
        state.curPos[0] += 1;
      }
    },
    updateLastInput(state) {
      state.lastInput = Date.now();
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
  updateLastInput,
} = characterSlice.actions;

export default characterSlice.reducer;
