import { KontakParams } from '@/libs/types/kontak-type'
import { api } from '../api'

export const KontakEndpoints = api.injectEndpoints({
  endpoints: (builder) => ({
    createFile: builder.mutation<{ url: string }, FormData>({
      query: (foto) => ({
        url: 'website/upload',
        method: 'POST',
        body: foto,
        formData: true,
      }),
    }),
    createKontak: builder.mutation<{ data: string }, { body: KontakParams }>({
      query: ({ body }) => ({
        url: 'website/kontak',
        method: 'POST',
        body: body,
      }),
    }),
    getKode: builder.query<void, { kode_tiket: string }>({
      query: ({ kode_tiket }) => ({
        url: 'website/kontak',
        method: 'GET',
        params: {
          kode_tiket: kode_tiket,
        },
      }),
    }),
  }),
})

export const {
  useCreateFileMutation,
  useCreateKontakMutation,
  useLazyGetKodeQuery,
} = KontakEndpoints
