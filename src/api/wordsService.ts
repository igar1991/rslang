import { AggregatedWords, NewWordRequestParams, UserWordData, Word, WordsRequestParams } from 'types/types';
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
      })
    }),
    getWordById: build.query<Word, string>({
      query: (id) => ({
        url: `/words/${id}`
      })
    }),
    getUserWords: build.query<UserWordData[], string>({
      query: (id) => ({
        url: `/users/${id}/words`
      }),
      providesTags: (result) =>
        result ?
          [...result.map(({ id }) => ({ type: 'Words', id } as const)), { type: 'Words', id: 'LIST' }] :
          [{ type: 'Words', id: 'LIST' }]
    }),
    addUserWord: build.mutation<{ addedWord: UserWordData }, { id: string, wordId: string, body: NewWordRequestParams }>({
      query: ({ id, wordId, body }) => ({
        url: `/users/${id}/words/${wordId}`,
        method: 'POST',
        body: body
      }),
      invalidatesTags: [{ type: 'Words', id: 'LIST' }]
    }),
    updateUserWord: build.mutation<{ addedWord: UserWordData }, { id: string, wordId: string, body: NewWordRequestParams }>({
      query: ({ id, wordId, body }) => ({
        url: `/users/${id}/words/${wordId}`,
        method: 'PUT',
        body: body
      }),
      invalidatesTags: (result, error, { wordId }) => [{ type: 'Words', wordId }]
    }),
    getUserWordById: build.query<UserWordData, { id: string, wordId: string }>({
      query: ({ id, wordId }) => ({
        url: `/users/${id}/words/${wordId}`
      }),
      providesTags: (result) =>
        result ?
          [({ type: 'Words', id: result.id } as const), { type: 'Words', id: 'LIST' }] :
          [{ type: 'Words', id: 'LIST' }]
    }),
    removeUserWord: build.mutation<{ id: string, wordId: string }, { id: string, wordId: string }>({
      query: ({ id, wordId }) => ({
        url: `/users/${id}/words/${wordId}`,
        method: 'DELETE'
      })
    }),
    getAllAggregatedWords: build.query<AggregatedWords[], { id: string, wordsPerPage: string, filter: string }>({
      query: ({ id, wordsPerPage, filter }) => ({
        url: `/users/${id}/aggregatedWords/`,
        params: { wordsPerPage, filter }
      }),
      providesTags: (result) =>
        result ?
          [...result[0].paginatedResults.map(({ _id }) => ({ type: 'Words', _id } as const)), {
            type: 'Words',
            id: 'LIST'
          }] :
          [{ type: 'Words', id: 'LIST' }]
    })
  })
});
