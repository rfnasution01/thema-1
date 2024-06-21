import { ListParams, ListType } from '@/libs/types/list-type'
import { Res, api } from '../api'

export const ListEndpoints = api.injectEndpoints({
  endpoints: (builder) => ({
    getList: builder.query<Res<ListType[]>, ListParams>({
      query: ({ jenis, page_number, page_size, search }) => ({
        url: `website/${jenis}`,
        method: 'GET',
        params: {
          page_number: page_number,
          page_size: page_size,
          search: search,
        },
      }),
    }),
  }),
})

export const { useGetListQuery } = ListEndpoints
