import { Form } from '@/components/Form'
import { FormLabelInput } from '@/components/input'
import { UseFormReturn } from 'react-hook-form'

export function FormFindTiket({
  form,
  handleSubmitFindTiket,
}: {
  form: UseFormReturn
  handleSubmitFindTiket: () => Promise<void>
}) {
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmitFindTiket)}
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
  )
}
