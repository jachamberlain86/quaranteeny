/* eslint-disable no-param-reassign */
import _ from 'lodash';
import { createSlice, PayloadAction, current } from '@reduxjs/toolkit';
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
    resetMeters: () => initialState,
    increaseValueScaled: (state, action: PayloadAction<MeterChange>) => {
      const meter = state[action.payload.name as keyof MetersState];
      const incRate = selectIncRate(state, action.payload.name);
      meter.value += Math.round(action.payload.amount * (incRate / 100));
      if (meter.value > meters[action.payload.name].max)
        meter.value = meters[action.payload.name].max;
    },
    decreaseValueScaled: (state, action: PayloadAction<MeterChange>) => {
      const decRate = selectDecRate(state, action.payload.name);
      const meter = state[action.payload.name as keyof MetersState];
      meter.value += Math.round(action.payload.amount * (decRate / 100));
      if (meter.value < 0) meter.value = 0;
    },
    changeValueFixed: (state, action: PayloadAction<MeterChange>) => {
      const meter = state[action.payload.name as keyof MetersState];
      meter.value += action.payload.amount;
      if (meter.value < 0) meter.value = 0;
      if (meter.value > meters[action.payload.name].max)
        meter.value = meters[action.payload.name].max;
    },
    addModifier: (state, action: PayloadAction<MeterModifier>) => {
      const meter = state[action.payload.meter as keyof MetersState];
      if (action.payload.incRateModifier) {
        const modifier = action.payload.incRateModifier;
        meter.incRate =
          modifier > 0
            ? meter.incRate * modifier
            : meter.incRate / Math.abs(modifier);
      }
      if (action.payload.decRateModifier) {
        const modifier = action.payload.decRateModifier;
        meter.decRate =
          modifier > 0
            ? meter.decRate * modifier
            : meter.decRate / Math.abs(modifier);
      }
      if (meter.decRate <= 0) meter.decRate = 0.1;
      if (meter.decRate > 1000) meter.decRate = 1000;
      if (meter.incRate <= 0) meter.incRate = 0.1;
      if (meter.incRate > 1000) meter.incRate = 1000;
    },
    removeModifier: (state, action: PayloadAction<MeterModifier>) => {
      const meter = state[action.payload.meter as keyof MetersState];
      if (action.payload.incRateModifier) {
        const modifier = action.payload.incRateModifier;
        meter.incRate =
          modifier > 0
            ? meter.incRate / modifier
            : meter.incRate * Math.abs(modifier);
      }
      meter.incRate -= action.payload.incRateModifier;
      if (action.payload.decRateModifier) {
        const modifier = action.payload.decRateModifier;
        meter.decRate =
          modifier > 0
            ? meter.decRate / modifier
            : meter.decRate * Math.abs(modifier);
      }
      if (meter.decRate <= 0) meter.decRate = 0.1;
      if (meter.decRate > 1000) meter.decRate = 1000;
      if (meter.incRate <= 0) meter.incRate = 0.1;
      if (meter.incRate > 1000) meter.incRate = 1000;
    },
    loadMetersStateFromDb: (state, action: PayloadAction<MetersState>) => {
      _.forEach(action.payload, (value, key) => {
        state[key as keyof MetersState] = value;
      });
    },
    pauseDecayOn: (state, action: PayloadAction<string>) => {
      const meter = state[action.payload as keyof MetersState];
      meter.pauseDecay = true;
    },
    pauseDecayOff: (state, action: PayloadAction<string>) => {
      const meter = state[action.payload as keyof MetersState];
      meter.pauseDecay = false;
    },
    resetMeterPauseDecayToInit: (state, action: PayloadAction<string>) => {
      const meter = state[action.payload as keyof MetersState];
      const meterInitial = initialState[action.payload as keyof MetersState];
      meter.pauseDecay = meterInitial.pauseDecay;
    },
  },
});

export const {
  resetMeters,
  increaseValueScaled,
  decreaseValueScaled,
  changeValueFixed,
  addModifier,
  removeModifier,
  loadMetersStateFromDb,
  pauseDecayOn,
  pauseDecayOff,
  resetMeterPauseDecayToInit,
} = metersSlice.actions;

export const changeValueScaled = (meterChange: MeterChange): AppThunk => (
  dispatch
) => {
  if (meterChange.amount > 0) dispatch(increaseValueScaled(meterChange));
  else if (meterChange.amount < 0) dispatch(decreaseValueScaled(meterChange));
};

export default metersSlice.reducer;
