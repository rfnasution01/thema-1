import { NoData } from '@/components/NoData'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  bgHoverPrimary100,
  bgPrimary100,
  bgPrimary700,
} from '@/libs/helpers/format-color'
import { useInView } from 'react-intersection-observer'
import { TestimoniType } from '@/libs/types/testimoni-type'
import { useGetTestimoniQuery } from '@/store/slices/testimoniAPI'
import { ChevronRight } from 'lucide-react'
import { useDispatch } from 'react-redux'
import { setStateHalaman } from '@/store/reducer/stateIdHalaman'
import { SingleSkeleton } from '@/components/skeleton-component'
import { IconLeft, IconRight } from '@/assets'
import { HomeCardTestimoni } from './home-card-testimoni'
import { convertToSlug } from '@/libs/helpers/format-text'

export function HomeTestimoni({ color }: { color: string }) {
  const [showIndex, setShowIndex] = useState<number>(0)

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

  // --- Testimoni ---
  const [testimoni, setTestimoni] = useState<TestimoniType[]>([])
  const {
    data: dataTestimoni,
    isFetching: isFetchingTestimoni,
    isLoading: isLoadingTestimoni,
  } = useGetTestimoniQuery({
    page_number: 1,
    page_size: 100,
  })

  const loadingTestimoni = isFetchingTestimoni || isLoadingTestimoni

  useEffect(() => {
    if (dataTestimoni?.data) {
      setTestimoni(dataTestimoni?.data)
    }
  }, [dataTestimoni?.data])

  const dispatch = useDispatch()

  return (
    <div className="flex w-full flex-col gap-32 px-64 phones:px-32">
      {/* --- Title --- */}
      <div className="flex flex-col items-center justify-center gap-16">
        <img
          src="/img/block-icon-testimoni.png"
          alt="Pengumuman"
          loading="lazy"
          className="h-[15rem] w-[15rem]"
        />
        <p className="text-[4rem] font-bold">Apa kata mereka?</p>
      </div>
      {loadingTestimoni ? (
        <SingleSkeleton height="h-[30vh]" />
      ) : (
        <div ref={ref}>
          {isLoaded ? (
            <>
              <div className="block phones:hidden">
                {testimoni?.length > 0 ? (
                  <div className="flex flex-col gap-24">
                    <div className="flex items-center gap-32">
                      {/* Mapping Data */}
                      <div className="grid flex-1 grid-cols-12 gap-32">
                        {testimoni
                          ?.slice(showIndex, showIndex + 3)
                          ?.map((item, idx) => (
                            <Link
                              to={`/testimonial/page/${convertToSlug(item?.nama)}`}
                              key={idx}
                              className="col-span-4 h-full phones:col-span-12"
                              onClick={() => {
                                localStorage.setItem('beritaID', item?.id)
                                dispatch(
                                  setStateHalaman({
                                    page: item?.nama,
                                    id: item?.id,
                                  }),
                                )
                              }}
                            >
                              <div
                                className={`${bgHoverPrimary100(color)} flex h-full flex-col items-center justify-center gap-32 rounded-2xl border bg-white p-32 shadow hover:cursor-pointer`}
                              >
                                <div className="flex items-center justify-center">
                                  <img
                                    src={item?.photo ?? '/img/tutwuri.png'}
                                    alt={item?.nama}
                                    loading="lazy"
                                    className="h-[20rem] w-[20rem] rounded-full"
                                  />
                                </div>
                                <div className="flex flex-col items-center justify-center gap-16">
                                  <p className="text-[3rem] font-bold">
                                    {item?.nama}
                                  </p>
                                  <div
                                    dangerouslySetInnerHTML={{
                                      __html: item?.isi,
                                    }}
                                    className="line-clamp-4 text-center"
                                  />
                                </div>
                                <div
                                  className={`p-12 ${bgPrimary100(color)} rounded-full`}
                                >
                                  <ChevronRight size={24} />
                                </div>
                              </div>
                            </Link>
                          ))}
                      </div>
                    </div>
                    <div className="flex items-center justify-center gap-24">
                      <button
                        disabled={testimoni?.length <= 3}
                        type="button"
                        className={`hover:cursor-pointer ${testimoni?.length <= 3 ? 'opacity-50' : 'opacity-100'}`}
                        onClick={() => {
                          if (showIndex > 0) {
                            setShowIndex(showIndex - 1)
                          } else {
                            setShowIndex(testimoni?.length - 3)
                          }
                        }}
                      >
                        <IconLeft />
                      </button>
                      <button
                        type="button"
                        disabled={testimoni?.length <= 3}
                        className={`hover:cursor-pointer ${testimoni?.length <= 3 ? 'opacity-50' : 'opacity-100'}`}
                        onClick={() => {
                          if (showIndex < testimoni?.length - 3) {
                            setShowIndex(showIndex + 1)
                          } else {
                            setShowIndex(0)
                          }
                        }}
                      >
                        <IconRight />
                      </button>
                    </div>
                  </div>
                ) : (
                  <NoData />
                )}
              </div>
              <div className="hidden phones:block">
                {testimoni?.length > 0 ? (
                  <div className="flex items-center gap-32">
                    {/* Mapping Data */}
                    <div className="flex h-full w-full items-center gap-32 overflow-x-auto phones:p-32">
                      {testimoni?.map((item, idx) => (
                        <Link
                          to={`/testimonial/page/${convertToSlug(item?.nama)}`}
                          key={idx}
                          className="w-4/5 flex-shrink-0 flex-grow"
                          onClick={() => {
                            localStorage.setItem('beritaID', item?.id)
                            dispatch(
                              setStateHalaman({
                                page: item?.nama,
                                id: item?.id,
                              }),
                            )
                          }}
                        >
                          <HomeCardTestimoni props={item} />
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <NoData />
                )}
              </div>
            </>
          ) : (
            <>
              <div className="flex gap-32 phones:hidden">
                <SingleSkeleton height="h-[50vh]" width="w-1/3" />
                <SingleSkeleton height="h-[50vh]" width="w-1/3" />
                <SingleSkeleton height="h-[50vh]" width="w-1/3" />
              </div>
              <div className="hidden phones:block">
                <SingleSkeleton height="h-[50vh]" width="w-full" />
              </div>
            </>
          )}
        </div>
      )}
      <div className="flex items-center justify-center">
        <Link
          to={'/testimonial'}
          className={`${bgPrimary700(color)} text-nowrap rounded-lg px-24 py-12 `}
        >
          Lihat Semua
        </Link>
      </div>
    </div>
  )
}
