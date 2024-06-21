import { DirektoriParams, DirektoriType } from '@/libs/types/direktori-type'
import { Res, api } from '../api'

export const DirektoriEndpoints = api.injectEndpoints({
  endpoints: (builder) => ({
    getDirektori: builder.query<Res<DirektoriType[]>, DirektoriParams>({
      query: ({ user, page_size, page_number, kelas }) => ({
        url: `website/${user}`,
        method: 'GET',
        params: {
          page_size: page_size,
          page_number: page_number,
          kelas: kelas,
        },
      }),
    }),
    getKelas: builder.query<Res<string[]>, void>({
      query: () => ({
        url: `website/kelas`,
        method: 'GET',
      }),
    }),
  }),
})

export const { useGetDirektoriQuery, useGetKelasQuery } = DirektoriEndpoints
