import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

export interface AudioCallState {
  page: number;
  group: number;
  selectedWordId: string;
  error: null | string;
  status: string;
  stage: 'start' | 'pending' | 'result';
  currentWord: number
}

const initialState: AudioCallState = {
  page: 0,
  group: 0,
  currentWord: 0, 
  selectedWordId: '5e9f5ee35eb9e72bc21af4a4',
  error: null,
  status: 'idle',
  stage: 'start'
};


export const audioCallSlice = createSlice({
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
    setSelectedWordId: (state, { payload: id } : { payload: string }) => {
      state.selectedWordId = id;
    },
    setCurrentWord: (state, { payload: index } : { payload: number }) => {
      state.currentWord = index;
    },
  }
});

export const selectAudio = (state: RootState) => state.audio;

export const { setGroup, setPage, setSelectedWordId, setStage, setCurrentWord } = audioCallSlice.actions;

export default audioCallSlice.reducer;