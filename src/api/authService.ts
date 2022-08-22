import { User } from '../types/types';
import { api } from './api';

interface resLogin {
  message: string;
  refreshToken: string;
  token: string;
  userId: string;
}

export const authAPI = api.injectEndpoints({
  endpoints: (build)=>({
    createUser: build.mutation<{id: string, email: string}, User>({
      query: (body)=>({
        url: '/users',
        method: 'POST',
        body
      }),
    }),
    loginUser: build.mutation<resLogin, User>({
      query: (body)=>({
        url: '/signin',
        method: 'POST',
        body
      }),
    }),
    getNewToken: build.query<resLogin, {id: string, refreshToken: string}>({
      query: ({id, refreshToken})=>({
        url: `/users/${id}/tokens`,
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${refreshToken}`,
        }
      }),
    })
  }),
  
});
