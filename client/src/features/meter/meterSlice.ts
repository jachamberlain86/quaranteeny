/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';
import { selectDecayFrequency } from '../time/timeSlice';

export interface MeterState {
  food: number;
  energy: number;
  money: number;
}

const initialState: MeterState = {
  food: 50,
  energy: 50,
  money: 50,
};

export const meterSlice = createSlice({
  name: 'meter',
  initialState,
  reducers: {
    changeByAmount: (
      state,
      action: PayloadAction<{ name: string; amount: number }>
    ) => {
      state[action.payload.name as keyof MeterState] += action.payload.amount;
      if (state[action.payload.name as keyof MeterState] < 0)
        state[action.payload.name as keyof MeterState] = 0;
      if (state[action.payload.name as keyof MeterState] > 100)
        state[action.payload.name as keyof MeterState] = 100;
    },
  },
});

export const { changeByAmount } = meterSlice.actions;

export const selectMeter = (state: RootState): MeterState => state.meter;

export const decayMeter = (meterObj: {
  name: string;
  amount: number;
}): AppThunk => (dispatch, getState) => {
  const { name, amount } = meterObj;
  const decayFrequency = selectDecayFrequency(getState());
  const timer = setInterval(() => {
    const meters = selectMeter(getState());
    const currentValue = meters[name as keyof MeterState];
    if (currentValue > 0) {
      dispatch(changeByAmount({ name, amount }));
    }
    if (currentValue <= 0) {
      clearInterval(timer);
    }
  }, decayFrequency);
};

export default meterSlice.reducer;
