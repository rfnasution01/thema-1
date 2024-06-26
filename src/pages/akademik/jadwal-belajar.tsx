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
import { Form } from '@/components/Form'
import { TableJadwal } from './table-jadwal'
import {
  SelectListNamaKelas,
  SelectListTahunAkademik,
} from '@/components/selects-component'
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
import { NoData } from '@/components/NoData'

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

  return (
    <div className="scrollbar flex h-screen w-full flex-col overflow-y-auto bg-white phones:bg-background">
      {loadingIdentitas ? (
        <Loading />
      ) : (
        <>
          {/* --- Header --- */}
          <div
            className={`${bgPrimary500(color)} flex items-center justify-center gap-32 px-[40rem] py-32 text-[5rem]`}
          >
            <div className="flex items-center gap-16">
              <img src={identitas?.logo} alt="Logo" className="w-[8rem]" />
              <p className="font-sans text-[2.4rem]">
                {identitas?.nama_website}
              </p>
            </div>
            <div className="flex flex-1 flex-col gap-16">
              <p
                className="font-sans text-[2.8rem]"
                style={{ fontWeight: 100 }}
              >
                Jadwal Pelajaran{' '}
                <span className="font-bold">{identitas?.nama_website}</span>
              </p>
              <Form {...form}>
                <form className="flex w-full items-center gap-80 text-[2.8rem]">
                  {listTahunAkademik && (
                    <div className="flex w-2/3 items-center gap-12 phones:w-full">
                      <p
                        className="text-nowrap font-sans"
                        style={{ fontWeight: 100 }}
                      >
                        Tahun Akademik:
                      </p>
                      <SelectListTahunAkademik
                        name="tahun_akademik"
                        useFormReturn={form}
                        placeholder="Pilih Tahun Akademik"
                        listTahunAkademik={listTahunAkademik}
                        isLoading={loadingTA}
                        isFetching={fetchingTA}
                        isSuccess={successTA}
                      />
                    </div>
                  )}
                  {listNamaKelas && (
                    <div className="phones:ww-full flex w-1/3 items-center gap-12">
                      <p className="font-sans" style={{ fontWeight: 100 }}>
                        Kelas
                      </p>
                      <SelectListNamaKelas
                        name="id_kelas"
                        useFormReturn={form}
                        placeholder="Pilih Nama"
                        listNamaKelas={listNamaKelas}
                        isFetching={fetchingKelas}
                        isLoading={loadingKelas}
                        isSuccess={successKelas}
                      />
                    </div>
                  )}
                </form>
              </Form>
            </div>
          </div>

          <div className="scrollbar flex flex-1 flex-col overflow-y-auto px-[20rem] py-32">
            {loadingJadwal ? (
              <Loading />
            ) : jadwal?.length === 0 ? (
              <NoData />
            ) : (
              <TableJadwal data={jadwal} />
            )}
          </div>
        </>
      )}
    </div>
  )
}
