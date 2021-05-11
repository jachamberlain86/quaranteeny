/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { Character } from '../../interfaces/character.interface';

const initialState: Character = {
  tileFrom: [1, 1],
  tileTo: [1, 1],
  timeMoved: 0,
  dimensions: [40, 40],
  position: [45, 45],
  delayMove: 700,
  direction: 'left',
};

const characterSlice = createSlice({
  name: 'character',
  initialState,
  reducers: {
    placeAt(state, action) {
      const [x, y] = action.payload;
      state.tileFrom = [x, y];
      state.tileTo = [x, y];
    },
  },
});

// export const player = (state: RootState): Character => state.character;

export const { placeAt } = characterSlice.actions;
export default characterSlice.reducer;
