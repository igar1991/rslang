import { createSlice } from '@reduxjs/toolkit';
import { Word } from '../../types/types';
import { RootState } from '../store';

export interface GamesSlice {
  page: number;
  group: number;
  error: null | string;
  status: string;
  stage: 'start' | 'pending' | 'result';
  currentWord: number;
  trueAnswers: Word[];
  falseAnswers: Word[];
}

const initialState: GamesSlice = {
  page: 0,
  group: 0,
  currentWord: 0, 
  trueAnswers: [],
  falseAnswers: [],
  error: null,
  status: 'idle',
  stage: 'start'
};


export const gamesSlice = createSlice({
  name: 'audio',
  initialState,
  reducers: {
    setGroup: (state, { payload: group }: { payload: number }) => {
      state.group = group;
    },
    setPage: (state, { payload: page } : { payload: number }) => {
      state.page = page;
    },
    setStage: (state, { payload: stage } : { payload: 'start' | 'pending' | 'result' }) => {
      state.stage = stage;
    },
    setCurrentWord: (state, { payload: index } : { payload: number }) => {
      state.currentWord = index;
    },
    setTrueAnswers: (state, { payload: word } : { payload: Word }) => {
      state.trueAnswers = [...state.trueAnswers, word];
    },
    setFalseAnswers: (state, { payload: word } : { payload: Word }) => {
      state.falseAnswers = [...state.falseAnswers, word];
    },
    clearGame: () => initialState,
  }
});

export const selectGames = (state: RootState) => state.games;

export const { setGroup, setPage, setStage, setCurrentWord, setTrueAnswers, setFalseAnswers, clearGame } = gamesSlice.actions;

export default gamesSlice.reducer;