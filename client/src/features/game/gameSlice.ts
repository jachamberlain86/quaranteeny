/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface GameState {
  gameSpeed: number;
  currClockTimeInGame: number;
  currClockTimeReal: number;
  startTime: number;
  gameOver: boolean;
  userName: string;
  timeLasted: string;
}

const initialState: GameState = {
  gameSpeed: 100,
  startTime: Date.now(),
  currClockTimeInGame: Date.now(),
  currClockTimeReal: Date.now(),
  gameOver: false,
  userName: '',
  timeLasted: '',
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
      action: PayloadAction<{
        currTimeReal: number;
      }>
    ) => {
      state.currClockTimeReal = action.payload.currTimeReal;
      const timeSinceStartReal = state.currClockTimeReal - state.startTime;
      const timeSinceStartInGame = timeSinceStartReal * state.gameSpeed;
      state.currClockTimeInGame = state.startTime + timeSinceStartInGame;
    },
    setGameOver: (state) => {
      state.gameOver = !state.gameOver;
    },
    loadGameStateFromDb: (state, action: PayloadAction<GameState>) => {
      state.gameOver = action.payload.gameOver;
      // Changing the game speed seems to break things, I think because
      // gameTime.data.ts doesn't run again and re-export gameMinute
      // if the gameSpeed changes.
      // state.gameSpeed = action.payload.gameSpeed;
      state.startTime = action.payload.startTime;
      state.currClockTimeInGame = action.payload.currClockTimeInGame;
    },
    setUserName: (state, action: PayloadAction<string>) => {
      state.userName = action.payload;
    },
    setTimeLasted: (state, action: PayloadAction<string>) => {
      state.timeLasted = action.payload;
    },
  },
});

export const {
  changeGameSpeed,
  updateClockTime,
  setGameOver,
  loadGameStateFromDb,
  setUserName,
  setTimeLasted,
} = gameSlice.actions;

export const selectGameSpeed = (state: RootState): number =>
  state.game.gameSpeed;

export const selectStartTime = (state: RootState): number =>
  state.game.startTime;

export const selectClockTimeInGame = (state: RootState): number =>
  state.game.currClockTimeInGame;
export const selectClockTimeReal = (state: RootState): number =>
  state.game.currClockTimeReal;
export const selectGameOver = (state: RootState): boolean =>
  state.game.gameOver;

export default gameSlice.reducer;
