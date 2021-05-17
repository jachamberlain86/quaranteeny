import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

interface musicSlice {
  currentSong: string;
  isSongMuted: boolean;
  currentSongIndex: number;
}

const initialState = {
  currentSong: '',
  isSongMuted: false,
  currentSongIndex: 0,
};

const musicSlice = createSlice({
  name: 'music',
  initialState,
  reducers: {
    resetMusic: () => initialState,
    setCurrentSong(state, action: PayloadAction<string>) {
      // TODO ask TA why?!
      // eslint-disable-next-line no-param-reassign
      state.currentSong = action.payload;
    },
    setIsSongMuted(state, action: PayloadAction<boolean>) {
      // eslint-disable-next-line no-param-reassign
      state.isSongMuted = action.payload;
    },
    setCurrentSongIndex(state, action: PayloadAction<number>) {
      // eslint-disable-next-line no-param-reassign
      state.currentSongIndex = action.payload;
    },
  },
});

export const {
  resetMusic,
  setCurrentSong,
  setIsSongMuted,
  setCurrentSongIndex,
} = musicSlice.actions;

export const selectCurrentSong = (state: RootState): string =>
  state.music.currentSong;
export const selectIsSongMuted = (state: RootState): boolean =>
  state.music.isSongMuted;
export const selectCurrentSongIndex = (state: RootState): number =>
  state.music.currentSongIndex;

export default musicSlice.reducer;
