import { bgPrimary500, bgPrimary700 } from '@/libs/helpers/format-color'
import { getThemeSlice } from '@/store/reducer/stateTheme'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import 'dayjs/locale/id'
import Time from '@/components/Time'
import { LabelComponent } from './LabelComponent'
import { IdentitasType } from '@/libs/types/beranda-type'
import { useGetIdentitasQuery } from '@/store/slices/berandaAPI'
import Loading from '@/components/Loading'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { NoData } from '@/components/NoData'
import { AbsensiType } from '@/libs/types/absensi-tyoe'
import { useGetAbsensiQuery } from '@/store/slices/absensiAPI'
import { AbsensiSchema } from '@/libs/schema/absensi-schema'
import { TableAbsensi } from './table-absensi'
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

  const form = useForm<zod.infer<typeof AbsensiSchema>>({
    resolver: zodResolver(AbsensiSchema),
    defaultValues: {},
  })

  const tanggal = form.watch('tanggal')
  const [absensi, setAbsensi] = useState<AbsensiType>()
  const {
    data: absensiData,
    isLoading: isLoadingAbsensi,
    isFetching: isFetchingAbsensi,
  } = useGetAbsensiQuery({
    tanggal: tanggal,
  })

  useEffect(() => {
    if (absensiData?.data) {
      setAbsensi(absensiData?.data)
    }
  }, [absensiData?.data, tanggal])

  const loadingAbsensi = isLoadingAbsensi || isFetchingAbsensi

  const defaultDay = dayjs().locale('id').format('DD-MM-YYYY')
  const splitDay = defaultDay?.split('-')
  const newvalue = `${splitDay?.[2]}-${splitDay?.[1]}-${splitDay?.[0]}`

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
    <div className="scrollbar flex h-screen w-full flex-col overflow-auto bg-white phones:bg-background">
      {loadingIdentitas ? (
        <Loading />
      ) : (
        <div className="flex h-full flex-col" ref={ref}>
          <div
            className={`${bgPrimary500(color)} flex items-center justify-center gap-32 px-[40rem] py-32 text-center text-[5rem] phones:p-32`}
          >
            {!isLoaded ? (
              <div className="flex w-full items-center gap-32">
                <SingleSkeleton width="w-[30%]" height="h-[4rem]" />
                <SingleSkeleton width="w-[70%]" height="h-[6rem]" />
              </div>
            ) : (
              <>
                <div className="flex flex-1 flex-col items-center justify-center gap-4">
                  <p
                    className="font-sans text-[2.8rem]"
                    style={{ fontWeight: 100 }}
                  >
                    Daftar Kehadiran Pegawai{' '}
                    <span className="font-bold">{identitas?.nama_website}</span>
                  </p>
                </div>
              </>
            )}
          </div>
          {loadingAbsensi ? (
            <Loading />
          ) : (
            <>
              <div
                className={`${bgPrimary700(color)} flex flex-wrap items-center justify-center gap-32 px-[20rem] py-32 text-[2rem] phones:gap-x-16 phones:gap-y-12 phones:p-32`}
              >
                {!isLoaded ? (
                  <div className="flex h-[3rem] w-full items-center gap-32">
                    <SingleSkeleton height="h-[3rem]" width="w-[10%]" />
                    <SingleSkeleton height="h-[3rem]" width="w-[10%]" />
                    <SingleSkeleton height="h-[3rem]" width="w-[10%]" />
                    <SingleSkeleton height="h-[3rem]" width="w-[10%]" />
                    <SingleSkeleton height="h-[3rem]" width="w-[10%]" />
                    <SingleSkeleton height="h-[3rem]" width="w-[10%]" />
                    <SingleSkeleton height="h-[3rem]" width="w-[10%]" />
                    <SingleSkeleton height="h-[3rem]" width="w-[10%]" />
                    <SingleSkeleton height="h-[3rem]" width="w-[10%]" />
                    <SingleSkeleton height="h-[3rem]" width="w-[10%]" />
                  </div>
                ) : (
                  <>
                    <LabelComponent
                      label="Jumlah Pegawai"
                      value={absensi?.jlh_pegawai ?? 0}
                    />
                    <LabelComponent
                      label="Ontime"
                      value={absensi?.ontime ?? 0}
                    />
                    <LabelComponent
                      label="Terlambat"
                      value={absensi?.terlambat ?? 0}
                    />
                    <LabelComponent
                      label="Sakit"
                      value={absensi?.terlambat ?? 0}
                    />
                    <LabelComponent label="Izin" value={absensi?.izin ?? 0} />
                    <LabelComponent label="Alpa" value={absensi?.alpa ?? 0} />
                    <LabelComponent label="Cuti" value={absensi?.cuti ?? 0} />
                    <LabelComponent
                      label="Tugas Luar"
                      value={absensi?.tugas_luar ?? 0}
                    />
                    <LabelComponent
                      label="Tugas Belajar"
                      value={absensi?.tugas_belajar ?? 0}
                    />
                    <LabelComponent label="WFH" value={absensi?.wfh ?? 0} />
                  </>
                )}
              </div>
              {absensi?.presensi?.length === 0 ? (
                <div className="flex-1 py-32">
                  <NoData />
                </div>
              ) : (
                <div className="scrollbar flex h-full flex-1 flex-col gap-32 overflow-y-auto px-[20rem] pb-32 pt-12 phones:p-32">
                  <TableAbsensi
                    item={absensi?.presensi}
                    newvalue={newvalue}
                    form={form}
                  />
                </div>
              )}
            </>
          )}
          <div
            className={`${bgPrimary700(color)} flex items-center justify-between gap-32 px-32 py-32 text-[2rem] phones:text-[2.4rem]`}
          >
            {!isLoaded ? (
              <div className="flex w-full items-center">
                <SingleSkeleton width="w-[20%]" height="h-[3rem]" />
                <SingleSkeleton width="w-[20%]" height="h-[3rem]" />
              </div>
            ) : (
              <>
                <div className="flex flex-col items-center justify-center gap-12">
                  <Time />
                </div>
                <div className="flex items-center gap-32 overflow-hidden">
                  <p className="animate-marquee text-nowrap text-center text-[2.4rem] text-white">
                    Diberitahukan kepada seluruh ASN, Tenaga Kerja, dan Pegawai
                    yang melakukan absensi online melalui handphone agar memfoto
                    wajah dengan{' '}
                    <span className="font-bold">
                      jelas tanpa penggunakan helm dan masker.
                    </span>
                  </p>
                </div>

                <div className="flex flex-col items-center justify-center gap-12">
                  <p className="text-nowrap">
                    {dayjs(tanggal).locale('id').format('dddd, DD/MM/YYYY')}
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
