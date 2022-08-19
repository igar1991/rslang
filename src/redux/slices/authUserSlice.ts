import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchCreateUser, fetchLoginUser } from "../../api/authUser";
import { User } from "../../types/types";
import { RootState } from "../store";

export interface AuthState {
  isAuth:  boolean;
  id: string;
  email: string;
  refreshToken: string;
  token: string;
  error: null | string;
  status: string;

}

const initialState: AuthState = {
    isAuth:  false,
    id: "",
    email: "",
    refreshToken: "",
    token: "",
    error: null,
    status: "idle"
};

export const createUser = createAsyncThunk(
    "auth/fetchCreateUser",
    async (user: User) => {
        const response = await fetchCreateUser(user);
        return response;
    }
);

export const loginUser = createAsyncThunk(
    "auth/fetchLoginUser",
    async (user: User) => {
        const response = await fetchLoginUser(user);
        console.log("1");
        return response;
    }
);

export const authUserSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {

    },
    extraReducers: (bulder)=>{
        bulder
            .addCase(createUser.pending, (state) => {
                state.status = "loading";
            })
            .addCase(createUser.fulfilled, (state, action) => {
                state.status = "idle";
                state.email = action.payload.email;
                state.id = action.payload.id;
                state.isAuth = true;
            })
            .addCase(createUser.rejected, (state) => {
                state.status = "failed";
            })
            .addCase(loginUser.pending, (state) => {
                state.status = "loading";
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.status = "idle";
                state.token = action.payload.token;
                state.id = action.payload.userId;
                state.refreshToken = action.payload.refreshToken;
                state.isAuth = true;
            })
            .addCase(loginUser.rejected, (state) => {
                state.status = "failed";
            });
    }
});

export const selectAuth = (state: RootState) => state.auth;

export default authUserSlice.reducer;