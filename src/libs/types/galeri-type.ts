export type GaleriType = {
  id: string
  judul: string
  url: string
  gambar: string
}

export type GaleriDetailType = {
  idL: string
  judul: string
  url: string
  gambar: string
  lampiran: GaleriType[]
}
