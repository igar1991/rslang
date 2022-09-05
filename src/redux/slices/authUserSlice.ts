import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { authAPI } from '../../api/authService';
import { RootState } from '../store';

export interface AuthState {
  isAuth: boolean;
  createStatistic: boolean;
  id: string;
  refreshToken: string | null;
  token: string | null;
  error: string | null;
  status: string;
  name: string | null;
}

const initialState: AuthState = {
  isAuth: !!localStorage.getItem('userId'),
  createStatistic: true,
  id: localStorage.getItem('userId') || '',
  refreshToken: localStorage.getItem('refreshToken') || null,
  token: localStorage.getItem('token') || null,
  error: null,
  status: 'idle',
  name: localStorage.getItem('name') || null,
};

export const getNewTokenAsync = createAsyncThunk(
  'counter/fetchCount',
  async ({refreshToken, id}: {refreshToken: string; id: string}) => {
    const response = await fetch(`https://rslanglishbe.herokuapp.com/users/${id}/tokens`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    });
    const data = await response.json();
    return data;
  }
);

export const authUserSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: () => {
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('userId');
      localStorage.removeItem('name');
      localStorage.removeItem('selectedTab');
      return {
        isAuth: false,
        createStatistic: true,
        id: '',
        refreshToken: null,
        token: null,
        error: null,
        status: 'idle',
        name: null,
      };
    },
    changeName: (state, { payload: newName }: { payload: string }) => {
      state.name = newName;
    },
    changeStatistic: (state, { payload: createStatistic }: { payload: boolean }) => {
      state.createStatistic = createStatistic;
    },
  },
  extraReducers: (bulder) => {
    bulder      
      .addCase(getNewTokenAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getNewTokenAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        localStorage.setItem('token', action.payload.token);
        localStorage.setItem('refreshToken', action.payload.refreshToken);
        state.token = action.payload.token;
        state.refreshToken = action.payload.refreshToken;
      })
      .addCase(getNewTokenAsync.rejected, (state) => {
        state.status = 'failed';
      })
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
        localStorage.setItem('name', action.payload.name);
      })
      .addMatcher(authAPI.endpoints.loginUser.matchRejected, (state) => {
        state.status = 'failed';
      })
      .addMatcher(authAPI.endpoints.getNewToken.matchFulfilled, (state, action) => {
        state.status = 'idle';
        state.token = action.payload.token;
        state.id = action.payload.userId;
        state.refreshToken = action.payload.refreshToken;
        state.isAuth = true;
        state.name = action.payload.name;
        localStorage.setItem('token', action.payload.token);
        localStorage.setItem('refreshToken', action.payload.refreshToken);
        localStorage.setItem('userId', action.payload.userId);
        localStorage.setItem('name', action.payload.name);
      });
  },
});

export const selectAuth = (state: RootState) => state.auth;

export const { logout, changeName, changeStatistic } = authUserSlice.actions;

export default authUserSlice.reducer;
