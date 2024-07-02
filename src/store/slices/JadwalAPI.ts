import { Res, api } from '../api'
import {
  JadwalParams,
  JadwalType,
  NamaKelasType,
  TahunAkademikType,
} from '@/libs/types/jadwal-type'

export const JadwalEndpoints = api.injectEndpoints({
  endpoints: (builder) => ({
    getJadwalBelajar: builder.query<Res<JadwalType[]>, JadwalParams>({
      query: ({ id_ta, tingkat_kelas, id_kelas }) => ({
        url: `website/jadwal_belajar`,
        method: 'GET',
        params: {
          id_ta: id_ta,
          tingkat_kelas: tingkat_kelas,
          id_kelas: id_kelas,
        },
      }),
    }),
    getTahunAkademik: builder.query<Res<TahunAkademikType[]>, void>({
      query: () => ({
        url: `website/tahun_akademik`,
        method: 'GET',
      }),
    }),
    getNamaKelas: builder.query<Res<NamaKelasType[]>, { id_ta: string }>({
      query: ({ id_ta }) => ({
        url: `website/nama_kelas`,
        method: 'GET',
        params: {
          id_ta: id_ta,
        },
      }),
    }),
  }),
})

export const {
  useGetJadwalBelajarQuery,
  useGetTahunAkademikQuery,
  useGetNamaKelasQuery,
} = JadwalEndpoints
