/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { GameTime } from '../../interfaces/gameTime.interface';
import { minute, hour, day } from '../../data/time.data';

export interface GameState {
  gameSpeed: number;
  currClockTimeInGame: number;
  currClockTimeReal: number;
  startTime: number;
  gameOver: boolean;
  timeLasted: number;
  isCurrentGameActive: boolean;
  starvationCounter: number;
  sleepDepCounter: number;
  sickCounter: number;
}

const initialState: GameState = {
  gameSpeed: 1,
  startTime: 0,
  currClockTimeInGame: 0,
  currClockTimeReal: 0,
  gameOver: false,
  timeLasted: 0,
  isCurrentGameActive: false,
  starvationCounter: 0,
  sleepDepCounter: 0,
  sickCounter: 0,
};

export const selectGameTime = (state: GameState): GameTime => {
  const gameTime = {
    gameMinute: minute / state.gameSpeed,
    gameHour: hour / state.gameSpeed,
    gameDay: day / state.gameSpeed,
    updateInterval: 5,
  };
  return gameTime;
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
    increaseStarvation: (state) => {
      const { updateInterval } = selectGameTime(state);
      state.starvationCounter += hour * updateInterval;
    },
    increaseSleepDep: (state) => {
      const { updateInterval } = selectGameTime(state);
      state.sleepDepCounter += hour * updateInterval;
    },
    increaseSick: (state) => {
      const { updateInterval } = selectGameTime(state);
      state.sickCounter += hour * updateInterval;
    },
    decreaseStarvation: (state) => {
      if (state.starvationCounter > 0) {
        const { updateInterval } = selectGameTime(state);
        state.starvationCounter -= hour * updateInterval;
      }
      if (state.starvationCounter < 0) state.starvationCounter = 0;
    },
    decreaseSleepDep: (state) => {
      if (state.sleepDepCounter > 0) {
        const { updateInterval } = selectGameTime(state);
        state.sleepDepCounter -= hour * updateInterval;
      }
      if (state.sleepDepCounter < 0) state.sleepDepCounter = 0;
    },
    decreaseSick: (state) => {
      if (state.sickCounter > 0) {
        const { updateInterval } = selectGameTime(state);
        state.sickCounter -= hour * updateInterval;
      }
      if (state.sickCounter < 0) state.sickCounter = 0;
    },
    setGameOver: (state) => {
      state.gameOver = !state.gameOver;
    },
    loadGameStateFromDb: (state, action: PayloadAction<GameState>) => {
      state.gameOver = action.payload.gameOver;
      // Changing the game speed seems to break things, I think because
      // gameTime.data.ts doesn't run again and re-export gameMinute
      // if the gameSpeed changes.
      state.gameSpeed = action.payload.gameSpeed;
      state.startTime = action.payload.startTime;
      state.currClockTimeInGame = action.payload.currClockTimeInGame;
      state.isCurrentGameActive = action.payload.isCurrentGameActive;
      state.starvationCounter = action.payload.starvationCounter;
      state.sleepDepCounter = action.payload.sleepDepCounter;
      state.sickCounter = action.payload.sickCounter;
    },
    setTimeLasted: (state, action: PayloadAction<number>) => {
      state.timeLasted = action.payload;
    },
    setIsCurrentGameActive: (state) => {
      state.isCurrentGameActive = !state.isCurrentGameActive;
    },
  },
});

export const {
  resetGameState,
  changeGameSpeed,
  setStartTime,
  updateClockTime,
  setGameOver,
  loadGameStateFromDb,
  setTimeLasted,
  setIsCurrentGameActive,
  increaseStarvation,
  increaseSleepDep,
  increaseSick,
  decreaseStarvation,
  decreaseSleepDep,
  decreaseSick,
} = gameSlice.actions;

export const selectGameSpeed = (state: RootState): number =>
  state.game.gameSpeed;

export const selectStartTime = (state: RootState): number =>
  state.game.startTime;

export const selectClockTimeInGame = (state: RootState): number =>
  state.game.currClockTimeInGame;

export const selectClockTimeReal = (state: RootState): number =>
  state.game.currClockTimeReal;

export const selectTimeLasted = (state: RootState): number =>
  state.game.timeLasted;

export const selectGameOver = (state: RootState): boolean =>
  state.game.gameOver;

export const selectStarvation = (state: RootState): number =>
  state.game.starvationCounter;
export const selectSleepDep = (state: RootState): number =>
  state.game.sleepDepCounter;
export const selectSick = (state: RootState): number => state.game.sickCounter;

export default gameSlice.reducer;
