/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface GameState {
  gameSpeed: number;
  currClockTime: number;
  startTime: number;
  gameOver: boolean;
  userName: string;
}

const initialState: GameState = {
  gameSpeed: 100,
  startTime: Date.now(),
  currClockTime: Date.now(),
  gameOver: false,
  userName: '',
};

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    changeGameSpeed: (state, action: PayloadAction<number>) => {
      state.gameSpeed = action.payload;
    },
    updateClockTime: (
      state,
      action: PayloadAction<{ gameSpeed: number; prevClockTime: number }>
    ) => {
      // `diff` is the time elapsed since last update to the clock
      const diff = Date.now() - action.payload.prevClockTime;
      state.currClockTime =
        action.payload.prevClockTime + diff * action.payload.gameSpeed;
    },
    setGameOver: (state) => {
      state.gameOver = !state.gameOver;
    },
    setUserName: (state, action: PayloadAction<string>) => {
      state.userName = action.payload;
    },
  },
});

export const {
  changeGameSpeed,
  updateClockTime,
  setGameOver,
  setUserName,
} = gameSlice.actions;

export const selectGameSpeed = (state: RootState): number =>
  state.game.gameSpeed;

export const selectStartTime = (state: RootState): number =>
  state.game.startTime;

export const selectClockTime = (state: RootState): number =>
  state.game.currClockTime;

export const selectGameOver = (state: RootState): boolean =>
  state.game.gameOver;

export default gameSlice.reducer;
