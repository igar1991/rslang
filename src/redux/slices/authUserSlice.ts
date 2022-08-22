import { createSlice } from '@reduxjs/toolkit';
import { authAPI } from '../../api/authService';
import { RootState } from '../store';

export interface AuthState {
  isAuth: boolean;
  id: string;
  refreshToken: string | null;
  token: string | null;
  error: null | string;
  status: string;

}

const initialState: AuthState = {
  isAuth: false,
  id: '',
  refreshToken: null,
  token: null,
  error: null,
  status: 'idle'
};

export const authUserSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (bulder) => {
    bulder
      .addMatcher(authAPI.endpoints.loginUser.matchPending, (state) => {
        state.status = 'loading';
      })
      .addMatcher(authAPI.endpoints.loginUser.matchFulfilled, (state, action) => {
        state.status = 'idle';
        state.token = action.payload.token;
        state.id = action.payload.userId;
        state.refreshToken = action.payload.refreshToken;
        state.isAuth = true;
      })
      .addMatcher(authAPI.endpoints.loginUser.matchRejected, (state) => {
        state.status = 'failed';
      });
  }
});

export const selectAuth = (state: RootState) => state.auth;

export default authUserSlice.reducer;
