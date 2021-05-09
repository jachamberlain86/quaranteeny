/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface TimeState {
  gameSpeed: number;
}

const initialState: TimeState = {
  gameSpeed: 10,
};

export const timeSlice = createSlice({
  name: 'time',
  initialState,
  reducers: {
    changeGameSpeed: (state, action: PayloadAction<number>) => {
      state.gameSpeed = action.payload;
    },
  },
});

export const { changeGameSpeed } = timeSlice.actions;

export const selectGameSpeed = (state: RootState): number =>
  state.time.gameSpeed;

export default timeSlice.reducer;
