import { createSlice } from '@reduxjs/toolkit';
import { VocabularyTab, Word } from 'types/types';
import { RootState } from '../store';
import { Colors } from 'pages/vocabulary/vocabulary-words/words-view/words-levels/constants';

export interface WordsState {
  items: Word[];
  page: number;
  group: number;
  selectedWordId: string;
  selectedWordColor: Colors;
  selectedTab: number;
  isPlayingWord: boolean;
  error: null | string;
  status: string;
}

const initialState: WordsState = {
  items: [],
  page: Number(localStorage.getItem('page')) ?? 0,
  group: Number(localStorage.getItem('group')) ?? 0,
  selectedWordId: localStorage.getItem('selectedWordId') ?? '5e9f5ee35eb9e72bc21af4a4',
  selectedWordColor: localStorage.getItem('selectedWordColor') as Colors ?? 'elementary',
  selectedTab: Number(localStorage.getItem('selectedTab')) ?? VocabularyTab.VOCABULARY,
  isPlayingWord: false,
  error: null,
  status: 'idle'
};

export const wordsSlice = createSlice({
  name: 'words',
  initialState,
  reducers: {
    setGroup: (state, { payload: group }: { payload: number }) => {
      localStorage.setItem('group', group.toString());
      state.group = group;
    },
    setPage: (state, { payload: page }: { payload: number }) => {
      localStorage.setItem('page', page.toString());
      state.page = page;
    },
    setSelectedWordId: (state, { payload: id }: { payload: string }) => {
      localStorage.setItem('selectedWordId', id);
      state.selectedWordId = id;
    },
    setSelectedTab: (state, { payload: tab }: { payload: number }) => {
      localStorage.setItem('selectedTab', tab.toString());
      state.selectedTab = tab;
    },
    setSelectedWordColor: (state, { payload: color }: { payload: Colors }) => {
      localStorage.setItem('selectedWordColor', color);
      state.selectedWordColor = color;
    },
    setIsPlayingWord: (state, { payload: isPlaying }: { payload: boolean }) => {
      state.isPlayingWord = isPlaying;
    },
  }
});

export const selectWords = (state: RootState) => state.words;

export const {
  setGroup,
  setPage,
  setSelectedWordId,
  setSelectedTab,
  setSelectedWordColor,
  setIsPlayingWord,
} = wordsSlice.actions;

export default wordsSlice.reducer;
