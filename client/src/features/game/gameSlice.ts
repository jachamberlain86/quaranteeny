/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface GameState {
  gameSpeed: number;
  currClockTimeInGame: number;
  currClockTimeReal: number;
  clockIntervalId: NodeJS.Timeout | null;
  startTime: number;
  gameOver: boolean;
  timeLasted: number;
  activeCurrentGame: boolean;
}

const initialState: GameState = {
  gameSpeed: 100,
  startTime: 0,
  currClockTimeInGame: 0,
  currClockTimeReal: 0,
  clockIntervalId: null,
  gameOver: false,
  timeLasted: 0,
  activeCurrentGame: false,
};

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    resetGameState: () => initialState,
    changeGameSpeed: (state, action: PayloadAction<number>) => {
      state.gameSpeed = action.payload;
    },
    setStartTime: (state, action: PayloadAction<number>) => {
      state.startTime = action.payload;
      state.currClockTimeReal = action.payload;
      state.currClockTimeInGame = action.payload;
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
    setClockIntervalId: (
      state,
      action: PayloadAction<NodeJS.Timeout | null>
    ) => {
      state.clockIntervalId = action.payload;
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
    setTimeLasted: (state, action: PayloadAction<number>) => {
      state.timeLasted = action.payload;
    },
    setActiveCurrentGame: (state) => {
      state.activeCurrentGame = !state.activeCurrentGame;
    },
  },
});

export const {
  resetGameState,
  changeGameSpeed,
  setStartTime,
  updateClockTime,
  setClockIntervalId,
  setGameOver,
  loadGameStateFromDb,
  setTimeLasted,
  setActiveCurrentGame,
} = gameSlice.actions;

export const selectGameSpeed = (state: RootState): number =>
  state.game.gameSpeed;

export const selectStartTime = (state: RootState): number =>
  state.game.startTime;

export const selectClockTimeInGame = (state: RootState): number =>
  state.game.currClockTimeInGame;

export const selectClockTimeReal = (state: RootState): number =>
  state.game.currClockTimeReal;

export const selectClockIntervalId = (
  state: RootState
): NodeJS.Timeout | null => state.game.clockIntervalId;

export const selectGameOver = (state: RootState): boolean =>
  state.game.gameOver;

export default gameSlice.reducer;
