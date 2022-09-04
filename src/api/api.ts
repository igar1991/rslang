import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../redux/store';

export const API_BASE_URL = 'https://rslanglishbe.herokuapp.com';

const baseQuery = fetchBaseQuery({
  baseUrl: API_BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

export const api = createApi({
  reducerPath: 'langApi',
  baseQuery: baseQuery,
  tagTypes: ['Users', 'Words', 'Statistic'],
  endpoints: ()=>({})
});
