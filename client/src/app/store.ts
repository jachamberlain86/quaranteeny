import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import needsMetersReducer from '../features/needsMeters/needsMetersSlice';
import timeReducer from '../features/time/timeSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    time: timeReducer,
    needsMeters: needsMetersReducer,
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
