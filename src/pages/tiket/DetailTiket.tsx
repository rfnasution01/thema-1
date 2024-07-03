import { Form } from '@/components/Form'
import { FormLabelInput } from '@/components/input'
import { DataTiketType } from '@/libs/types/kontak-type'
import { UseFormReturn } from 'react-hook-form'

export function DetailTiket({
  data,
  form,
  handleTokenSubmit,
}: {
  data: DataTiketType
  form: UseFormReturn
  handleTokenSubmit: () => Promise<void>
}) {
  return (
    <div className="flex h-full w-1/3 flex-col gap-48 border-r border-black p-32 phones:w-full phones:border-b phones:border-r-0">
      {data && (
        <>
          <div className="flex flex-col gap-12 font-bold">
            <p className="text-[2.4rem]">Subjek Pesan:</p>
            <p>{data?.ticket?.pesan}</p>
          </div>
          <div className="flex flex-col gap-12 font-bold">
            <p className="text-[2.4rem]">Status:</p>

            <div className="flex text-white">
              {data?.ticket?.status === 0 ? (
                <p className="rounded-2xl bg-orange-700 p-16 px-24 py-12 text-[1.8rem]">
                  Menunggu
                </p>
              ) : data?.ticket?.status === 1 ? (
                <p className="rounded-2xl bg-green-700 px-24 py-12 text-[1.8rem]">
                  Diproses
                </p>
              ) : data?.ticket?.status === 2 ? (
                <p className="rounded-2xl bg-danger px-24 py-12 text-[1.8rem]">
                  Ditutup
                </p>
              ) : (
                ''
              )}
            </div>
          </div>
        </>
      )}
      <div className="flex flex-col gap-32">
        <p style={{ lineHeight: '130%' }}>
          Untuk membuka percakapan anda yang lain, masukkan kode tiket anda
        </p>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleTokenSubmit)}
            className="flex  gap-24"
          >
            <FormLabelInput
              form={form}
              name="token"
              placeholder="Masukkan Kode Tiket"
              type="text"
              className="w-full"
            />
            <button
              type="submit"
              className="rounded-2xl bg-[#1B2F69] px-32 py-16 text-white hover:bg-opacity-80"
            >
              Buka
            </button>
          </form>
        </Form>
      </div>
    </div>
  )
}
