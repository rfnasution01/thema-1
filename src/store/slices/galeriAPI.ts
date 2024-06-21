import { GaleriDetailType, GaleriType } from '@/libs/types/galeri-type'
import { Res, api } from '../api'
import { ListParams } from '@/libs/types/list-type'

export const GaleriEndpoints = api.injectEndpoints({
  endpoints: (builder) => ({
    getGaleri: builder.query<Res<GaleriType[]>, ListParams>({
      query: ({ page_number, page_size }) => ({
        url: `website/galery_photo`,
        method: 'GET',
        params: {
          page_number: page_number,
          page_size: page_size,
        },
      }),
    }),
    getGaleriDetail: builder.query<Res<GaleriDetailType>, { id: string }>({
      query: ({ id }) => ({
        url: `website/galery_photo/detail`,
        method: 'GET',
        params: {
          id: id,
        },
      }),
    }),
  }),
})

export const { useGetGaleriQuery, useGetGaleriDetailQuery } = GaleriEndpoints
