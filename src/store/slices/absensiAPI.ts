import { AbsensiType } from '@/libs/types/absensi-tyoe'
import { Res, api } from '../api'

export const AbsensiEndpoints = api.injectEndpoints({
  endpoints: (builder) => ({
    getAbsensi: builder.query<Res<AbsensiType>, { tanggal: string }>({
      query: ({ tanggal }) => ({
        url: `website/kehadiran_pegawai`,
        method: 'GET',
        params: {
          tanggal: tanggal,
        },
      }),
    }),
  }),
})

export const { useGetAbsensiQuery } = AbsensiEndpoints
