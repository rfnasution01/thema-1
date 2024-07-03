import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import {
  ChatSchema,
  CloseSchema,
  InputToken,
} from '@/libs/schema/kontak-schema'
import { useEffect, useState } from 'react'
import { Bounce, ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {
  useCreateFileMutation,
  useCreateKontakChatMutation,
  useCreateKontakCloseMutation,
  useFindKodeMutation,
  useGetKodeQuery,
} from '@/store/slices/kontakAPI'
import { ChatType } from './Chat'
import { DetailTiket } from './DetailTiket'
import { NoData } from '@/components/NoData'
import { DataTiketType } from '@/libs/types/kontak-type'
import Loading from '@/components/Loading'

export default function Tiket() {
  const [urls, setUrls] = useState<string[]>([])
  const kode = localStorage.getItem('tiketID')
  const [kodeBaru, setKodeBaru] = useState<string>(kode)

  const [dataTiket, setDataTiket] = useState<DataTiketType>()

  const { data, isLoading, isFetching } = useGetKodeQuery(
    {
      kode_tiket: kodeBaru,
    },
    {
      skip: !kodeBaru,
    },
  )

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data?.data) {
      setDataTiket(data?.data)
    }
  }, [data?.data, kode])

  const formChat = useForm<zod.infer<typeof ChatSchema>>({
    resolver: zodResolver(ChatSchema),
    defaultValues: {},
  })

  const formClose = useForm<zod.infer<typeof CloseSchema>>({
    resolver: zodResolver(CloseSchema),
    defaultValues: {},
  })

  const form = useForm<zod.infer<typeof InputToken>>({
    resolver: zodResolver(InputToken),
    defaultValues: {},
  })

  // --- Submit Token ---
  const [handleSubmitToken, { isSuccess, isError, error }] =
    useFindKodeMutation()

  const handleTokenSubmit = async () => {
    const values = form.getValues()

    const body = {
      kode_tiket: values?.token,
    }

    try {
      const res = await handleSubmitToken({ body: body })
      // setKodeTiket(values?.token)
      console.log(!res?.error)

      if (!res?.error) {
        localStorage.setItem('tiketId', values?.token)
        setKodeBaru(values?.token)
      }
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    if (isSuccess) {
      toast.success('Tiket ditemukan!', {
        position: 'bottom-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
        transition: Bounce,
      })
      form.reset()
      // refetch()
    }
  }, [isSuccess])

  useEffect(() => {
    if (isError) {
      const errorMsg = error as { data?: { message?: string } }

      toast.error(`${errorMsg?.data?.message ?? 'Terjadi Kesalahan'}`, {
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
  }, [isError, error])

  // --- Create Chat ---
  const [
    createChat,
    {
      isError: isErrorChat,
      error: errorChat,
      isLoading: isLoadingChat,
      isSuccess: isSuccessChat,
    },
  ] = useCreateKontakChatMutation()

  const handleSubmit = async () => {
    const values = formChat.getValues()

    const body = {
      id: dataTiket?.ticket?.id ?? '',
      isi: values?.isi,
      berkas: urls,
    }
    try {
      await createChat({ body: body })
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    if (isSuccessChat) {
      toast.success('Pesan berhasil dikirim!', {
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
      form.reset()
      setUrls([])
      // window.location.reload()
    }
  }, [isSuccessChat])

  useEffect(() => {
    if (isErrorChat) {
      const errorMsg = errorChat as { data?: { message?: string } }

      toast.error(`${errorMsg?.data?.message ?? 'Terjadi Kesalahan'}`, {
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
  }, [isErrorChat, errorChat])

  // --- Create Close ---
  const [
    createClose,
    {
      isError: isErrorClose,
      error: errorClose,
      isLoading: isLoadingClose,
      isSuccess: isSuccessClose,
    },
  ] = useCreateKontakCloseMutation()

  const handleSubmitClose = async () => {
    const body = {
      id: dataTiket?.ticket?.id ?? '',
    }
    try {
      await createClose({ body: body })
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    if (isSuccessClose) {
      toast.success('Tiket berhasil di tutup!', {
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
      form.reset()
      setUrls([])
      // window.location.reload()
    }
  }, [isSuccessClose])

  useEffect(() => {
    if (isErrorClose) {
      const errorMsg = errorClose as { data?: { message?: string } }

      toast.error(`${errorMsg?.data?.message ?? 'Terjadi Kesalahan'}`, {
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
  }, [isErrorClose, errorClose])

  const [dir, setDir] = useState(formChat.watch('berkas') ?? [])

  const [
    uploadFileMutation,
    {
      isSuccess: successFile,
      isError: isErrorFile,
      error: errorFile,
      isLoading: loadingFile,
    },
  ] = useCreateFileMutation()

  const handleUploadFoto = async (file: File) => {
    const formatData = new FormData()
    formatData.append('berkas', file)

    try {
      const res = await uploadFileMutation(formatData)
      setDir([...dir, res?.data?.url])
    } catch (e) {
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

  useEffect(() => {
    if (successFile) {
      toast.success('Berhasil unggah photo!', {
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
      form.reset()
    }
  }, [successFile])

  useEffect(() => {
    if (isErrorFile) {
      const errorMsg = errorFile as { data?: { message?: string } }

      toast.error(`${errorMsg?.data?.message ?? 'Terjadi Kesalahan'}`, {
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
  }, [isErrorFile, errorFile])

  return (
    <div className="flex h-full w-full phones:h-auto phones:flex-col phones:gap-32">
      {loading ? (
        <Loading />
      ) : (
        <>
          <DetailTiket
            data={dataTiket}
            form={form}
            handleTokenSubmit={handleTokenSubmit}
          />
          <div className="flex h-full w-2/3 p-32 phones:h-auto phones:w-full">
            {dataTiket ? (
              <ChatType
                handleSubmitClose={handleSubmitClose}
                loadingClose={isLoadingClose}
                data={dataTiket}
                handleChat={handleSubmit}
                form={formChat}
                dir={dir}
                setDir={setDir}
                isLoadingUpload={isLoadingChat}
                loadingFile={loadingFile}
                handleUploadFoto={handleUploadFoto}
                setUrls={setUrls}
                formClose={formClose}
              />
            ) : (
              <div className="flex w-full items-center justify-center">
                <NoData />
              </div>
            )}
          </div>
          <ToastContainer />
        </>
      )}
    </div>
  )
}
