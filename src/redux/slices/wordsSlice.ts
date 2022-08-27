import { createSlice } from '@reduxjs/toolkit';
import { VocabularyTab, Word } from '../../types/types';
import { RootState } from '../store';
import { Colors } from '../../pages/vocabulary/vocabulary-words/words-view/words-levels/constants';

export interface WordsState {
  items: Word[];
  page: number;
  group: number;
  selectedWordId: string;
  selectedWordColor: Colors;
  selectedTab: number;
  usersHardWords: Word[];
  error: null | string;
  status: string;
}

const initialState: WordsState = {
  items: [],
  page: 0,
  group: 0,
  selectedWordId: '5e9f5ee35eb9e72bc21af4a4',
  selectedWordColor: 'elementary',
  selectedTab: VocabularyTab.VOCABULARY,
  usersHardWords: [],
  error: null,
  status: 'idle'
};

const markWordAsHardReducer = (state: WordsState, { payload: word }: { payload: Word }) => {
  const hardWordIds = state.usersHardWords.map(({ id }) => id);

  if (hardWordIds.includes(word.id)) {
    return;
  }

  state.usersHardWords.push(word);
};

export const wordsSlice = createSlice({
  name: 'words',
  initialState,
  reducers: {
    setGroup: (state, { payload: group }: { payload: number }) => {
      state.group = group;
    },
    setPage: (state, { payload: page }: { payload: number }) => {
      state.page = page;
    },
    setSelectedWordId: (state, { payload: id }: { payload: string }) => {
      state.selectedWordId = id;
    },
    setSelectedTab: (state, { payload: tab }: { payload: number }) => {
      state.selectedTab = tab;
    },
    setSelectedWordColor: (state, { payload: color }: { payload: Colors }) => {
      state.selectedWordColor = color;
    },
    markWordAsHard: markWordAsHardReducer
  }
});

export const selectWords = (state: RootState) => state.words;

export const {
  setGroup,
  setPage,
  setSelectedWordId,
  setSelectedTab,
  setSelectedWordColor,
  markWordAsHard
} = wordsSlice.actions;

export default wordsSlice.reducer;
