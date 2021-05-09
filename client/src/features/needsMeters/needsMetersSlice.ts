/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { needsMeters } from '../../data/needsMeters.data';

export interface NeedsMetersState {
  hunger: number;
  energy: number;
  health: number;
  money: number;
}

const initialState: NeedsMetersState = {
  hunger: 1000,
  energy: 2000,
  health: 1000,
  money: 1000,
};

export const needsMetersSlice = createSlice({
  name: 'needsMeters',
  initialState,
  reducers: {
    changeByAmount: (
      state,
      action: PayloadAction<{ name: string; amount: number }>
    ) => {
      state[action.payload.name as keyof NeedsMetersState] +=
        action.payload.amount;
      if (state[action.payload.name as keyof NeedsMetersState] < 0)
        state[action.payload.name as keyof NeedsMetersState] = 0;
      if (
        state[action.payload.name as keyof NeedsMetersState] >
        needsMeters[action.payload.name].max
      )
        state[action.payload.name as keyof NeedsMetersState] =
          needsMeters[action.payload.name].max;
    },
  },
});

export const { changeByAmount } = needsMetersSlice.actions;

export const selectNeedsMeters = (state: RootState): NeedsMetersState =>
  state.needsMeters;

export default needsMetersSlice.reducer;
