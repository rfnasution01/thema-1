import { PhotoType } from './detail-type'

export type ListType = {
  id: string
  seo: string
  judul: string
  kategori: string
  seo_kategori: string
  kelompok: string
  tanggal: string
  photo: PhotoType
  isi: string
  hits: string
  penulis: string
}

export type ListParams = {
  page_size?: number
  page_number?: number
  search?: string
  jenis?: string
  seo_kategori?: string
}
