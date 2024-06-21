import {
  BerandaType,
  BeritaDetailType,
  BeritaPopuler,
  BeritaType,
  FasilitasType,
  HalamanDetailType,
  IdentitasType,
  KategoriType,
  MenuType,
  Params,
  PengumumanType,
  ProgramDetailType,
  RelatedType,
  SliderType,
} from '@/libs/types/beranda-type'
import { Res, api } from '../api'

export const BerandaEndpoints = api.injectEndpoints({
  endpoints: (builder) => ({
    getIdentitas: builder.query<Res<IdentitasType>, void>({
      query: () => ({
        url: `website/identitas`,
        method: 'GET',
      }),
    }),
    getMenuUtama: builder.query<Res<MenuType[]>, void>({
      query: () => ({
        url: `website/menu_utama`,
        method: 'GET',
      }),
    }),
    getMenuTop: builder.query<Res<MenuType[]>, void>({
      query: () => ({
        url: `website/menu_top`,
        method: 'GET',
      }),
    }),
    getSlider: builder.query<Res<SliderType[]>, void>({
      query: () => ({
        url: `website/slider`,
        method: 'GET',
      }),
    }),
    getBeranda: builder.query<Res<BerandaType[]>, void>({
      query: () => ({
        url: `website/beranda`,
        method: 'GET',
      }),
    }),
    getHalamanDetail: builder.query<Res<HalamanDetailType>, { id: string }>({
      query: ({ id }) => ({
        url: `website/halaman`,
        method: 'GET',
        params: {
          id: id,
        },
      }),
    }),
    getProgram: builder.query<Res<ProgramDetailType[]>, void>({
      query: () => ({
        url: `website/program`,
        method: 'GET',
      }),
    }),
    getProgramDetail: builder.query<Res<ProgramDetailType>, { id: string }>({
      query: ({ id }) => ({
        url: `website/program/detail`,
        method: 'GET',
        params: {
          id: id,
        },
      }),
    }),
    getBerita: builder.query<Res<BeritaType[]>, Params>({
      query: ({ page_size, page_number, search }) => ({
        url: `website/berita`,
        method: 'GET',
        params: {
          page_number: page_number,
          page_size: page_size,
          search: search,
        },
      }),
    }),
    getBeritaDetail: builder.query<Res<BeritaDetailType>, { id: string }>({
      query: ({ id }) => ({
        url: `website/berita/detail`,
        method: 'GET',
        params: {
          id: id,
        },
      }),
    }),
    getBeritaDetailRelated: builder.query<Res<RelatedType[]>, { id: string }>({
      query: ({ id }) => ({
        url: `website/berita/detail`,
        method: 'GET',
        params: {
          id: id,
        },
      }),
    }),
    getBeritaPopuler: builder.query<Res<BeritaPopuler[]>, { jumlah: number }>({
      query: ({ jumlah }) => ({
        url: `website/berita_populer`,
        method: 'GET',
        params: {
          jumlah: jumlah,
        },
      }),
    }),
    getBeritaKategori: builder.query<Res<KategoriType[]>, Params>({
      query: ({ page_number, page_size, search, seo_kategori }) => ({
        url: `website/berita/kategori`,
        method: 'GET',
        params: {
          page_number: page_number,
          page_size: page_size,
          search: search,
          seo_kategori: seo_kategori,
        },
      }),
    }),
    getPengumuman: builder.query<Res<PengumumanType[]>, Params>({
      query: ({ page_size, page_number, search }) => ({
        url: `website/pengumuman`,
        method: 'GET',
        params: {
          page_number: page_number,
          page_size: page_size,
          search: search,
        },
      }),
    }),
    getPengumumanDetail: builder.query<Res<BeritaDetailType>, { id: string }>({
      query: ({ id }) => ({
        url: `website/pengumuman/detail`,
        method: 'GET',
        params: {
          id: id,
        },
      }),
    }),
    getPengumumanKategori: builder.query<Res<KategoriType[]>, Params>({
      query: ({ page_number, page_size, search, seo_kategori }) => ({
        url: `website/pengumuman/kategori`,
        method: 'GET',
        params: {
          page_number: page_number,
          page_size: page_size,
          search: search,
          seo_kategori: seo_kategori,
        },
      }),
    }),
    getPengumumanRelated: builder.query<Res<RelatedType[]>, { id: string }>({
      query: ({ id }) => ({
        url: `website/pengumuman/detail`,
        method: 'GET',
        params: {
          id: id,
        },
      }),
    }),
    getAgenda: builder.query<Res<BeritaType[]>, Params>({
      query: ({ page_size, page_number, search }) => ({
        url: `website/agenda`,
        method: 'GET',
        params: {
          page_number: page_number,
          page_size: page_size,
          search: search,
        },
      }),
    }),
    getAgendaDetail: builder.query<Res<BeritaDetailType>, { id: string }>({
      query: ({ id }) => ({
        url: `website/agenda/detail`,
        method: 'GET',
        params: {
          id: id,
        },
      }),
    }),
    getAgendaRelated: builder.query<Res<RelatedType[]>, { id: string }>({
      query: ({ id }) => ({
        url: `website/agenda/detail`,
        method: 'GET',
        params: {
          id: id,
        },
      }),
    }),
    getAgendaKategori: builder.query<Res<KategoriType[]>, Params>({
      query: ({ page_number, page_size, search, seo_kategori }) => ({
        url: `website/agenda/kategori`,
        method: 'GET',
        params: {
          page_number: page_number,
          page_size: page_size,
          search: search,
          seo_kategori: seo_kategori,
        },
      }),
    }),
    getFasilitas: builder.query<Res<FasilitasType[]>, Params>({
      query: ({ page_number, page_size }) => ({
        url: `website/fasilitas`,
        method: 'GET',
        params: {
          page_number: page_number,
          page_size: page_size,
        },
      }),
    }),
  }),
})

export const {
  useGetIdentitasQuery,
  useGetMenuTopQuery,
  useGetMenuUtamaQuery,
  useGetSliderQuery,
  useGetHalamanDetailQuery,
  useGetBerandaQuery,
  useGetFasilitasQuery,
  useGetProgramQuery,
  useGetProgramDetailQuery,
  useGetBeritaQuery,
  useGetBeritaDetailQuery,
  useGetBeritaDetailRelatedQuery,
  useGetBeritaKategoriQuery,
  useGetBeritaPopulerQuery,
  useGetPengumumanDetailQuery,
  useGetPengumumanKategoriQuery,
  useGetPengumumanQuery,
  useGetPengumumanRelatedQuery,
  useGetAgendaDetailQuery,
  useGetAgendaKategoriQuery,
  useGetAgendaQuery,
  useGetAgendaRelatedQuery,
} = BerandaEndpoints
