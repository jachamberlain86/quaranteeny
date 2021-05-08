import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import meterReducer from '../features/meter/meterSlice';
import timeReducer from '../features/time/timeSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    meter: meterReducer,
    time: timeReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
