import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { Bounce, ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { DetailTiket } from './DetailTiket'
import Loading from '@/components/Loading'
import {
  useCreateFileMutation,
  useCreateKontakChatMutation,
  useCreateKontakCloseMutation,
  useFindKodeMutation,
  useGetKodeQuery,
} from '@/store/slices/kontakAPI'
import { useEffect, useState } from 'react'
import {
  ChatSchema,
  CloseSchema,
  InputToken,
} from '@/libs/schema/kontak-schema'
import { DataTiketType } from '@/libs/types/kontak-type'
import { FormChat } from './FormChat'
import { FormClose } from './FormClose'
import { ChatLampiran } from './ChatLampiran'
import { ChatHistory } from './ChatHistory'

export default function Tiket() {
  const kodeParams = localStorage.getItem('tiketID')
  const [kode, setKode] = useState<string>(kodeParams)
  const [urls, setUrls] = useState<string[]>()

  const formChat = useForm<zod.infer<typeof ChatSchema>>({
    resolver: zodResolver(ChatSchema),
    defaultValues: {},
  })

  const [dir, setDir] = useState(formChat.watch('berkas') ?? [])

  const formClose = useForm<zod.infer<typeof CloseSchema>>({
    resolver: zodResolver(CloseSchema),
    defaultValues: {},
  })

  const formFind = useForm<zod.infer<typeof InputToken>>({
    resolver: zodResolver(InputToken),
    defaultValues: {},
  })

  // --- Get Token ---
  const [tiket, setTiket] = useState<DataTiketType>()
  const {
    data: dataTiket,
    isFetching: isFetchingTiket,
    isLoading: isLoadingTiket,
  } = useGetKodeQuery(
    {
      kode_tiket: kode,
    },
    { skip: !kode },
  )

  const loadingTiket = isFetchingTiket || isLoadingTiket

  useEffect(() => {
    if (dataTiket?.data) {
      setTiket(dataTiket?.data)
    }
  }, [dataTiket?.data])

  // --- Find Tiket ---
  const [
    handleFindTiket,
    {
      isSuccess: isSuccessFindTiket,
      isError: isErrorFindTiket,
      error: errorFindTiket,
    },
  ] = useFindKodeMutation()

  const handleSubmitFindTiket = async () => {
    const values = formFind.getValues()

    const body = {
      kode_tiket: values?.token,
    }

    try {
      const res = await handleFindTiket({ body: body })

      if (!res?.error) {
        localStorage.setItem('tiketID', values?.token)
        setKode(values?.token)
      }
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    if (isSuccessFindTiket) {
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
      formFind.reset()
      // refetch()
    }
  }, [isSuccessFindTiket])

  useEffect(() => {
    if (isErrorFindTiket) {
      const errorMsg = errorFindTiket as { data?: { message?: string } }

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
  }, [isErrorFindTiket, errorFindTiket])

  // --- Upload File ---
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
      console.log(e)
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

  const handleSubmitChat = async () => {
    const values = formChat.getValues()

    const body = {
      id: tiket?.ticket?.id ?? '',
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
      formChat.reset()
      setUrls([])
      setDir([])
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
      id: tiket?.ticket?.id ?? '',
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

  return (
    <>
      {loadingTiket ? (
        <div className="h-[50vh]">
          <Loading />
        </div>
      ) : (
        <div className="flex h-[90vh] w-full phones:h-auto phones:flex-col phones:gap-32">
          <div className="scrollbar h-full w-1/3 overflow-y-auto border-r p-32 phones:h-auto phones:w-full">
            <DetailTiket
              form={formFind}
              data={tiket}
              handleSubmitFindTiket={handleSubmitFindTiket}
            />
          </div>
          <div className="w-2/3 overflow-y-auto p-32 phones:h-auto phones:w-full">
            <div className="flex h-full flex-col gap-32">
              <div className="scrollbar flex flex-1 flex-col overflow-y-auto">
                <ChatHistory
                  chat={tiket?.chat}
                  nama={`${tiket?.ticket?.nama_depan} ${tiket?.ticket?.nama_belakang}`}
                />
              </div>
              <div className="flex flex-col gap-32">
                <FormChat
                  handleUploadFoto={handleUploadFoto}
                  form={formChat}
                  dir={dir}
                  setUrls={setUrls}
                  loadingFile={loadingFile}
                  data={tiket}
                  handleSubmitChat={handleSubmitChat}
                  isLoadingUpload={isLoadingChat}
                  closeButton={
                    <FormClose
                      handleSubmitClose={handleSubmitClose}
                      loadingClose={isLoadingClose}
                      form={formClose}
                      data={tiket}
                    />
                  }
                />

                {dir?.length > 0 && <ChatLampiran dir={dir} setDir={setDir} />}
              </div>
            </div>
          </div>
        </div>
      )}
      <ToastContainer />
    </>
  )
}
