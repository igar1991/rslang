import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import wordsSlice from "./slices/wordsSlice";

export const store = configureStore({
    reducer: {
        words: wordsSlice
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
