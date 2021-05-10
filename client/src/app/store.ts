import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import metersReducer from '../features/meters/metersSlice';
import gameReducer from '../features/game/gameSlice';
import spriteReducer from '../features/sprite/spriteSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    game: gameReducer,
    sprite: spriteReducer,
    meters: metersReducer,
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
