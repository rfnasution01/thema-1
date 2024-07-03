export type KontakParams = {
  nama_depan: string
  nama_belakang: string
  email: string
  hp: string
  pesan: string
  berkas: string[]
}

export type DataTiketType = {
  ticket: TiketType
  chat: ChatType[]
}

export type TiketType = {
  id: string
  kode_tiket: string
  nama_depan: string
  nama_belakang: string
  email: string
  hp: string
  pesan: string
  lampiran: LampiranType[]
  tanggal: string
  status: number
  status_user: string
  status_at: string
}

export type LampiranType = {
  id: string
  id_kontak: string
  dokumen: string
  create_at: string
}

export type ChatType = {
  id: string
  jenis_chat: string
  isi: string
  baca: string
  lampiran: LampiranType[]
  user: string
  tanggal: string
}
