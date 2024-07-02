/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/Form'
import { FormLabelInput, Input } from '@/components/input'
import { IdentitasType } from '@/libs/types/beranda-type'
import { Link } from 'react-router-dom'
import { IconFacebook, IconGoogle, IconInstagram, IconYoutube } from '@/assets'
import { UseFormReturn } from 'react-hook-form'
import { Image, Trash, Upload } from 'lucide-react'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { Bounce, toast } from 'react-toastify'
import { useCreateFileMutation } from '@/store/slices/kontakAPI'

export function Pertanyaan({
  identitas,
  handleSubmitKontak,
  form,
  formToken,
  isLoadingUpload,
  setUrls,
  handleSubmitTiket,
}: {
  identitas: IdentitasType
  handleSubmitKontak: () => Promise<void>
  handleSubmitTiket: () => Promise<void>
  form: UseFormReturn
  formToken: UseFormReturn
  isLoadingUpload?: boolean
  setUrls: Dispatch<SetStateAction<string[]>>
}) {
  const [uploadFileMutation] = useCreateFileMutation()

  const handleUploadFoto = async (file: File) => {
    const formatData = new FormData()
    formatData.append('berkas', file)

    try {
      const res = await uploadFileMutation(formatData)
      setDir([...dir, res?.data?.url])
    } catch (e) {
      console.error(e)
      toast.error(`Data gagal disimpan`, {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
        transition: Bounce,
      })
    }
  }

  const [dir, setDir] = useState(form.watch('berkas') ?? [])

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
    <div className="flex gap-48 phones:flex-col">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmitKontak)}
          className="flex w-3/5 flex-col gap-32 rounded-3xl border p-32 shadow-md phones:w-full"
        >
          <FormLabelInput
            form={form}
            name="nama_depan"
            label="Nama Depan*"
            placeholder="Isi Nama Depan"
            type="text"
            className="w-full"
          />

          <FormLabelInput
            form={form}
            name="nama_belakang"
            label="Nama Belakang*"
            placeholder="Isi Nama Belakang"
            type="text"
            className="w-full"
          />

          <FormLabelInput
            form={form}
            name="email"
            label="Email*"
            placeholder="Isi Email"
            type="email"
            className="w-full"
          />

          <FormLabelInput
            form={form}
            name="hp"
            label="Hp*"
            placeholder="Isi Nomor HP"
            type="text"
            className="w-full"
            isNumber
          />

          <FormLabelInput
            form={form}
            name="pesan"
            label="Pesan*"
            placeholder="Isi Pesan"
            type="text"
            className="w-full"
          />

          <FormField
            name="berkas"
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex flex-col space-y-2">
                <FormControl>
                  <div>
                    <Input
                      className="absolute -z-[1] h-[0.1px] w-[0.1px] overflow-hidden opacity-0"
                      {...field}
                      id="berkas"
                      type="file"
                      value={''}
                      disabled={isLoadingUpload}
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
                        className="flex w-1/2 flex-col items-center gap-24 rounded-lg border-2 border-dashed border-primary p-48 text-primary hover:cursor-pointer phones:w-full"
                        htmlFor="berkas"
                      >
                        <span>
                          <Upload size={32} />
                        </span>
                        Unggah File
                      </label>

                      <div className="flex w-1/2 flex-col whitespace-nowrap phones:w-full">
                        {dir && dir.length > 0 ? (
                          dir?.map((name, idx) => (
                            <div
                              className="flex items-center justify-between gap-16 p-8 hover:cursor-pointer hover:text-primary"
                              key={idx}
                            >
                              <Link
                                to={name}
                                className="flex w-full flex-1 items-center gap-12"
                                target="_blank"
                              >
                                <Image size={16} />
                                <p className="line-clamp-1 overflow-hidden">
                                  {name}
                                </p>
                              </Link>
                              <Trash
                                size={15}
                                className="hover:cursor-pointer"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  handleRemoveItem(idx)
                                }}
                              />
                            </div>
                          ))
                        ) : (
                          <div>Belum ada file di upload</div>
                        )}
                      </div>
                    </div>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex">
            <button
              type="submit"
              className="rounded-2xl bg-[#0D1A4B] px-32 py-16 text-white"
            >
              Kirim Pesan
            </button>
          </div>
        </form>
      </Form>
      <div className="flex w-2/5 flex-col gap-80">
        {/* --- Group Alamat --- */}
        <div className="flex w-2/3 flex-col gap-32">
          {/* --- Alamat --- */}
          <div className="flex flex-col gap-32">
            <p className="border-b border-black pb-8 text-[2.4rem] font-bold">
              Alamat
            </p>
            <div className="flex flex-col gap-8">
              <p className="font-bold" style={{ lineHeight: '130%' }}>
                {identitas?.alamat ?? '-'}
              </p>
              <p>{identitas?.kota ?? '-'}</p>
            </div>
          </div>
          {/* --- No Hp --- */}
          <div className="flex flex-col gap-8">
            <p>
              <span className="underline">Phone</span>:{' '}
              {identitas?.telepon ?? '-'}
            </p>
            <p>
              <span className="underline">Fax</span>: -
            </p>
            <p>
              <span className="underline">Email</span>:{' '}
              {identitas?.email ?? '-'}
            </p>
          </div>
          {/* --- Sosial Media --- */}
          <div className="flex items-center gap-16">
            <Link
              target="_blank"
              className="duration-300 hover:-translate-y-12"
              to={`https://www.facebook.com/${identitas?.fb}`}
            >
              <IconFacebook size={26} />
            </Link>
            <Link
              target="_blank"
              to={`mailto:${identitas?.email}`}
              className="duration-300 hover:-translate-y-12"
            >
              <IconGoogle size={26} />
            </Link>
            <Link
              target="_blank"
              to={`https://www.youtube.com/${identitas?.yt}`}
              className="duration-300 hover:-translate-y-12"
            >
              <IconYoutube size={26} />
            </Link>
            <Link
              className="duration-300 hover:-translate-y-12"
              target="_blank"
              to={`https://www.instagram.com/${identitas?.ig}`}
            >
              <IconInstagram size={26} />
            </Link>
          </div>
        </div>
        {/* --- Group Token --- */}
        <div className="flex w-2/3 flex-col gap-32">
          {/* --- Alamat --- */}
          <div className="flex flex-col gap-32">
            <p className="border-b border-black pb-8 text-[2.4rem] font-bold">
              Input Token
            </p>
            <p>Untuk membuka percakapan anda, masukkan kode tiket anda</p>
            <Form {...formToken}>
              <form
                onSubmit={formToken.handleSubmit(handleSubmitTiket)}
                className="flex flex-col gap-24"
              >
                <FormLabelInput
                  form={formToken}
                  name="token"
                  placeholder="Masukkan Kode Tiket"
                  type="text"
                  className="w-full"
                />
                <button
                  type="submit"
                  className="rounded-2xl bg-[#004028] px-32 py-16 text-white hover:bg-opacity-80"
                >
                  Buka Percakapan
                </button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  )
}
