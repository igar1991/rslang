import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { api } from '../api/api';
import audioCallSlice from './slices/audioCallSlice';
import authUserSlice from './slices/authUserSlice';
import wordsSlice from './slices/wordsSlice';

export const store = configureStore({
  reducer: {
    words: wordsSlice,
    auth: authUserSlice,
    audio: audioCallSlice,
    [api.reducerPath]: api.reducer
  },
  middleware: (getDefaultMiddleware)=>getDefaultMiddleware().concat(api.middleware)
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
