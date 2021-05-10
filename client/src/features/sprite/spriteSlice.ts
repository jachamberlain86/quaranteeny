/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface SpriteState {
  currentInteraction: string | null;
  interactionProgress: number | null;
  starvationCounter: number;
  sleepDepCounter: number;
  conditions: string[];
}

const initialState: SpriteState = {
  currentInteraction: null,
  interactionProgress: null,
  starvationCounter: 0,
  sleepDepCounter: 0,
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
  },
});

export const {
  changeInteraction,
  addCondition,
  removeCondition,
} = spriteSlice.actions;

export const selectSprite = (state: RootState): SpriteState => state.sprite;

export default spriteSlice.reducer;
