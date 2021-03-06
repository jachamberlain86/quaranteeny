import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import metersReducer from '../features/meters/metersSlice';
import gameReducer from '../features/game/gameSlice';
import spriteReducer from '../features/sprite/spriteSlice';
import userReducer from '../features/user/userSlice';
import characterReducer from '../features/character/characterSlice';
import musicReducer from '../features/music/musicSlice';

export const store = configureStore({
  reducer: {
    game: gameReducer,
    sprite: spriteReducer,
    meters: metersReducer,
    user: userReducer,
    character: characterReducer,
    music: musicReducer,
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
