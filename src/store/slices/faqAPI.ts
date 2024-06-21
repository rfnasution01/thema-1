import { FaqDetailType, FaqType } from '@/libs/types/faq-type'
import { Res, api } from '../api'

export const FaqEndpoints = api.injectEndpoints({
  endpoints: (builder) => ({
    getFaqKategori: builder.query<Res<FaqType[]>, void>({
      query: () => ({
        url: `website/faq_kategori`,
        method: 'GET',
      }),
    }),
    getFaqByKategori: builder.query<Res<FaqDetailType[]>, { id: string }>({
      query: ({ id }) => ({
        url: `website/faq_by_kategori`,
        method: 'GET',
        params: {
          id: id,
        },
      }),
    }),
  }),
})

export const { useGetFaqKategoriQuery, useGetFaqByKategoriQuery } = FaqEndpoints
