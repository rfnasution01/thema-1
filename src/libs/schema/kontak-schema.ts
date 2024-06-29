import zod from 'zod'

export const KontakSchema = zod.object({
  nama: zod.string().optional().nullable().nullish(),
  email: zod.string().optional().nullable().nullish(),
  subjek: zod.string().optional().nullable().nullish(),
  pesan: zod.string().optional().nullable().nullish(),
})
