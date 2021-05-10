/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface GameState {
  gameSpeed: number;
}

const initialState: GameState = {
  gameSpeed: 100,
};

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    changeGameSpeed: (state, action: PayloadAction<number>) => {
      state.gameSpeed = action.payload;
    },
  },
});

export const { changeGameSpeed } = gameSlice.actions;

export const selectGameSpeed = (state: RootState): number =>
  state.game.gameSpeed;

export default gameSlice.reducer;
