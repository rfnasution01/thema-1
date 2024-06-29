import { Breadcrumb } from '@/components/Breadcrumb'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getThemeSlice } from '@/store/reducer/stateTheme'
import { SingleSkeleton } from '@/components/skeleton-component'
import { useInView } from 'react-intersection-observer'
import { convertSlugToText } from '@/libs/helpers/format-text'
import { usePathname } from '@/libs/hooks/usePathname'
import { CardTypeE, CardTypeF } from '@/components/cards-component'
import { DirektoriType } from '@/libs/types/direktori-type'
import { useGetDirektoriQuery } from '@/store/slices/direktoriAPI'
import { LabelComponent } from './LabelComponent'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { DirektoriSchema } from '@/libs/schema/direktori-schema'
import { Form } from '@/components/Form'
import {
  SelectListDataPerPage,
  SelectListKelas,
  SelectListUser,
} from '@/components/selects-component'
import Loading from '@/components/Loading'
import { NoData } from '@/components/NoData'
import { Pagination } from '@/components/Pagination'
import { Meta } from '@/store/api'

export default function Direktori() {
  const stateColor = useSelector(getThemeSlice)?.color
  const [pageNumber, setPageNumber] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(12)

  const form = useForm<zod.infer<typeof DirektoriSchema>>({
    resolver: zodResolver(DirektoriSchema),
    defaultValues: {},
  })

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

  const [user, setUser] = useState<string>('guru')
  const [kelas, setKelas] = useState<string>('')

  // --- Direktori ---
  const [direktori, setDirektori] = useState<DirektoriType[]>([])
  const [header, setHeader] = useState<Meta>()

  const {
    data: dataDirektori,
    isFetching: isFetchingDirektori,
    isLoading: isLoadingDirektori,
  } = useGetDirektoriQuery(
    {
      user: user,
      page_size: pageSize,
      page_number: pageNumber,
      kelas: kelas ?? '',
    },
    { skip: user === undefined || user === null },
  )

  const loadingDirektori = isFetchingDirektori || isLoadingDirektori

  useEffect(() => {
    if (dataDirektori?.data) {
      setDirektori(dataDirektori?.data)
      setHeader(dataDirektori?.meta)
    }
  }, [dataDirektori?.data, user])

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
            {/* Titlte  */}
            <div className="flex items-center justify-between gap-32 phones:flex-col phones:items-start">
              <p className="font-roboto text-[5rem]">
                {convertSlugToText(firstPathname)} {convertSlugToText(user)}
              </p>
              <Form {...form}>
                <form className="flex w-1/3 items-center gap-32 phones:w-full">
                  <SelectListUser
                    form={form}
                    name="user"
                    placeholder="Pilih pengguna"
                    setUser={setUser}
                    className="flex-1"
                  />

                  {user === 'siswa' && (
                    <SelectListKelas
                      useFormReturn={form}
                      name="kelas"
                      placeholder="Pilih kelas"
                      setKelas={setKelas}
                      className="flex-1"
                    />
                  )}
                </form>
              </Form>
            </div>
            <div className="grid grid-cols-12 gap-32">
              {loadingDirektori ? (
                <div className="col-span-12">
                  <Loading />
                </div>
              ) : direktori?.length > 0 ? (
                direktori?.map((item, idx) => (
                  <div
                    key={idx}
                    className="col-span-2 bg-red-300 phones:col-span-12"
                  >
                    <div className="phones:hidden">
                      <CardTypeE
                        isi={
                          user === 'guru' ? (
                            <div className="flex flex-col gap-12">
                              <LabelComponent
                                label="Pendidikan Terakhir"
                                value={item?.pendidikan_terakhir ?? '-'}
                              />
                              <LabelComponent
                                label="Status"
                                value={item?.status ?? '-'}
                              />
                            </div>
                          ) : user === 'alumni' ? (
                            ''
                          ) : (
                            `Kelas: ${item?.kelas}`
                          )
                        }
                        nama={user === 'guru' ? item?.nama : item?.nama_siswa}
                        photo={
                          user === 'guru'
                            ? item?.gambar ?? '/img/profil.png'
                            : item?.photo ?? '/img/profil.png'
                        }
                        id={user === 'guru' ? item?.id_pegawai : item?.id_siswa}
                        kelompok="direktori"
                        height="h-[40vh]"
                      />
                    </div>
                    <div className="hidden phones:block">
                      <CardTypeF
                        isi={
                          user === 'guru' ? (
                            <div className="flex flex-col gap-12">
                              <LabelComponent
                                label="Pendidikan Terakhir"
                                value={item?.pendidikan_terakhir ?? '-'}
                              />
                              <LabelComponent
                                label="Status"
                                value={item?.status ?? '-'}
                              />
                            </div>
                          ) : (
                            `Kelas: ${item?.kelas}`
                          )
                        }
                        nama={user === 'guru' ? item?.nama : item?.nama_siswa}
                        photo={
                          user === 'guru'
                            ? item?.gambar ?? '/img/profil.png'
                            : item?.photo ?? '/img/profil.png'
                        }
                        id={user === 'guru' ? item?.id_pegawai : item?.id_siswa}
                        kelompok="direktori"
                        height="h-[40vh]"
                      />
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-12">
                  <NoData />
                </div>
              )}
            </div>
          </div>
        ) : (
          <SingleSkeleton height="h-[30vh]" />
        )}
      </div>
      {/* --- Footer --- */}
      <div className="flex items-center justify-end px-64 phones:px-32">
        <SelectListDataPerPage setDataPerPage={setPageSize} />
        {direktori?.length > 0 && (
          <Pagination
            setPage={setPageNumber}
            pageNow={pageNumber ?? 0}
            lastPage={header?.last_page ?? 0}
          />
        )}
      </div>
    </div>
  )
}
