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
  useCreateKontakMutation,
  useLazyGetKodeQuery,
} from '@/store/slices/kontakAPI'
import 'react-toastify/dist/ReactToastify.css'
import { ModalKode } from '@/components/modal-component/modal-kode'

export default function Kontak() {
  const [urls, setUrls] = useState<string[]>([])
  const [kode, setKode] = useState<string>('')
  const [isShow, setIsShow] = useState<boolean>(false)
  const stateColor = useSelector(getThemeSlice)?.color

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
    try {
      const res = await createUpload({ body: body })
      setKode(res?.data?.data)
    } catch (error) {
      console.error('Gagal mengunggah file:', error)
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
      //   window.location.reload()
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
      await handleSubmitToken({ kode_tiket: values?.token })
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    if (isSuccess) {
      toast.success('Berhasil buka percakapan!', {
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
