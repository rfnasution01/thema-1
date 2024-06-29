import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { KontakSchema } from '@/libs/schema/kontak-schema'
import { Form } from '@/components/Form'
import { FormLabelInput } from '@/components/input'
import { IdentitasType } from '@/libs/types/beranda-type'

export function Pertanyaan({ identitas }: { identitas: IdentitasType }) {
  const form = useForm<zod.infer<typeof KontakSchema>>({
    resolver: zodResolver(KontakSchema),
    defaultValues: {},
  })

  const handleSubmitKontak = async (values) => {
    console.log({ values })
  }

  return (
    <div className="flex gap-32 phones:flex-col">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmitKontak)}
          className="flex w-3/4 flex-col gap-32 phones:w-full"
        >
          <FormLabelInput
            form={form}
            name="nama"
            label="Nama*"
            placeholder="Masukkan Nama"
            type="text"
            className="w-full"
          />

          <FormLabelInput
            form={form}
            name="email"
            label="Email*"
            placeholder="Masukkan Email"
            type="email"
            className="w-full"
          />

          <FormLabelInput
            form={form}
            name="subjek"
            label="Subjek*"
            placeholder="Masukkan Subjek"
            type="text"
            className="w-full"
          />

          <FormLabelInput
            form={form}
            name="pesan"
            label="Pesan*"
            placeholder="Masukkan Pesan"
            type="text"
            className="w-full"
          />
        </form>
      </Form>
      <div className="flex flex-col gap-32">
        <div className="flex flex-col gap-8">
          <p className="font-bold">{identitas?.alamat ?? '-'}</p>
          <p>{identitas?.kota ?? '-'}</p>
        </div>

        <div className="flex flex-col gap-8">
          <p>
            <span className="underline">Phone</span>:{' '}
            {identitas?.telepon ?? '-'}
          </p>
          <p>
            <span className="underline">Fax</span>: -
          </p>
          <p>
            <span className="underline">Email</span>: {identitas?.email ?? '-'}
          </p>
        </div>
      </div>
    </div>
  )
}
