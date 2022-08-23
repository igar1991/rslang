import { createSlice } from '@reduxjs/toolkit';
import { Word } from '../../types/types';
import { RootState } from '../store';

export interface WordsState {
  items: Word[];
  page: number;
  group: number;
  selectedWordId: string;
  error: null | string;
  status: string;
}

const initialState: WordsState = {
  items: [],
  page: 0,
  group: 0,
  selectedWordId: '5e9f5ee35eb9e72bc21af4a4',
  error: null,
  status: 'idle'
};


export const wordsSlice = createSlice({
  name: 'words',
  initialState,
  reducers: {
    setGroup: (state, { payload: group }: { payload: number }) => {
      state.group = group;
    },
    setPage: (state, { payload: page } : { payload: number }) => {
      state.page = page;
    },
    setSelectedWordId: (state, { payload: id } : { payload: string }) => {
      state.selectedWordId = id;
    },
  }
});

export const selectWords = (state: RootState) => state.words;

export const { setGroup, setPage, setSelectedWordId } = wordsSlice.actions;

export default wordsSlice.reducer;
