import zod from 'zod'

export const AbsensiSchema = zod.object({
  tanggal: zod.string().optional().nullable().nullish(),
})
