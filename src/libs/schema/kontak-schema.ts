import zod from 'zod'

export const KontakSchema = zod.object({
  nama_depan: zod.string({
    required_error: 'Nama depan harus di isi',
    invalid_type_error: 'Format nama depan tidak valid',
  }),
  nama_belakang: zod.string({
    required_error: 'Nama belakang harus di isi',
    invalid_type_error: 'Format nama belakang tidak valid',
  }),
  email: zod.string({
    required_error: 'Email harus di isi',
    invalid_type_error: 'Format email tidak valid',
  }),
  hp: zod.string({
    required_error: 'Hp harus di isi',
    invalid_type_error: 'Format hp tidak valid',
  }),
  pesan: zod.string({
    required_error: 'Pesan harus di isi',
    invalid_type_error: 'Format pesan tidak valid',
  }),
  berkas: zod
    .array(zod.string().optional().nullable().nullish())
    .optional()
    .nullable()
    .nullish(),
})

export const InputToken = zod.object({
  token: zod?.string({
    required_error: 'Token harus di isi',
    invalid_type_error: 'Format token tidak valid',
  }),
})

export const ChatSchema = zod.object({
  id: zod.string().nullable().nullish().optional(),

  isi: zod.string({
    required_error: 'Pesan harus di isi',
    invalid_type_error: 'Format pesan tidak valid',
  }),
  berkas: zod
    .array(zod.string().optional().nullable().nullish())
    .optional()
    .nullable()
    .nullish(),
})
