/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction, current } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { Character } from '../../interfaces/character.interface';
import game from '../../data/gameMap.data';
import { characterStateBuilder } from '../../data/characterStateBuilder.data';

const initialState: Character = {
  curPos: { x: 11, y: 15 },
  movePos: { x: 11, y: 15 },
  leftFired: false,
  rightFired: false,
  upFired: false,
  downFired: false,
  kFired: false,
  lFired: false,
  moveIntId: null,
  moveDir: null,
  lastInput: Date.now(),
  movingSelf: false,
};

export const selectCharacter = (state: RootState): Character => state.character;
export const selectMovingSelf = (state: RootState): boolean =>
  state.character.movingSelf;
export const selectLeftFired = (state: RootState): boolean =>
  state.character.leftFired;
export const selectRightFired = (state: RootState): boolean =>
  state.character.rightFired;
export const selectUpFired = (state: RootState): boolean =>
  state.character.upFired;
export const selectDownFired = (state: RootState): boolean =>
  state.character.downFired;
export const selectKFired = (state: RootState): boolean =>
  state.character.kFired;
export const selectLFired = (state: RootState): boolean =>
  state.character.lFired;
export const selectMoveIntId = (state: RootState): NodeJS.Timeout | null =>
  state.character.moveIntId;
export const selectMoveDir = (state: RootState): string | null =>
  state.character.moveDir;
export const selectCurPos = (state: RootState): { x: number; y: number } =>
  state.character.curPos;
export const selectMovePos = (state: RootState): { x: number; y: number } =>
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
    toggleKFired(state) {
      state.kFired = !state.kFired;
    },
    toggleLFired(state) {
      state.lFired = !state.lFired;
    },
    setMovingSelf(state, action: PayloadAction<boolean>) {
      state.movingSelf = action.payload;
    },
    setMoveIntId(state, action: PayloadAction<NodeJS.Timeout | null>) {
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
        state.curPos.y += 1;
      }
      if (state.moveDir === 'w') {
        state.curPos.y -= 1;
      }
      if (state.moveDir === 'a') {
        state.curPos.x -= 1;
      }
      if (state.moveDir === 'd') {
        state.curPos.x += 1;
      }
    },
    changeCurPos(state, action: PayloadAction<{ x: number; y: number }>) {
      state.curPos = action.payload;
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
  toggleKFired,
  toggleLFired,
  setMoveIntId,
  setMoveDir,
  changeMovePos,
  updateLastInput,
  changeCurPos,
  setMovingSelf,
} = characterSlice.actions;

export default characterSlice.reducer;
