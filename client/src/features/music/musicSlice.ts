import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import {
  musicController,
  playListArr,
} from '../../audioControllers/musicController';

// const howlFile = musicController.findHowlFileFromTitle('connected');
// console.log('howlFile', howlFile);
// const firstSong = howlFile
//   ? musicController.findTitleOfCurrentSong(playListArr[0][1])
//   : 'No song loaded';
// const firstSong = firstSongTitle || 'No song loaded';
const firstSong = musicController.findSongTitleFromHowlFile(playListArr[3][1]);
musicController.findHowlFileFromTitle('connected');
const howlFile = firstSong
  ? musicController.findHowlFileFromTitle('connected')
  : playListArr[0][1];

interface musicSlice {
  currentSong: string;
  isSongMuted: boolean;
  currentSongIndex: number;
}

const initialState = {
  currentSong: firstSong || 'No song loaded',
  isSongMuted: false,
  currentSongIndex: 0,
};

const musicSlice = createSlice({
  name: 'music',
  initialState,
  reducers: {
    resetMusic: () => initialState,
    setCurrentSong(state, action: PayloadAction<string>) {
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
