/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { hour } from '../../data/time.data';

export interface SpriteState {
  currentInteraction: string | null;
  interactionProgress: number | null;
  starvationCounter: number;
  sleepDepCounter: number;
  sickCounter: number;
  conditions: string[];
}

const initialState: SpriteState = {
  currentInteraction: null,
  interactionProgress: null,
  starvationCounter: 0,
  sleepDepCounter: 0,
  sickCounter: 0,
  conditions: [],
};

export const spriteSlice = createSlice({
  name: 'sprite',
  initialState,
  reducers: {
    changeInteraction: (state, action: PayloadAction<string | null>) => {
      state.currentInteraction = action.payload;
    },
    addCondition: (state, action: PayloadAction<string>) => {
      state.conditions.push(action.payload);
    },
    removeCondition: (state, action: PayloadAction<string>) => {
      state.conditions = state.conditions.filter(
        (condition) => condition !== action.payload
      );
    },
    increaseStarvation: (state) => {
      state.starvationCounter += hour;
    },
    increaseSleepDep: (state) => {
      state.sleepDepCounter += hour;
    },
    increaseSick: (state) => {
      state.sickCounter += hour;
    },
    decreaseStarvation: (state) => {
      if (state.starvationCounter > 0) state.starvationCounter -= hour;
      if (state.starvationCounter < 0) state.starvationCounter = 0;
    },
    decreaseSleepDep: (state) => {
      if (state.sleepDepCounter > 0) state.sleepDepCounter -= hour;
      if (state.sleepDepCounter < 0) state.sleepDepCounter = 0;
    },
    decreaseSick: (state) => {
      if (state.sickCounter > 0) state.sickCounter -= hour;
      if (state.sickCounter < 0) state.sickCounter = 0;
    },
    setInteractionProgress: (state, action: PayloadAction<number | null>) => {
      state.interactionProgress = action.payload;
    },
  },
});

export const {
  changeInteraction,
  addCondition,
  removeCondition,
  increaseStarvation,
  increaseSleepDep,
  increaseSick,
  decreaseStarvation,
  decreaseSleepDep,
  decreaseSick,
  setInteractionProgress,
} = spriteSlice.actions;

export const selectSprite = (state: RootState): SpriteState => state.sprite;

export const selectConditions = (state: RootState): string[] =>
  state.sprite.conditions;

export const selectStarvation = (state: RootState): number =>
  state.sprite.starvationCounter;
export const selectSleepDep = (state: RootState): number =>
  state.sprite.sleepDepCounter;
export const selectSick = (state: RootState): number =>
  state.sprite.sickCounter;
export const selectCurrentInteraction = (state: RootState): string | null =>
  state.sprite.currentInteraction;
export const selectInteractionProgress = (state: RootState): number | null =>
  state.sprite.interactionProgress;

export default spriteSlice.reducer;
