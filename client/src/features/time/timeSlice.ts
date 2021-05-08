/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface TimeState {
  decayFrequency: number;
}

const initialState: TimeState = {
  decayFrequency: 5000,
};

export const timeSlice = createSlice({
  name: 'time',
  initialState,
  reducers: {
    changeDecayFrequency: (state, action: PayloadAction<number>) => {
      state.decayFrequency = action.payload;
    },
  },
});

export const { changeDecayFrequency } = timeSlice.actions;

export const selectDecayFrequency = (state: RootState): number =>
  state.time.decayFrequency;

export default timeSlice.reducer;
