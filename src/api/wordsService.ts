import { Word } from '../types/types';
import { api } from './api';

export const wordsAPI = api.injectEndpoints({
  endpoints: (build)=>({
    gethWords: build.query<Word[], {page: number, group: number}>({
      query: ({page, group})=>({
        url: '/words',
        params: {
          _page: page,
          _group: group
        }
      }),
      providesTags: () =>['Words']
    }),
    getWordById: build.query<Word, string>({
      query: (id)=>({
        url: `/words/${id}`
      })
    }),
  })
});
