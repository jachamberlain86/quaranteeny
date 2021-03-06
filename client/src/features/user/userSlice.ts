/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppDispatch, AppThunk } from '../../app/store';
import { fetchUserData, createUserInDb, updateUserInDb } from './userApi';
import { MetersState, loadMetersStateFromDb } from '../meters/metersSlice';
import { GameState, loadGameStateFromDb } from '../game/gameSlice';
import { SpriteState, loadSpriteStateFromDb } from '../sprite/spriteSlice';

export const fetchUserDataAsync = createAsyncThunk<
  {
    id: string;
    game: GameState;
    sprite: SpriteState;
    meters: MetersState;
  } | null,
  { dispatch: AppDispatch }
>('user/fetchUserData', async ({ dispatch }) => {
  const userData = await fetchUserData();
  if (userData) {
    const { meters, game, sprite, user } = userData;
    dispatch(loadMetersStateFromDb(meters));
    dispatch(loadGameStateFromDb(game));
    dispatch(loadSpriteStateFromDb(sprite));
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    dispatch(loadUserStateFromDb(user));
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    dispatch(startUpdatesToDb());
  }
  return userData;
});

export const createUserInDbAsync = createAsyncThunk<
  void,
  { dispatch: AppDispatch }
>('user/createUserInDb', async ({ dispatch }) => {
  const id = await createUserInDb();
  if (id) {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    dispatch(setUserId(id));
    localStorage.setItem('userId', id);
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    dispatch(startUpdatesToDb());
  }
});

export const updateUserInDbAsync = createAsyncThunk<
  void,
  { dispatch: AppDispatch; state: RootState }
>('user/updateUserInDb', async (_, { getState }) => {
  const { user, game, sprite, meters } = getState() as {
    user: UserState;
    game: GameState;
    sprite: SpriteState;
    meters: MetersState;
  };
  await updateUserInDb({
    id: user.userId,
    game,
    sprite,
    meters,
    user,
  });
});
export interface UserStateInDb {
  userName: string;
  scores: number[];
}
export interface UserState {
  userId: string;
  status: string;
  userName: string;
  scores: number[];
}

const initialState: UserState = {
  userId: '',
  status: 'notLoaded',
  userName: '',
  scores: [],
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addNewScore: (state, action: PayloadAction<number>) => {
      state.scores.push(action.payload);
    },
    loadUserStateFromDb: (state, action: PayloadAction<UserStateInDb>) => {
      state.userName = action.payload.userName;
      state.scores = action.payload.scores;
    },
    setUserId: (state, action: PayloadAction<string>) => {
      state.userId = action.payload;
    },
    setUserName: (state, action: PayloadAction<string>) => {
      state.userName = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserDataAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserDataAsync.fulfilled, (state) => {
        state.status = 'userLoaded';
      })
      .addCase(createUserInDbAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createUserInDbAsync.fulfilled, (state) => {
        state.status = 'userLoaded';
      });
  },
});

export const {
  setUserId,
  setUserName,
  loadUserStateFromDb,
  addNewScore,
} = userSlice.actions;

export const selectUser = (state: RootState): string => state.user.userId;
export const selectUserStatus = (state: RootState): string => state.user.status;
export const selectScores = (state: RootState): number[] => state.user.scores;

export const startUpdatesToDb = (): AppThunk => (dispatch, getState) => {
  setInterval(() => {
    const { user, game, sprite, meters } = getState() as {
      user: UserState;
      game: GameState;
      sprite: SpriteState;
      meters: MetersState;
    };
    if (user.userId) {
      updateUserInDb({
        id: user.userId,
        game,
        sprite,
        meters,
        user: { userName: user.userName, scores: user.scores },
      });
    }
  }, 5000);
};

export default userSlice.reducer;
