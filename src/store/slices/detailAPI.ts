import { DetailRelatedType, DetailType } from '@/libs/types/detail-type'
import { Res, api } from '../api'

export const DetailEndpoints = api.injectEndpoints({
  endpoints: (builder) => ({
    getDetail: builder.query<Res<DetailType>, { id: string; jenis: string }>({
      query: ({ id, jenis }) => ({
        url: `website/${jenis}/detail`,
        method: 'GET',
        params: {
          id: id,
        },
      }),
    }),
    getDetailRelated: builder.query<
      Res<DetailRelatedType[]>,
      { id: string; jenis: string }
    >({
      query: ({ id, jenis }) => ({
        url: `website/${jenis}/detail`,
        method: 'GET',
        params: {
          id: id,
        },
      }),
    }),
  }),
})

export const { useGetDetailQuery, useGetDetailRelatedQuery } = DetailEndpoints
