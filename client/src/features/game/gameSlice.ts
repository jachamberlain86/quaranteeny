/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';

export interface GameState {
  // gameStatus: 'alive' | 'lost';
  gameSpeed: number;
  currClockTime: number;
  startTime: number;
}

const initialState: GameState = {
  // gameStatus: 'alive',
  gameSpeed: 100,
  startTime: Date.now(),
  currClockTime: Date.now(),
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
    // setGameStatus: (state, action: PayloadAction<'alive' | 'lost'>) => {
    //   state.gameStatus = action.payload;
    // },
  },
});

export const {
  changeGameSpeed,
  updateClockTime,
  // setGameStatus,
} = gameSlice.actions;

// export const selectGameStatus = (state: RootState): string =>
//   state.game.gameStatus;

export const selectGameSpeed = (state: RootState): number =>
  state.game.gameSpeed;

export const selectStartTime = (state: RootState): number =>
  state.game.startTime;

export const selectClockTime = (state: RootState): number =>
  state.game.currClockTime;

export const startClock = (): AppThunk => (dispatch, getState) => {
  const fiveSeconds = 1000 * 5;
  const prevClockTime = selectClockTime(getState());
  const gameSpeed = selectGameSpeed(getState());
  // const gameStatus = selectGameStatus(getState());
  const clockInterval = setInterval(() => {
    // if (gameStatus === 'lost') {
    // clearInterval(clockInterval);
    // } else if (gameStatus === 'alive') {
    dispatch(updateClockTime({ gameSpeed, prevClockTime }));
    // }
  }, fiveSeconds);
};

export default gameSlice.reducer;
