import { NewWordRequestParams, UserWordData, Word, WordsRequestParams } from '../types/types';
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
    getUserWords: build.query<UserWordData[], string>({
      query: (id) => ({
        url: `/users/${id}/words`
      })
    }),
    addUserWord: build.mutation<{ addedWord: UserWordData }, { id: string, wordId: string, body: NewWordRequestParams }>({
      query: ({ id, wordId, body }) => ({
        url: `/users/${id}/words/${wordId}`,
        method: 'POST',
        body: body
      })
    }),
    updateUserWord: build.mutation<{ addedWord: UserWordData }, { id: string, wordId: string, body: NewWordRequestParams }>({
      query: ({ id, wordId, body }) => ({
        url: `/users/${id}/words/${wordId}`,
        method: 'PUT',
        body: body
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
