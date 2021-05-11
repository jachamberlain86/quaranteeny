/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState, AppDispatch } from '../../app/store';
import { fetchUserData } from './userApi';
import { setMeters } from '../meters/metersSlice';

export const fetchUserDataAsync = createAsyncThunk<
  void,
  { dispatch: AppDispatch }
>(
  'user/fetchUserData',
  // The value we return becomes the `fulfilled` action payload
  async ({ dispatch }) => {
    const userData = await fetchUserData();
    if (userData) dispatch(setMeters(userData));
  }
);

export interface UserState {
  userId: string;
}

const initialState: UserState = {
  userId: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
});

export const selectUser = (state: RootState): string => state.user.userId;

export default userSlice.reducer;
