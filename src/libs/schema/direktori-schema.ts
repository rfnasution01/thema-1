import zod from 'zod'

export const DirektoriSchema = zod.object({
  kelas: zod.string().optional().nullable().nullish(),
  user: zod.string().optional().nullable().nullish(),
})
