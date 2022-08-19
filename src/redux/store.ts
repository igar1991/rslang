import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import authUserSlice from './slices/authUserSlice';
import wordsSlice from './slices/wordsSlice';

export const store = configureStore({
  reducer: {
    words: wordsSlice,
    auth: authUserSlice
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
