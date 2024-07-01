export type AbsensiType = {
  jlh_pegawai: number
  hadir: number
  ontime: number
  terlambat: number
  sakit: number
  izin: number
  alpa: number
  cuti: number
  tugas_luar: number
  tugas_belajar: number
  wfh: number
  presensi: PresensiType[]
}

export type PresensiType = {
  nama: string
  jabatan: string
  in_at: string
  out_at: string
  gambar_in: string
  gambar_out: string
  status_in: string
  status_out: string
}
