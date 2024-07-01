export type JadwalParams = {
  id_ta: string
  tingkat_kelas: string
  id_kelas: string
}

export type JadwalType = {
  nama_kelas: string
  nama_hari: string
  jam_mulai: string
  jam_akhir: string
  nama_mapel: string
  sesi_masuk: string
  nama_guru: string
}

export type TahunAkademikType = {
  id: string
  tahun: string
  semester: string
  status_aktif: number
}

export type NamaKelasType = {
  id: string
  tingkat_kelas: string
  nama_kelas: string
}
