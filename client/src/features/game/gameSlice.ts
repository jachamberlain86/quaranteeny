/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction, current } from '@reduxjs/toolkit';
import moment from 'moment';
import { RootState } from '../../app/store';
import { GameTime } from '../../interfaces/gameTime.interface';
import { second, minute, hour, day } from '../../data/time.data';

// TODO reconfigure slices to reduce use of useEffect across app
// TODO reorganise slices into singular game slice for all game logic
// TODO refactor logic in slices to handle events rather than act like getters/setters

export interface GameState {
  isRoomLoading: boolean;
  gameSpeed: number;
  startTime: number;
  currClockTimeReal: number;
  currClockTimeInGame: number;
  isInFastForwardMode: boolean;
  gameOver: boolean;
  timeLasted: number;
  isCurrentGameActive: boolean;
  starvationCounter: number;
  sleepDepCounter: number;
  sickCounter: number;
  timeOfDay: string;
  lightOn: boolean;
  musicOn: boolean;
  computerOn: boolean;
  tvOn: boolean;
  dressed: boolean;
  gameOverCause: string;
}

const initialState: GameState = {
  isRoomLoading: true,
  gameSpeed: 60,
  startTime: 0,
  currClockTimeReal: 0,
  currClockTimeInGame: 0,
  isInFastForwardMode: false,
  gameOver: false,
  timeLasted: 0,
  isCurrentGameActive: false,
  starvationCounter: 0,
  sleepDepCounter: 0,
  sickCounter: 0,
  timeOfDay: 'day',
  lightOn: false,
  musicOn: false,
  computerOn: false,
  tvOn: false,
  dressed: false,
  gameOverCause: '',
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
    setIsRoomLoadingToTrue: (state) => {
      state.isRoomLoading = true;
    },
    setIsRoomLoadingToFalse: (state) => {
      state.isRoomLoading = false;
    },
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
        timeNow: number;
      }>
    ) => {
      state.currClockTimeReal = action.payload.timeNow;
      const timeSinceStartReal = state.currClockTimeReal - state.startTime;
      const timeSinceStartInGame = timeSinceStartReal * state.gameSpeed;
      state.currClockTimeInGame = state.startTime + timeSinceStartInGame;

      // used to set filter effects for time of day
      const hourOfGameDay = moment(state.currClockTimeInGame).format('H');
      if (+hourOfGameDay >= 8 && +hourOfGameDay < 19) state.timeOfDay = 'day';
      if (+hourOfGameDay >= 19 && +hourOfGameDay < 21) state.timeOfDay = 'dusk';
      if (+hourOfGameDay >= 21 || +hourOfGameDay < 6) state.timeOfDay = 'night';
      if (+hourOfGameDay >= 6 && +hourOfGameDay < 8) state.timeOfDay = 'dawn';
    },
    updateClockWhenFastForwarding: (
      state,
      action: PayloadAction<{
        timeNow: number;
        gameSpeedOriginal: number;
      }>
    ) => {
      state.currClockTimeReal += second * state.gameSpeed;
      // prevent currClockTimeReal from becoming greater than timeNow;
      if (state.currClockTimeReal > action.payload.timeNow) {
        state.currClockTimeReal = action.payload.timeNow;
      }
      const timeSinceStartReal = state.currClockTimeReal - state.startTime;
      const timeSinceStartInGame =
        timeSinceStartReal * action.payload.gameSpeedOriginal;
      state.currClockTimeInGame = state.startTime + timeSinceStartInGame;
    },
    userReturnedAfterGap: (state) => {
      state.isInFastForwardMode = true;
    },
    finishedCatchingUpToPresent: (state) => {
      state.isInFastForwardMode = false;
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
      state.gameSpeed = action.payload.gameSpeed;
      state.startTime = action.payload.startTime;
      state.currClockTimeInGame = action.payload.currClockTimeInGame;
      state.currClockTimeReal = action.payload.currClockTimeReal;
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
    toggleLightOn: (state, action: PayloadAction<boolean>) => {
      state.lightOn = action.payload;
    },
    toggleMusicOn: (state, action: PayloadAction<boolean>) => {
      state.musicOn = action.payload;
    },
    toggleComputerOn: (state, action: PayloadAction<boolean>) => {
      state.computerOn = action.payload;
    },
    toggleTvOn: (state, action: PayloadAction<boolean>) => {
      state.tvOn = action.payload;
    },
    toggleDressed: (state, action: PayloadAction<boolean>) => {
      if (action.payload) {
        console.log('You put clothes on');
      } else {
        console.log("You're naked!");
      }
      state.dressed = action.payload;
    },
    updateGameOverCause: (state, action: PayloadAction<string>) => {
      state.gameOverCause = action.payload;
    },
  },
});
export const {
  setIsRoomLoadingToTrue,
  setIsRoomLoadingToFalse,
  resetGameState,
  changeGameSpeed,
  setStartTime,
  updateClockTime,
  updateClockWhenFastForwarding,
  userReturnedAfterGap,
  finishedCatchingUpToPresent,
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
  toggleLightOn,
  toggleMusicOn,
  toggleComputerOn,
  toggleTvOn,
  toggleDressed,
  updateGameOverCause,
} = gameSlice.actions;

export const selectGameOverCause = (state: RootState): string =>
  state.game.gameOverCause;

export const selectIsRoomLoading = (state: RootState): boolean =>
  state.game.isRoomLoading;

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
export const selectIsInFastForwardMode = (state: RootState): boolean =>
  state.game.isInFastForwardMode;

export const selectGameOver = (state: RootState): boolean =>
  state.game.gameOver;

export const selectStarvation = (state: RootState): number =>
  state.game.starvationCounter;

export const selectSleepDep = (state: RootState): number =>
  state.game.sleepDepCounter;

export const selectSick = (state: RootState): number => state.game.sickCounter;

export const selectTimeOfDay = (state: RootState): string =>
  state.game.timeOfDay;

export const selectLightOn = (state: RootState): boolean => state.game.lightOn;

export const selectMusicOn = (state: RootState): boolean => state.game.musicOn;

export const selectComputerOn = (state: RootState): boolean =>
  state.game.computerOn;

export const selectTvOn = (state: RootState): boolean => state.game.tvOn;

export const selectDressed = (state: RootState): boolean => state.game.dressed;

export default gameSlice.reducer;
