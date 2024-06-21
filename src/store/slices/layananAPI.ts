import { Res, api } from '../api'
import { LayananType } from '@/libs/types/layanan-type'

export const LayananEndpoints = api.injectEndpoints({
  endpoints: (builder) => ({
    getLayanan: builder.query<Res<LayananType[]>, void>({
      query: () => ({
        url: `website/layanan`,
        method: 'GET',
      }),
    }),
  }),
})

export const { useGetLayananQuery } = LayananEndpoints
