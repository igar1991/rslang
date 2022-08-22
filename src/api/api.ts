import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  reducerPath: 'langApi',
  baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:8080'}),
  tagTypes: ['Users', 'Words', 'Statistic'],
  endpoints: ()=>({})
});