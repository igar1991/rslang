import { createSlice } from '@reduxjs/toolkit';
import { authAPI } from '../../api/authService';
import { RootState } from '../store';

export interface AuthState {
  isAuth: boolean;
  id: string;
  refreshToken: string | null;
  token: string | null;
  error: string | null;
  status: string;
  name: string | null;
}

const initialState: AuthState = {
  isAuth: false,
  id: '',
  refreshToken: null,
  token: null,
  error: null,
  status: 'idle',
  name: null,
};

export const authUserSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: () => {
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('userId');
      return initialState;
    },
  },
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
        state.name = action.payload.name;
        localStorage.setItem('token', action.payload.token);
        localStorage.setItem('refreshToken', action.payload.refreshToken);
        localStorage.setItem('userId', action.payload.userId);
      })
      .addMatcher(authAPI.endpoints.loginUser.matchRejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const selectAuth = (state: RootState) => state.auth;

export const { logout } = authUserSlice.actions;

export default authUserSlice.reducer;
