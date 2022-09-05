import { User } from '../types/types';
import { api } from './api';

interface resLogin {
  message: string;
  refreshToken: string;
  token: string;
  userId: string;
  name: string;
}

export type CreateUser = { name: string; email: string; password: string };

export const authAPI = api.injectEndpoints({
  endpoints: (build) => ({
    createUser: build.mutation<{ id: string; name: string; email: string }, CreateUser>({
      query: (body) => ({
        url: '/users',
        method: 'POST',
        body,
      }),
    }),
    deleteUser: build.mutation<{ id: string }, { id: string }>({
      query: ({ id }) => ({
        url: `/users/${id}`,
        method: 'DELETE',
      }),
    }),
    loginUser: build.mutation<resLogin, User>({
      query: (body) => ({
        url: '/signin',
        method: 'POST',
        body,
      }),
    }),
    getUserById: build.query<CreateUser, { id: string }>({
      query: ({ id }) => ({
        url: `/users/${id}`,
        method: 'GET',
      }),
      providesTags: ['Users'],

    }),
    editUser: build.mutation<CreateUser, { id: string; body: {name?:string, email?:string, password?:string} }>({
      query: ({ id, body }) => ({
        url: `/users/${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Users'],
    }),

    getNewToken: build.query<resLogin, { id: string; refreshToken: string }>({
      query: ({ id, refreshToken }) => ({
        url: `/users/${id}/tokens`,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
      }),
    }),
  }),
});
