export type IdentitasType = {
  nama_website: string
  satuan_kerja: string | null
  alamat: string
  telepon: string
  kota: string
  logo: string
  favicon: string
  wa: string
  fb: string
  tw: string
  ig: string
  yt: string
  telegram: string
  weekday_cs: string
  weekend_cs: string
  tiktok: string
  email: string
  keyword: string
  deskripsi: string
  latitude: string
  longitude: string
  footer: string
}

export type MenuType = {
  id: string
  nama_menu: string
  jenis_menu: string
  slug: string
  id_konten: string
  deskripsi_singkat: string
  url_gambar: string | null
  id_parent: string | null
  urutan: string
  children?: MenuType[]
}

export type SliderType = {
  judul: string
  url: string
  gambar: string
  urutan: number
}

export type BerandaType = {
  kategori: string
  seo: string
  keterangan: string
  kelompok: string
  urutan: string
  berita: BeritaType[]
}

export type FasilitasType = {
  id: string
  photo: string
  nama: string
  keterangan: string
  jam_operasional: string
  alamat: string
  telepon: string
}

export type BeritaType = {
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

export type PhotoType = {
  keterangan: string
  gambar: string
}

export type HalamanDetailType = {
  id: string
  judul: string
  seo: string
  url_gambar: string
  urutan: string
  hits: string
  isi: string
}

export type BeritaTerbaruType = {
  id: string
  seo: string
  judul: string
}

export type ProgramDetailType = {
  id: string
  judul: string
  seo: string
  icon: string
  photo: string
  isi_singkat: string
  isi_lengkap: string
}

export type Params = {
  page_size?: number
  page_number?: number
  search?: string
  seo_kategori?: string
}

export type BeritaDetailType = {
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

export type TagType = {
  id: string
  nama: string
  seo: string
}

export type RelatedType = {
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

export type KategoriType = {
  id: string
  seo: string
  judul: string
  isi: string
  hits: string
  kategori: string
  seo_kategori: string
  tanggal: string
  photo: PhotoType
  penulis: string
}

export type PengumumanType = {
  id: string
  seo: string
  judul: string
  isi: string
  hits: string
  kategori: string
  seo_kategori: string
  tanggal: string
  photo: PhotoType
  penulis: string
}

export type BeritaPopuler = {
  id: string
  judul: string
  seo: string
  tanggal: string
  gambar: {
    keterangan: string
    gambar: string
  }
}
