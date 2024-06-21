export type DirektoriType = {
  id_pegawai: string
  gambar: string
  nama: string
  pendidikan_terakhir: string
  status: string
  id_siswa: string
  photo: string
  nama_siswa: string
  kelas: string
}

export type DirektoriParams = {
  user: string
  page_size: number
  page_number: number
  kelas?: string
}
