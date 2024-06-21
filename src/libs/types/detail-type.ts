export type DetailType = {
  id: string
  seo: string
  judul: string
  kategori: string
  seo_kategori: string
  isi: string
  hits: number
  jumlah_photo: number
  tanggal: string
  photo: PhotoType[]
  tag: TagType[]
  penulis: string
}

export type DetailRelatedType = {
  id: string
  seo: string
  judul: string
  tanggal: string
  deskripsi_singkat: string
  isi: string
  hits: string
  kategori: string
  seo_kategori: string
  kelompok: string
  photo: PhotoType
}

export type TagType = {
  id: string
  nama: string
  seo: string
}

export type PhotoType = {
  keterangan: string
  gambar: string
}
