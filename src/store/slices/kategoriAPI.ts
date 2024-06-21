import { ListParams, ListType } from '@/libs/types/list-type'
import { Res, api } from '../api'

export const KategoriEndpoints = api.injectEndpoints({
  endpoints: (builder) => ({
    getKategori: builder.query<Res<ListType[]>, ListParams>({
      query: ({ jenis, page_number, page_size, search, seo_kategori }) => ({
        url: `website/${jenis}/kategori`,
        method: 'GET',
        params: {
          page_number: page_number,
          page_size: page_size,
          search: search,
          seo_kategori: seo_kategori,
        },
      }),
    }),
  }),
})

export const { useGetKategoriQuery } = KategoriEndpoints
