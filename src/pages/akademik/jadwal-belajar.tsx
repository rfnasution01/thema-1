import { bgPrimary500 } from '@/libs/helpers/format-color'
import { getThemeSlice } from '@/store/reducer/stateTheme'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import 'dayjs/locale/id'
import { IdentitasType } from '@/libs/types/beranda-type'
import { useGetIdentitasQuery } from '@/store/slices/berandaAPI'
import Loading from '@/components/Loading'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { TableJadwal } from './table-jadwal'
import { JadwalSchema } from '@/libs/schema/jadwal-schema'
import {
  useGetJadwalBelajarQuery,
  useGetNamaKelasQuery,
  useGetTahunAkademikQuery,
} from '@/store/slices/JadwalAPI'
import {
  JadwalType,
  NamaKelasType,
  TahunAkademikType,
} from '@/libs/types/jadwal-type'
import { useInView } from 'react-intersection-observer'
import { SingleSkeleton } from '@/components/skeleton-component'

export default function Absensi() {
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

  const [listTahunAkademik, setListTahunAkademik] = useState<
    TahunAkademikType[]
  >([])

  const {
    data: dataTA,
    isSuccess: successTA,
    isLoading: loadingTA,
    isFetching: fetchingTA,
  } = useGetTahunAkademikQuery()

  useEffect(() => {
    if (!fetchingTA) {
      if (dataTA?.meta?.page > 1) {
        setListTahunAkademik((prevData) => [
          ...prevData,
          ...(dataTA?.data ?? []),
        ])
      } else {
        setListTahunAkademik([...(dataTA?.data ?? [])])
      }
    }
  }, [dataTA])

  const [listNamaKelas, setListNamaKelas] = useState<NamaKelasType[]>([])

  const {
    data: dataKelas,
    isSuccess: successKelas,
    isLoading: loadingKelas,
    isFetching: fetchingKelas,
  } = useGetNamaKelasQuery()

  useEffect(() => {
    if (!fetchingKelas) {
      if (dataKelas?.meta?.page > 1) {
        setListNamaKelas((prevData) => [
          ...prevData,
          ...(dataKelas?.data ?? []),
        ])
      } else {
        setListNamaKelas([...(dataKelas?.data ?? [])])
      }
    }
  }, [dataKelas])

  const [identitas, setIdentitas] = useState<IdentitasType>()
  const {
    data: identitasData,
    isLoading: isLoadingIdentitas,
    isFetching: isFetchingIdentitas,
  } = useGetIdentitasQuery()

  useEffect(() => {
    if (identitasData?.data) {
      setIdentitas(identitasData?.data)
    }
  }, [identitasData?.data])

  const loadingIdentitas = isLoadingIdentitas || isFetchingIdentitas

  const form = useForm<zod.infer<typeof JadwalSchema>>({
    resolver: zodResolver(JadwalSchema),
    defaultValues: {},
  })

  const taAktif = listTahunAkademik?.find((item) => item?.status_aktif === 1)
  const defaultValueKelas = listNamaKelas?.[0]

  const nama_kelas = form.watch('nama_kelas')
  const tahun_akademik = form.watch('tahun_akademik')
  const id_kelas = form.watch('id_kelas')

  const [jadwal, setJadwal] = useState<JadwalType[]>([])
  const {
    data: jadwalData,
    isLoading: isLoadingJadwal,
    isFetching: isFetchingJadwal,
  } = useGetJadwalBelajarQuery(
    {
      id_ta: tahun_akademik ?? taAktif?.id,
      tingkat_kelas: nama_kelas ?? defaultValueKelas?.nama_kelas,
      id_kelas: id_kelas ?? '',
    },
    { skip: !listTahunAkademik || !taAktif || !defaultValueKelas },
  )

  useEffect(() => {
    if (jadwalData?.data) {
      setJadwal(jadwalData?.data)
    }
  }, [jadwalData?.data, tahun_akademik, nama_kelas, id_kelas])

  const loadingJadwal = isLoadingJadwal || isFetchingJadwal

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

  return (
    <div className="scrollbar flex h-screen w-full flex-col overflow-y-auto bg-white phones:bg-background">
      {loadingIdentitas ? (
        <Loading />
      ) : (
        <>
          {/* --- Header --- */}
          <div
            ref={ref}
            className={`${bgPrimary500(color)} flex items-center justify-center gap-32 px-[40rem] py-32 text-[5rem]`}
          >
            {!isLoaded ? (
              <div className="flex w-full items-center gap-32">
                <SingleSkeleton width="w-[30%]" height="h-[4rem]" />
                <SingleSkeleton width="w-[70%]" height="h-[6rem]" />
              </div>
            ) : (
              <>
                <div className="flex flex-1 flex-col items-center gap-16">
                  <p
                    className="font-sans text-[2.8rem]"
                    style={{ fontWeight: 100 }}
                  >
                    Jadwal Pelajaran{' '}
                    <span className="font-bold">{identitas?.nama_website}</span>
                  </p>
                </div>
              </>
            )}
          </div>

          <div className="scrollbar flex h-full flex-1 flex-col overflow-auto px-32 pb-32 pt-12">
            <TableJadwal
              data={jadwal}
              listNamaKelas={listNamaKelas}
              listTahunAkademik={listTahunAkademik}
              successKelas={successKelas}
              successTA={successTA}
              loadingKelas={loadingKelas}
              loadingTA={loadingTA}
              fetchingKelas={fetchingKelas}
              fetchingTA={fetchingTA}
              form={form}
              loadingJadwal={loadingJadwal}
            />
          </div>
        </>
      )}
    </div>
  )
}
