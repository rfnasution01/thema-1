import { DataTiketType, KontakParams } from '@/libs/types/kontak-type'
import { Res, api } from '../api'

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
    createKontakClose: builder.mutation<void, { body: { id: string } }>({
      query: ({ body }) => ({
        url: 'website/kontak_close',
        method: 'POST',
        body: body,
      }),
      invalidatesTags: ['chat'],
    }),
    createKontakChat: builder.mutation<
      void,
      { body: { id: string; isi: string; berkas: string[] } }
    >({
      query: ({ body }) => ({
        url: 'website/kontak_chat',
        method: 'POST',
        body: body,
      }),
      invalidatesTags: ['chat'],
    }),
    getKode: builder.query<Res<DataTiketType>, { kode_tiket: string }>({
      query: ({ kode_tiket }) => ({
        url: 'website/kontak',
        method: 'GET',
        params: {
          kode_tiket: kode_tiket,
        },
      }),
      providesTags: ['chat'],
    }),
    findKode: builder.mutation<Res<DataTiketType>, { kode_tiket: string }>({
      query: ({ kode_tiket }) => ({
        url: 'website/tiket',
        method: 'POST',
        params: {
          kode_tiket: kode_tiket,
        },
      }),
      invalidatesTags: ['chat'],
    }),
  }),
})

export const {
  useCreateFileMutation,
  useCreateKontakMutation,
  useGetKodeQuery,
  useLazyGetKodeQuery,
  useCreateKontakChatMutation,
  useCreateKontakCloseMutation,
  useFindKodeMutation,
} = KontakEndpoints
