/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface SpriteState {
  currentInteraction: string | null;
  interactionProgress: number | null;
  starvationCounter: number;
  sleepDepCounter: number;
  conditions: [];
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
    changeInteraction: (
      state,
      action: PayloadAction<{ interaction: string | null }>
    ) => {
      state.currentInteraction = action.payload.interaction;
    },
  },
});

export const { changeInteraction } = spriteSlice.actions;

export const selectSprite = (state: RootState): SpriteState => state.sprite;

export default spriteSlice.reducer;
