import { createSlice } from '@reduxjs/toolkit';
import { Word } from '../../types/types';
import { RootState } from '../store';

export interface WordsState {
  items: Word[];
  error: null | string;
  status: string;
}

const initialState: WordsState = {
  items: [],
  error: null,
  status: 'idle'
};

export const wordsSlice = createSlice({
  name: 'words',
  initialState,
  reducers: {}
});

export const selectWords = (state: RootState) => state.words;

export default wordsSlice.reducer;
