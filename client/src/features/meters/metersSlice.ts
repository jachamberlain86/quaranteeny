/* eslint-disable no-param-reassign */
import _ from 'lodash';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';
import { meters } from '../../data/meters.data';
import { MeterChange } from '../../interfaces/meterChange.interface';
import { MeterState } from '../../interfaces/meterState.interface';
import { MeterModifier } from '../../interfaces/meterModifier.interface';

export interface MetersState {
  hunger: MeterState;
  energy: MeterState;
  health: MeterState;
  money: MeterState;
}

const initialState: MetersState = {
  hunger: {
    value: 1000,
    incRate: 100,
    decRate: 100,
  },
  energy: {
    value: 2000,
    incRate: 100,
    decRate: 100,
  },
  health: {
    value: 1000,
    incRate: 100,
    decRate: 100,
  },
  money: {
    value: 1000,
    incRate: 100,
    decRate: 100,
  },
};

export const selectMeters = (state: RootState): MetersState => state.meters;

export const selectDecRate = (state: MetersState, meter: string): number =>
  state[meter as keyof MetersState].decRate;

export const selectIncRate = (state: MetersState, meter: string): number =>
  state[meter as keyof MetersState].incRate;

export const metersSlice = createSlice({
  name: 'meters',
  initialState,
  reducers: {
    increaseMeter: (state, action: PayloadAction<MeterChange>) => {
      const incRate = selectIncRate(state, action.payload.name);
      const meter = state[action.payload.name as keyof MetersState];
      meter.value += Math.round(action.payload.amount * (incRate / 100));
      if (meter.value > meters[action.payload.name].max)
        meter.value = meters[action.payload.name].max;
    },
    decreaseMeter: (state, action: PayloadAction<MeterChange>) => {
      const decRate = selectDecRate(state, action.payload.name);
      const meter = state[action.payload.name as keyof MetersState];
      meter.value += Math.round(action.payload.amount * (decRate / 100));
      if (meter.value < 0) meter.value = 0;
    },
    addModifier: (state, action: PayloadAction<MeterModifier>) => {
      const meter = state[action.payload.meter as keyof MetersState];
      if (action.payload.incRateModifier)
        meter.incRate += action.payload.incRateModifier;
      if (action.payload.decRateModifier)
        meter.decRate += action.payload.decRateModifier;
      if (meter.decRate < 0) meter.decRate = 0;
      if (meter.decRate > 1000) meter.decRate = 1000;
      if (meter.incRate < 0) meter.incRate = 0;
      if (meter.incRate > 1000) meter.incRate = 1000;
    },
    removeModifier: (state, action: PayloadAction<MeterModifier>) => {
      const meter = state[action.payload.meter as keyof MetersState];
      if (action.payload.incRateModifier)
        meter.incRate -= action.payload.incRateModifier;
      if (action.payload.decRateModifier)
        meter.decRate -= action.payload.decRateModifier;
      if (meter.decRate < 0) meter.decRate = 0;
      if (meter.decRate > 1000) meter.decRate = 1000;
      if (meter.incRate < 0) meter.incRate = 0;
      if (meter.incRate > 1000) meter.incRate = 1000;
    },
    setMeters: (state, action: PayloadAction<MetersState>) => {
      _.forEach(action.payload, (value, key) => {
        state[key as keyof MetersState] = value;
      });
    },
  },
});

export const {
  increaseMeter,
  decreaseMeter,
  addModifier,
  removeModifier,
  setMeters,
} = metersSlice.actions;

export const changeByAmount = (meterChange: MeterChange): AppThunk => (
  dispatch
) => {
  if (meterChange.amount > 0) dispatch(increaseMeter(meterChange));
  else if (meterChange.amount < 0) dispatch(decreaseMeter(meterChange));
};

export default metersSlice.reducer;
