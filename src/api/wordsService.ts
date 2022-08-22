import { Word, WordsRequestParams } from '../types/types';
import { api } from './api';

export const wordsAPI = api.injectEndpoints({
  endpoints: (build) => ({
    getWords: build.query<Word[], WordsRequestParams>({
      query: ({ page, group }) => ({
        url: '/words',
        params: {
          page: page,
          group: group
        }
      }),
      providesTags: () => ['Words']
    }),
    getWordById: build.query<Word, string>({
      query: (id) => ({
        url: `/words/${id}`
      })
    }),
    getWordsUser: build.query<Word[], string>({
      query: (id) => ({
        url: `/users/${id}/words`
      })
    }),
    addUserWord: build.mutation<{ id: string, wordId: string }, { id: string, wordId: string }>({
      query: ({ id, wordId }) => ({
        url: `/users/${id}/words/${wordId}`,
        method: 'POST'
      })
    }),
    getUserWordById: build.query<Word, { id: string, wordId: string }>({
      query: ({ id, wordId }) => ({
        url: `/users/${id}/words/${wordId}`
      })
    }),
    removeUserWord: build.mutation<{ id: string, wordId: string }, { id: string, wordId: string }>({
      query: ({ id, wordId }) => ({
        url: `/users/${id}/words/${wordId}`,
        method: 'DELETE'
      })
    })
  })
});
