/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { meters } from '../../data/meters.data';

export interface MetersState {
  hunger: number;
  energy: number;
  health: number;
  money: number;
  fitness: number;
  mood: number;
  hygeine: number;
  comfort: number;
  connection: number;
  attention: number;
  freedom: number;
  motivation: number;
  appetite: number;
  mind: number;
}

const initialState: MetersState = {
  hunger: 1000,
  energy: 2000,
  health: 1000,
  money: 1000,
  fitness: 1000,
  mood: 1000,
  hygeine: 1000,
  comfort: 1000,
  connection: 1000,
  attention: 1000,
  freedom: 1000,
  motivation: 1000,
  appetite: 1000,
  mind: 1000,
};

export const metersSlice = createSlice({
  name: 'meters',
  initialState,
  reducers: {
    changeByAmount: (
      state,
      action: PayloadAction<{ name: string; amount: number }>
    ) => {
      state[action.payload.name as keyof MetersState] += action.payload.amount;
      if (state[action.payload.name as keyof MetersState] < 0)
        state[action.payload.name as keyof MetersState] = 0;
      if (
        state[action.payload.name as keyof MetersState] >
        meters[action.payload.name].max
      )
        state[action.payload.name as keyof MetersState] =
          meters[action.payload.name].max;
    },
  },
});

export const { changeByAmount } = metersSlice.actions;

export const selectMeters = (state: RootState): MetersState => state.meters;

export default metersSlice.reducer;
