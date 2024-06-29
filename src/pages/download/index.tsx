import { Breadcrumb } from '@/components/Breadcrumb'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getThemeSlice } from '@/store/reducer/stateTheme'
import { SingleSkeleton } from '@/components/skeleton-component'
import { useInView } from 'react-intersection-observer'
import { convertSlugToText } from '@/libs/helpers/format-text'
import { usePathname } from '@/libs/hooks/usePathname'
import { SelectListDataPerPage } from '@/components/selects-component'
import Loading from '@/components/Loading'
import { NoData } from '@/components/NoData'
import { Pagination } from '@/components/Pagination'
import { Meta } from '@/store/api'
import { DownloadKategoriType, DownloadType } from '@/libs/types/download-type'
import {
  useGetDownloadKategoriQuery,
  useGetDownloadQuery,
} from '@/store/slices/downloadAPI'
import { bgPrimary100, bgPrimary700 } from '@/libs/helpers/format-color'
import { Link } from 'react-router-dom'
import { Download, Search } from 'lucide-react'
import { debounce } from 'lodash'

export default function DownloadFile() {
  const stateColor = useSelector(getThemeSlice)?.color
  const [pageNumber, setPageNumber] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(12)
  const [search, setSearch] = useState<string>('')
  const [idKategori, setIdKategori] = useState<string>('')

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

  // --- Download ---
  const [Downloads, setDownloads] = useState<DownloadType[]>([])
  const [header, setHeader] = useState<Meta>()

  const {
    data: dataDownload,
    isFetching: isFetchingDownload,
    isLoading: isLoadingDownload,
  } = useGetDownloadQuery({
    id_kategori: idKategori ?? '',
    page_size: pageSize,
    page_number: pageNumber,
    search: search ?? '',
  })

  const loadingDownload = isFetchingDownload || isLoadingDownload

  useEffect(() => {
    if (dataDownload?.data) {
      setDownloads(dataDownload?.data)
      setHeader(dataDownload?.meta)
    }
  }, [dataDownload?.data, idKategori])

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

  const [DownloadKategori, setDownloadKategori] = useState<
    DownloadKategoriType[]
  >([])

  const {
    data: dataDownloadKategori,
    isFetching: isFetchingDownloadKategori,
    isLoading: isLoadingDownloadKategori,
  } = useGetDownloadKategoriQuery()

  const loadingDownloadKategori =
    isFetchingDownloadKategori || isLoadingDownloadKategori

  useEffect(() => {
    if (dataDownloadKategori?.data) {
      setDownloadKategori(dataDownloadKategori?.data)
    }
  }, [dataDownloadKategori?.data])

  const handleSearch = debounce((searchValue: string) => {
    setPageNumber(1)
    setSearch(searchValue)
  }, 300)

  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    handleSearch(value)
  }

  const handleClick = () => {
    const inputElement = document.querySelector(
      'input[type="text"]',
    ) as HTMLInputElement
    handleSearch(inputElement.value)
  }

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
              <div className="flex w-1/2 justify-end phones:w-full">
                <input
                  type="text"
                  className="h-1/2 w-4/6 rounded-lg border border-gray-300 p-16 text-[2rem] focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 phones:h-full phones:w-full"
                  placeholder="Search"
                  onChange={(e) => onSearch(e)}
                />
                <button
                  className={`${bgPrimary700(color)} px-12`}
                  type="button"
                  style={{
                    borderTopRightRadius: '1rem',
                    borderBottomRightRadius: '1rem',
                  }}
                  onClick={() => handleClick()}
                >
                  <Search size={20} />
                </button>
              </div>
            </div>

            {loadingDownload || loadingDownloadKategori ? (
              <Loading />
            ) : (
              <div className="flex w-full justify-between gap-32 phones:flex-col">
                <div className="scrollbar w-1/6 overflow-auto  phones:w-full">
                  <div className="flex flex-col gap-16 rounded-2xl border bg-white p-32 shadow-lg">
                    <p>Kategori: </p>
                    <div className="flex flex-wrap items-center gap-12">
                      {DownloadKategori?.map((item, idx) => (
                        <div
                          key={idx}
                          className={`flex flex-shrink-0 ${item?.id === idKategori ? 'bg-opacity-100' : 'bg-opacity-80'} cursor-pointer items-center gap-12 text-[1.6rem] hover:bg-opacity-100 ${bgPrimary100(color)} rounded-2xl px-16 py-8`}
                          onClick={() => setIdKategori(item?.id)}
                        >
                          {item?.nama}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="w-5/6 phones:w-full">
                  <div className="flex flex-col gap-16 rounded-2xl border bg-white p-32 shadow-lg">
                    <p>
                      Berikut ini adalah beberapa file yang sering digunakan
                      untuk melakukan beberapa kegiatan. Mungkin anda juga
                      membutuhkannya:{' '}
                    </p>
                    <div className="ga-16 flex flex-col">
                      {Downloads?.length > 0 ? (
                        Downloads?.map((item, idx) => (
                          <Link
                            to={item?.url}
                            target="_blank"
                            className="flex w-1/2 items-center justify-between gap-32 border-b p-12 phones:w-full"
                            key={idx}
                          >
                            <p className="phones:w-7/12">
                              {idx + 1}. {item?.judul}
                            </p>
                            <p className="flex justify-end phones:w-4/12">
                              <div
                                className={`${bgPrimary100(color)} rounded-lg p-8`}
                              >
                                <Download size={16} />
                              </div>
                            </p>
                          </Link>
                        ))
                      ) : (
                        <div className="col-span-12">
                          <NoData />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <SingleSkeleton height="h-[30vh]" />
        )}
      </div>
      {/* --- Footer --- */}
      <div className="flex items-center justify-end px-64 phones:px-32">
        <SelectListDataPerPage setDataPerPage={setPageSize} />
        {Download?.length > 0 && (
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
