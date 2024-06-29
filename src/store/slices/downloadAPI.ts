import { DownloadKategoriType, DownloadType } from '@/libs/types/download-type'
import { Res, api } from '../api'
import { ListParams } from '@/libs/types/list-type'

export const DownloadEndpoints = api.injectEndpoints({
  endpoints: (builder) => ({
    getDownload: builder.query<Res<DownloadType[]>, ListParams>({
      query: ({ page_number, page_size, search }) => ({
        url: `website/download`,
        method: 'GET',
        params: {
          page_number: page_number,
          page_size: page_size,
          search: search,
        },
      }),
    }),
    getDownloadKategori: builder.query<Res<DownloadKategoriType[]>, void>({
      query: () => ({
        url: `website/download/kategori`,
        method: 'GET',
      }),
    }),
  }),
})

export const { useGetDownloadQuery, useGetDownloadKategoriQuery } =
  DownloadEndpoints
