import zod from 'zod'

export const JadwalSchema = zod.object({
  tahun_akademik: zod.string().optional().nullable().nullish(),
  nama_kelas: zod.string().optional().nullable().nullish(),
  id_kelas: zod.string().optional().nullable().nullish(),
})
