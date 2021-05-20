/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction, current } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface SpriteState {
  currentInteraction: string;
  interactionProgress: number | null;
  interactionChangesRemaining: number;
  conditions: string[];
  objectsNearBy: string[];
  currentThought: string;
}

const initialState: SpriteState = {
  currentInteraction: 'idle',
  interactionProgress: null,
  interactionChangesRemaining: 0,
  conditions: [],
  objectsNearBy: [],
  currentThought: '"..."',
};

export const spriteSlice = createSlice({
  name: 'sprite',
  initialState,
  reducers: {
    resetSprite: () => initialState,
    changeInteraction: (state, action: PayloadAction<string>) => {
      state.currentInteraction = action.payload;
      state.interactionChangesRemaining = 0;
    },
    decrementInteractionChangesRemaining: (state) => {
      state.interactionChangesRemaining -= 1;
    },
    setInteractionChangesRemaining: (state, action: PayloadAction<number>) => {
      state.interactionChangesRemaining = action.payload;
    },
    addCondition: (state, action: PayloadAction<string>) => {
      state.conditions.push(action.payload);
    },
    removeCondition: (state, action: PayloadAction<string>) => {
      state.conditions = state.conditions.filter(
        (condition) => condition !== action.payload
      );
    },

    setInteractionProgress: (state, action: PayloadAction<number | null>) => {
      state.interactionProgress = action.payload;
    },
    loadSpriteStateFromDb: (state, action: PayloadAction<SpriteState>) => {
      state.currentInteraction = action.payload.currentInteraction;
      state.interactionProgress = action.payload.interactionProgress;
      state.interactionChangesRemaining =
        action.payload.interactionChangesRemaining;
      state.conditions = action.payload.conditions;
    },
    updateObjectsNearBy: (state, action: PayloadAction<string[]>) => {
      state.objectsNearBy = action.payload;
    },
    updateCurrentThought: (state) => {
      const conditionsArr = current(state.conditions);

      if (conditionsArr.length) {
        const maxIndex = conditionsArr.length;
        const randomIdx = Math.floor(Math.random() * maxIndex);
        const condition = conditionsArr[randomIdx];

        if (condition === 'asleep')
          state.currentThought = '"zzzz…" *snort* "whazzat? …zzzzz"';
        if (condition === 'washing')
          state.currentThought = '"scrub scrub scrub"';
        if (condition === 'relaxing')
          state.currentThought = '"ahhh... that\'s better"';
        if (condition === 'working')
          state.currentThought = '"I hate spreadsheets"';
        if (condition === 'cleaning')
          state.currentThought = '"where does this rubbish keep coming from?"';
        if (condition === 'cooking')
          state.currentThought = '"mmmm... smells good"';
        if (condition === 'snacking') state.currentThought = '"om nom nom"';
        if (condition === 'watering')
          state.currentThought = '"hang on in there señor plant"';
        if (condition === 'wallowing')
          state.currentThought = '"I\'ll just sit here and wallow for a bit"';
        if (condition === 'hungry')
          state.currentThought = '"my stomach\'s grumbling"';
        if (condition === 'overfed')
          state.currentThought = '"urgh... I\'m stuffed"';
        if (condition === 'starved')
          state.currentThought = '"I reaaaaally need to eat"';
        if (condition === 'lethargic')
          state.currentThought = '"maybe I should just stay in bed..."';
        if (condition === 'exhausted')
          state.currentThought = '*yawn* "I\'m shattered"';
        if (condition === 'delirious')
          state.currentThought = '"is it me or are the walls moving?"';
        if (condition === 'unwell')
          state.currentThought = '*sniff* "I feel rough"';
        if (condition === 'hardy')
          state.currentThought = '"I AM INVINCIBLEEEEE!"';
        if (condition === 'feverish')
          state.currentThought = '*shiver* "I don\'t feel good"';
        if (condition === 'broke')
          state.currentThought = '"who keeps spending all my cash?"';
        if (condition === 'rich')
          state.currentThought = '"money money money monnnney... money!"';
        if (condition === 'unfit')
          state.currentThought = '*pant pant* "I should start jogging"';
        if (condition === 'injured')
          state.currentThought = '"ow! I thinkk I pulled something"';
        if (condition === 'depressed') state.currentThought = '"..." *sigh*';
        if (condition === 'ecstatic')
          state.currentThought = '"everything is awesome!"';
        if (condition === 'filthy')
          state.currentThought = '"ewww... I can smell myself"';
        if (condition === 'anal')
          state.currentThought = '"did somebody move my pixels?"';
        if (condition === 'achey') state.currentThought = '"oof... my back..."';
        if (condition === 'cosy')
          state.currentThought = '"mmmm... this is nice"';
        if (condition === 'lonely')
          state.currentThought = '"I miss my friends"';
        if (condition === 'dependent')
          state.currentThought = '"I should be more independent"';
        if (condition === 'bored') state.currentThought = '"borrrrrinnnnng..."';
        if (condition === 'overstimulated')
          state.currentThought = '"it\'s all too much!"';
        if (condition === 'trapped')
          state.currentThought = '"I need to get out!"';
        if (condition === 'wild')
          state.currentThought = '"I don\'t care, I do what I want!"';
        if (condition === 'apathetic')
          state.currentThought = '"does anything even matter anymore?"';
        if (condition === 'ambitious')
          state.currentThought = '"I should learn to code..."';
        if (condition === 'nauseous')
          state.currentThought = '*gag* "I think I\'m gonna be sick"';
        if (condition === 'greedy')
          state.currentThought = '"maybe just one more snack..."';
        if (condition === 'unstable')
          state.currentThought = '"AHAHAHAHA... I\'m fine..." *sob*';
        if (condition === 'enlightened')
          state.currentThought = '"the only real prison is your mind"';
      } else {
        const defaultThoughts = [
          '*whistles*',
          '"maybe i should buy a boat..."',
          '"she shell- see shells- ah forget it"',
          '"damn those crabs..."',
          '"i wonder if they still make chocolate pretzels..."',
          '"do fish have dreams?"',
          '"cats are cool"',
        ];
        const maxIndex = defaultThoughts.length;
        const randomIdx = Math.floor(Math.random() * maxIndex);
        const condition = defaultThoughts[randomIdx];
        state.currentThought = condition;
      }
    },
  },
});

export const {
  resetSprite,
  changeInteraction,
  decrementInteractionChangesRemaining,
  setInteractionChangesRemaining,
  addCondition,
  removeCondition,
  updateObjectsNearBy,
  setInteractionProgress,
  loadSpriteStateFromDb,
  updateCurrentThought,
} = spriteSlice.actions;

export const selectSprite = (state: RootState): SpriteState => state.sprite;

export const selectConditions = (state: RootState): string[] =>
  state.sprite.conditions;

export const selectCurrentInteraction = (state: RootState): string =>
  state.sprite.currentInteraction;
export const selectInteractionProgress = (state: RootState): number | null =>
  state.sprite.interactionProgress;
export const selectInteractionChangesRemaining = (state: RootState): number =>
  state.sprite.interactionChangesRemaining;
export const selectCurrentThought = (state: RootState): string =>
  state.sprite.currentThought;

export default spriteSlice.reducer;
