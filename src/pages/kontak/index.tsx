import { Breadcrumb } from '@/components/Breadcrumb'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getThemeSlice } from '@/store/reducer/stateTheme'
import { SingleSkeleton } from '@/components/skeleton-component'
import { useInView } from 'react-intersection-observer'
import { convertSlugToText } from '@/libs/helpers/format-text'
import { usePathname } from '@/libs/hooks/usePathname'
import Loading from '@/components/Loading'
import { IdentitasType } from '@/libs/types/beranda-type'
import { useGetIdentitasQuery } from '@/store/slices/berandaAPI'
import 'leaflet/dist/leaflet.css'
import { Peta } from './Peta'
import { Pertanyaan } from './Pertanyaan'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { InputToken, KontakSchema } from '@/libs/schema/kontak-schema'
import { Bounce, ToastContainer, toast } from 'react-toastify'
import {
  useCreateFileMutation,
  useCreateKontakMutation,
  useLazyGetKodeQuery,
} from '@/store/slices/kontakAPI'
import 'react-toastify/dist/ReactToastify.css'
import { ModalKode } from '@/components/modal-component/modal-kode'
import { useNavigate } from 'react-router-dom'

export default function Kontak() {
  const [urls, setUrls] = useState<string[]>([])
  const [kode, setKode] = useState<string>('')
  const [isShow, setIsShow] = useState<boolean>(false)
  const stateColor = useSelector(getThemeSlice)?.color
  const [angka1, setAngka1] = useState<number>(null)
  const [angka2, setAngka2] = useState<number>(null)
  const [hasil, setHasil] = useState<number>(null)
  // Fungsi untuk menghasilkan dua angka acak antara 1 dan 10
  const generateRandomNumbers = () => {
    const random1 = Math.floor(Math.random() * 10) + 1 // Menghasilkan angka acak antara 1 dan 10
    const random2 = Math.floor(Math.random() * 10) + 1
    setAngka1(random1)
    setAngka2(random2)
  }

  useEffect(() => {
    generateRandomNumbers()
  }, [])

  useEffect(() => {
    if (stateColor) {
      setColor(stateColor)
    }
  }, [stateColor])

  const colorParams = localStorage.getItem('themeColor')

  const baseColor = import.meta.env.VITE_BASE_THEME
  const [color, setColor] = useState<string>(
    colorParams ?? stateColor ?? baseColor,
  )

  // --- Identitas ---
  const [Identitass, setIdentitass] = useState<IdentitasType>()

  const {
    data: dataIdentitas,
    isFetching: isFetchingIdentitas,
    isLoading: isLoadingIdentitas,
  } = useGetIdentitasQuery()

  const loadingIdentitas = isFetchingIdentitas || isLoadingIdentitas

  useEffect(() => {
    if (dataIdentitas?.data) {
      setIdentitass(dataIdentitas?.data)
    }
  }, [dataIdentitas?.data])

  const [isLoaded, setIsLoaded] = useState(false)
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  useEffect(() => {
    if (inView) {
      // Simulate data fetching
      setTimeout(() => {
        setIsLoaded(true)
      }, 1000) // Adjust the delay as needed
    }
  }, [inView])

  const { firstPathname } = usePathname()

  const form = useForm<zod.infer<typeof KontakSchema>>({
    resolver: zodResolver(KontakSchema),
    defaultValues: {},
  })

  const formToken = useForm<zod.infer<typeof InputToken>>({
    resolver: zodResolver(InputToken),
    defaultValues: {},
  })

  // --- Create Upload ---
  const [
    createUpload,
    {
      isError: isErrorUpload,
      error: errorUpload,
      isLoading: isLoadingUpload,
      isSuccess: isSuccessUpload,
    },
  ] = useCreateKontakMutation()

  const handleSubmit = async () => {
    const values = form.getValues()

    const body = {
      nama_depan: values?.nama_depan,
      nama_belakang: values?.nama_belakang,
      email: values.email,
      hp: values?.email,
      pesan: values?.pesan,
      berkas: urls,
    }
    if (Number(hasil) === angka1 + angka2) {
      try {
        const res = await createUpload({ body: body })
        setKode(res?.data?.data)
      } catch (error) {
        console.error('Gagal mengunggah file:', error)
      }
    } else {
      toast.error(`Jawaban salah!`, {
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
    }
  }

  useEffect(() => {
    if (isSuccessUpload) {
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
      setIsShow(true)
      // window.location.reload()
    }
  }, [isSuccessUpload])

  useEffect(() => {
    if (isErrorUpload) {
      const errorMsg = errorUpload as { data?: { message?: string } }

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
  }, [isErrorUpload, errorUpload])

  const [handleSubmitToken, { isSuccess, isError, error }] =
    useLazyGetKodeQuery()

  const handleTokenSubmit = async () => {
    const values = formToken.getValues()

    try {
      const res = await handleSubmitToken({ kode_tiket: values?.token })
      console.log({ res })

      localStorage.setItem('tiketData', JSON.stringify(res?.data))
    } catch (error) {
      console.error(error)
    }
  }

  const navigate = useNavigate()

  useEffect(() => {
    if (isSuccess) {
      toast.success('Berhasil buka percakapan!', {
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
      setTimeout(() => {
        navigate(`/tiket`)
      }, 3000)
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

  const [dir, setDir] = useState(form.watch('berkas') ?? [])

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
    <div className="mb-80 mt-32 flex flex-col gap-32">
      <Breadcrumb color={color} />

      <div ref={ref} className="flex flex-col gap-32 px-64 phones:px-32">
        {isLoaded ? (
          <div
            className={
              'flex flex-col gap-32 phones:border-transparent phones:shadow-none'
            }
          >
            {/* Title  */}
            <div className="flex items-center justify-between gap-32 phones:flex-col phones:items-start">
              <p className="font-roboto text-[5rem]">
                {convertSlugToText(firstPathname)}
              </p>
            </div>

            {loadingIdentitas ? (
              <Loading />
            ) : (
              <div className="flex w-full flex-col gap-32 phones:flex-col">
                <Peta identitas={Identitass} />
                <Pertanyaan
                  identitas={Identitass}
                  form={form}
                  formToken={formToken}
                  handleSubmitKontak={handleSubmit}
                  setUrls={setUrls}
                  isLoadingUpload={isLoadingUpload}
                  handleSubmitTiket={handleTokenSubmit}
                  handleUploadFoto={handleUploadFoto}
                  setDir={setDir}
                  dir={dir}
                  loadingFile={loadingFile}
                  angka1={angka1}
                  angka2={angka2}
                  hasil={hasil}
                  setHasil={setHasil}
                />
              </div>
            )}
          </div>
        ) : (
          <SingleSkeleton height="h-[30vh]" />
        )}
      </div>
      {kode !== '' && (
        <ModalKode kode={kode} isOpen={isShow} setIsOpen={setIsShow} />
      )}
      <ToastContainer />
    </div>
  )
}
