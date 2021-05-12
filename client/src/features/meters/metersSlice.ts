/* eslint-disable no-param-reassign */
import _ from 'lodash';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';
import { meters } from '../../data/meters.data';
import { MeterChange } from '../../interfaces/meterChange.interface';
import { MeterState } from '../../interfaces/meterState.interface';
import { MeterModifier } from '../../interfaces/meterModifier.interface';
import { metersStateBuilder } from '../../data/metersStateBuilder.data';

export interface MetersState {
  hunger: MeterState;
  energy: MeterState;
  health: MeterState;
  money: MeterState;
  fitness: MeterState;
  mood: MeterState;
  hygeine: MeterState;
  comfort: MeterState;
  connection: MeterState;
  engagement: MeterState;
  freedom: MeterState;
  motivation: MeterState;
  appetite: MeterState;
  mind: MeterState;
}

const initialState: MetersState = {
  hunger: metersStateBuilder.hunger,
  energy: metersStateBuilder.energy,
  health: metersStateBuilder.health,
  money: metersStateBuilder.money,
  fitness: metersStateBuilder.fitness,
  mood: metersStateBuilder.mood,
  hygeine: metersStateBuilder.hygeine,
  comfort: metersStateBuilder.comfort,
  connection: metersStateBuilder.connection,
  engagement: metersStateBuilder.engagement,
  freedom: metersStateBuilder.freedom,
  motivation: metersStateBuilder.motivation,
  appetite: metersStateBuilder.appetite,
  mind: metersStateBuilder.mind,
};

export const selectMeters = (state: RootState): MetersState => state.meters;

export const selectMeterValue = (state: RootState, meter: string): number =>
  state.meters[meter as keyof MetersState].value;

const selectDecRate = (state: MetersState, meter: string): number =>
  state[meter as keyof MetersState].decRate;

const selectIncRate = (state: MetersState, meter: string): number =>
  state[meter as keyof MetersState].incRate;

export const selectPauseDecay = (state: RootState, meter: string): boolean =>
  state.meters[meter as keyof MetersState].pauseDecay;

export const metersSlice = createSlice({
  name: 'meters',
  initialState,
  reducers: {
    increaseMeter: (state, action: PayloadAction<MeterChange>) => {
      const meter = state[action.payload.name as keyof MetersState];
      const incRate = selectIncRate(state, action.payload.name);
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
    loadMetersStateFromDb: (state, action: PayloadAction<MetersState>) => {
      _.forEach(action.payload, (value, key) => {
        state[key as keyof MetersState] = value;
      });
    },
    togglePauseDecay: (state, action: PayloadAction<string>) => {
      const meter = state[action.payload as keyof MetersState];
      meter.pauseDecay = !meter.pauseDecay;
    },
  },
});

export const {
  increaseMeter,
  decreaseMeter,
  addModifier,
  removeModifier,
  loadMetersStateFromDb,
  togglePauseDecay,
} = metersSlice.actions;

export const changeByAmount = (meterChange: MeterChange): AppThunk => (
  dispatch
) => {
  if (meterChange.amount > 0) dispatch(increaseMeter(meterChange));
  else if (meterChange.amount < 0) dispatch(decreaseMeter(meterChange));
};

export default metersSlice.reducer;
