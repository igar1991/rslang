import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchGetWords } from "../../api/getWords";
import { Word } from "../../types/types";
import { RootState } from "../store";

export interface WordsState {
  items: Word[];
  error: null | string;
  status: string;
}

const initialState: WordsState = {
    items: [],
    error: null,
    status: "idle"
};

export const getWords = createAsyncThunk(
    "words/fetchGetWords",
    async ({page, group}: {page: number, group: number}) => {
        const response = await fetchGetWords(page, group);
        return response;
    }
);

export const wordsSlice = createSlice({
    name: "words",
    initialState,
    reducers: {

    },
    extraReducers: (bulder)=>{
        bulder
            .addCase(getWords.pending, (state) => {
                state.status = "loading";
            })
            .addCase(getWords.fulfilled, (state, action) => {
                state.status = "idle";
                state.items = action.payload;
            })
            .addCase(getWords.rejected, (state) => {
                state.status = "failed";
            });
    }
});

export const selectWords = (state: RootState) => state.words;

export default wordsSlice.reducer;