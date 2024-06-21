export type ProfilItem = {
  jenis: string
  keterangan: string | null
  sub_keterangan: string | null
  gambar: string | null // Menyesuaikan dengan tipe yang tepat, misalnya string untuk URL gambar
  list: { keterangan: string; urutan: string }[]
}

export type ProfilType = {
  nama: string
  tahun_operasional: string
  akreditasi: string
  tgl_mulai_akreditasi: string | null
  tgl_akhir_akreditasi: string | null
  penyelenggaraan: string
  penyelenggaraan_mulai: string | null
  penyelenggaraan_akhir: string | null
  alamat: string
  telepon: string
  kota: string
  provinsi: string
  logo: string | null
  profil: ProfilItem[]
}
