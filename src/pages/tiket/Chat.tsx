import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/Form'
import { FormLabelInput, Input } from '@/components/input'
import { DataTiketType } from '@/libs/types/kontak-type'
import { Loader2, Paperclip, Trash } from 'lucide-react'
import { Dispatch, SetStateAction, useEffect } from 'react'
import { UseFormReturn } from 'react-hook-form'
import { Bounce, toast } from 'react-toastify'
import { HeaderChat } from './HeaderChat'
import { ChatHistory } from './ChatHistory'

export function ChatType({
  data,
  form,
  handleChat,
  dir,
  loadingFile,
  isLoadingUpload,
  setDir,
  handleUploadFoto,
  setUrls,
  loadingClose,
  handleSubmitClose,
  formClose,
}: {
  data: DataTiketType
  form: UseFormReturn
  handleChat: () => Promise<void>
  dir: string[]
  setDir: Dispatch<SetStateAction<string[]>>
  setUrls: Dispatch<SetStateAction<string[]>>
  loadingFile: boolean
  isLoadingUpload: boolean
  handleUploadFoto: (file: File) => Promise<void>
  handleSubmitClose: () => Promise<void>
  loadingClose: boolean
  formClose: UseFormReturn
}) {
  useEffect(() => {
    if (dir && dir.length > 0) {
      setUrls(dir)
    }
  }, [dir])

  useEffect(() => {
    if (dir) {
      form.setValue('berkas', dir)
    }
  }, [dir])

  const handleRemoveItem = (indexToRemove) => {
    setDir((prevMultiImg) => {
      return prevMultiImg.filter((_, index) => index !== indexToRemove)
    })
  }
  return (
    <div className="scrollbar flex h-full w-full flex-col gap-32 overflow-y-auto phones:h-auto">
      <HeaderChat data={data} />
      <hr className="border" />
      <ChatHistory
        chat={data?.chat}
        nama={`${data?.ticket?.nama_depan} ${data?.ticket?.nama_belakang}`}
      />

      <div className="flex w-full gap-32">
        {data?.ticket?.status !== 2 && (
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleChat)}
              className="flex h-full w-full flex-1 gap-24 phones:flex-col"
            >
              <div className="flex h-full flex-1 items-center gap-24">
                <FormField
                  name="berkas"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="flex flex-col space-y-2">
                      <FormControl>
                        <div>
                          <Input
                            className="-z-[1] h-[0.1px] w-[0.1px] overflow-hidden opacity-0"
                            {...field}
                            id="berkas"
                            type="file"
                            value={''}
                            disabled={isLoadingUpload || loadingFile}
                            placeholder="Lampiran"
                            onChange={(e) => {
                              if (e.target.files[0].size > 5 * 1000000) {
                                return toast.error(
                                  `File terlalu besar. Maksimal 5 MB`,
                                  {
                                    position: 'bottom-right',
                                    autoClose: 5000,
                                    hideProgressBar: false,
                                    closeOnClick: true,
                                    pauseOnHover: true,
                                    draggable: true,
                                    progress: undefined,
                                    theme: 'light',
                                    transition: Bounce,
                                  },
                                )
                              } else {
                                if (e.target.files[0] != null) {
                                  handleUploadFoto(e.target.files[0])
                                }
                              }
                            }}
                          />
                          <div className="flex gap-32 phones:flex-col">
                            <label
                              className="flex items-center gap-12"
                              htmlFor="berkas"
                            >
                              <div className="rounded-2xl bg-[#1B2F69] p-12 text-white hover:cursor-pointer hover:bg-opacity-80">
                                {loadingFile ? (
                                  <span className="animate-spin duration-300">
                                    <Loader2 size={16} />
                                  </span>
                                ) : (
                                  <Paperclip size={16} />
                                )}
                              </div>
                            </label>
                          </div>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormLabelInput
                  form={form}
                  name="isi"
                  placeholder="Ketikka pesan anda"
                  type="text"
                  className="w-full"
                />
              </div>
              <div className="flex items-center gap-24">
                <button
                  type="submit"
                  className="rounded-2xl bg-[#1B2F69] px-32 py-16 text-white hover:bg-opacity-80 phones:w-full"
                >
                  Kirim
                </button>
              </div>
            </form>
          </Form>
        )}
        {data?.ticket?.status !== 2 && (
          <Form {...formClose}>
            <form
              onSubmit={formClose.handleSubmit(handleSubmitClose)}
              className="flex h-full gap-24 phones:flex-col"
            >
              <button
                type="submit"
                disabled={loadingClose || data?.ticket?.status === 2}
                className={`${data?.ticket?.status === 2 ? 'cursor-not-allowed bg-opacity-50' : 'hover:bg-opacity-80'} text-nowrap rounded-2xl bg-rose-800 px-32 py-16 text-white  phones:w-full`}
              >
                Tutup Tiket
              </button>
            </form>
          </Form>
        )}
      </div>
      <div className="flex w-full flex-wrap items-start gap-32 whitespace-nowrap phones:w-full">
        {dir &&
          dir.length > 0 &&
          dir?.map((name, idx) => (
            <div
              className="relative flex w-1/5 flex-col items-center gap-4 phones:w-1/3"
              key={idx}
            >
              <div className="relative w-full">
                <img
                  src={name}
                  alt="Gambar"
                  className="h-[20rem] w-full rounded-2xl object-cover filter"
                  loading="lazy"
                />
                <span className="absolute right-2 top-2 rounded-lg bg-danger-700 p-4 text-white hover:cursor-pointer hover:bg-danger">
                  <Trash
                    size={15}
                    onClick={(e) => {
                      e.stopPropagation()
                      handleRemoveItem(idx)
                    }}
                  />
                </span>
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}
