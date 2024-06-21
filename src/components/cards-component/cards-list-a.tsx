import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setStateHalaman } from '@/store/reducer/stateIdHalaman'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { Search, Timer, User } from 'lucide-react'
import TimeSinceUploaded from '@/libs/helpers/format-time'
import { debounce } from 'lodash'
import { ListType } from '@/libs/types/list-type'
import { usePathname } from '@/libs/hooks/usePathname'
import { convertSlugToText } from '@/libs/helpers/format-text'
import { bgPrimary700 } from '@/libs/helpers/format-color'
import { IconLabel } from '../IconLabel'
import { Pagination } from '../Pagination'
import { SelectListDataPerPage } from '../selects-component'
import { useInView } from 'react-intersection-observer'
import { SingleSkeleton } from '../skeleton-component'
import Loading from '../Loading'

interface BeritaListProps<T> {
  data: T[]
  setPageNumber: Dispatch<SetStateAction<number>>
  setPageSize: Dispatch<SetStateAction<number>>
  setSearch: Dispatch<SetStateAction<string>>
  pageNumber: number
  lastPage: number
  color: string
  loading: boolean
}

export function CardListA<T extends ListType>({
  data,
  setPageNumber,
  setPageSize,
  setSearch,
  pageNumber,
  lastPage,
  color,
  loading,
}: BeritaListProps<T>) {
  const { firstPathname } = usePathname()
  const dispatch = useDispatch()

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

  const handleBeritaClick = (id) => {
    localStorage.setItem('beritaID', id)
  }

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
    <div
      className={
        'flex flex-col gap-32 px-64 phones:border-transparent phones:p-32 phones:shadow-none'
      }
    >
      <div className="flex items-center justify-between gap-32">
        <p className="font-roboto text-[5rem]">
          {convertSlugToText(firstPathname)}
        </p>
        <div className="flex w-1/2 justify-end">
          <input
            type="text"
            className="h-1/2 w-4/6 rounded-lg border border-gray-300 p-16 text-[2rem] focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 phones:w-full"
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

      <div ref={ref} className="grid grid-cols-12 gap-32">
        {isLoaded ? (
          <>
            {loading ? (
              <div className="col-span-12">
                <Loading />
              </div>
            ) : (
              <>
                {data?.map((item, idx) => (
                  <div
                    className="col-span-3 phones:col-span-12"
                    key={idx}
                    onClick={() => {
                      handleBeritaClick(item?.id)
                      dispatch(
                        setStateHalaman({ id: item?.id, page: item?.seo }),
                      )
                    }}
                  >
                    <Link
                      to={`/${firstPathname}/page/${item?.seo}`}
                      className="flex h-full flex-col gap-24 rounded-2xl bg-white px-24 pb-32 pt-24 shadow-md hover:cursor-pointer hover:shadow-lg"
                    >
                      <div className="h-[25vh] w-full">
                        <img
                          src={item?.photo?.gambar}
                          alt={item?.photo?.keterangan}
                          className="h-full w-full rounded-lg object-cover"
                          loading="lazy"
                        />
                      </div>
                      <div className="flex flex-col gap-4">
                        <p className="line-clamp-2 font-roboto text-[2.4rem] phones:text-[2.8rem]">
                          {item?.judul ?? '-'}
                        </p>
                        <div
                          dangerouslySetInnerHTML={{ __html: item?.isi }}
                          className="article-content line-clamp-3"
                        />
                      </div>
                      <div className="flex items-center justify-between gap-32 text-[1.6rem] phones:text-[2rem]">
                        <IconLabel
                          icon={<User size={12} />}
                          label={item?.penulis}
                        />
                        <IconLabel
                          icon={<Timer size={12} />}
                          label={
                            <TimeSinceUploaded uploadTime={item?.tanggal} />
                          }
                        />
                      </div>
                    </Link>
                  </div>
                ))}
              </>
            )}
          </>
        ) : (
          <div className="col-span-12 flex items-center gap-32">
            <SingleSkeleton
              height="h-[30vh] phones:h-[20vh]"
              width="w-1/4 phones:w-full"
            />
            <SingleSkeleton
              height="h-[30vh]"
              width="w-1/4"
              classname="phones:hidden"
            />
            <SingleSkeleton
              height="h-[30vh]"
              width="w-1/4"
              classname="phones:hidden"
            />
            <SingleSkeleton
              height="h-[30vh]"
              width="w-1/4"
              classname="phones:hidden"
            />
          </div>
        )}
      </div>

      {/* --- Footer --- */}
      <div className="flex items-center justify-end">
        <SelectListDataPerPage setDataPerPage={setPageSize} />
        {data?.length > 0 && (
          <Pagination
            setPage={setPageNumber}
            pageNow={pageNumber ?? 0}
            lastPage={lastPage ?? 0}
          />
        )}
      </div>
    </div>
  )
}
