import { GaleriType } from '@/libs/types/galeri-type'
import { useGetGaleriQuery } from '@/store/slices/galeriAPI'
import { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { SingleSkeleton } from '@/components/skeleton-component'
import { Link } from 'react-router-dom'
import { convertToSlug } from '@/libs/helpers/format-text'
import { setStateHalaman } from '@/store/reducer/stateIdHalaman'
import { useDispatch } from 'react-redux'
import { IconLeft, IconRight } from '@/assets'
import { NoData } from '@/components/NoData'
import { bgPrimary900 } from '@/libs/helpers/format-color'

export function HomeGaleri({ color }: { color: string }) {
  const [showIndex, setShowIndex] = useState<number>(0)
  const [galeri, setGaleri] = useState<GaleriType[]>()
  const {
    data: galeryData,
    isLoading: galeryLoading,
    isFetching: galeryFetching,
  } = useGetGaleriQuery({
    page_number: 1,
    page_size: 100,
  })

  const loadingGaleri = galeryFetching || galeryLoading

  useEffect(() => {
    if (galeryData?.data) {
      setGaleri(galeryData?.data)
    }
  }, [galeryData?.data])

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

  const dispatch = useDispatch()

  return (
    <>
      {galeri?.length > 0 && (
        <div
          className={`"flex flex-col gap-32 ${bgPrimary900(color)} px-64 py-32 phones:px-32`}
        >
          {/* --- Title --- */}
          <div className="flex flex-col items-center justify-center gap-12">
            <img
              src="/img/block-icon-services.png"
              alt="Pengumuman"
              loading="lazy"
              className="h-[20rem] w-[20rem]"
            />
            <p className="text-[4rem] font-bold text-white">Galeri</p>
          </div>
          <div ref={ref} className="pt-64 text-black">
            {!isLoaded ? (
              <>
                <div className="flex gap-32 phones:hidden">
                  <SingleSkeleton height="h-[40vh]" width="w-1/4" />
                  <SingleSkeleton height="h-[40vh]" width="w-1/4" />
                  <SingleSkeleton height="h-[40vh]" width="w-1/4" />
                  <SingleSkeleton height="h-[40vh]" width="w-1/4" />
                </div>
                <div className="hidden phones:block">
                  <div className="flex gap-32">
                    <SingleSkeleton height="h-[40vh]" width="w-full" />
                  </div>
                </div>
              </>
            ) : loadingGaleri ? (
              <SingleSkeleton height="h-[40vh]" width="w-[20%]" />
            ) : (
              <>
                <div className="block phones:hidden">
                  {galeri?.length > 0 ? (
                    <div className="flex flex-col gap-24">
                      <div className="flex items-center gap-32">
                        {/* Mapping Data */}
                        <div className="grid flex-1 grid-cols-12 gap-32">
                          {galeri
                            ?.slice(showIndex, showIndex + 3)
                            ?.map((item, idx) => (
                              <Link
                                to={`/galeri-detail/page/${convertToSlug(item?.judul)}`}
                                onClick={() => {
                                  localStorage.setItem('beritaID', item?.id)
                                  dispatch(
                                    setStateHalaman({
                                      page: item?.judul,
                                      id: item?.id,
                                    }),
                                  )
                                }}
                                key={idx}
                                className="col-span-4 h-full phones:col-span-12"
                              >
                                <div className="flex h-full flex-col gap-16 rounded-2xl border bg-white px-16 pb-32 pt-16 shadow hover:cursor-pointer">
                                  <img
                                    src={item?.gambar ?? '/img/tutwuri.png'}
                                    alt={item?.judul}
                                    loading="lazy"
                                    className="h-[40rem] w-full rounded-2xl object-cover hover:opacity-80 phones:h-[20rem]"
                                  />
                                  <div className="flex flex-col items-center justify-center gap-8">
                                    <p className="text-center text-[2.4rem] font-bold">
                                      {item?.judul}
                                    </p>
                                  </div>
                                </div>
                              </Link>
                            ))}
                        </div>
                      </div>
                      <div className="flex items-center justify-center gap-24">
                        <button
                          disabled={galeri?.length <= 3}
                          type="button"
                          className={`hover:cursor-pointer ${galeri?.length <= 3 ? 'opacity-50' : 'opacity-100'}`}
                          onClick={() => {
                            if (showIndex > 0) {
                              setShowIndex(showIndex - 1)
                            } else {
                              setShowIndex(galeri?.length - 3)
                            }
                          }}
                        >
                          <IconLeft />
                        </button>
                        <button
                          type="button"
                          disabled={galeri?.length <= 3}
                          className={`hover:cursor-pointer ${galeri?.length <= 3 ? 'opacity-50' : 'opacity-100'}`}
                          onClick={() => {
                            if (showIndex < galeri?.length - 3) {
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
                  {galeri?.length > 0 ? (
                    <div className="flex items-center gap-32">
                      {/* Mapping Data */}
                      <div className="flex h-[40vh] w-full gap-32 overflow-x-auto phones:pb-32">
                        {galeri?.map((item, idx) => (
                          <Link
                            to={`/galeri-detail/page/${convertToSlug(item?.judul)}`}
                            onClick={() => {
                              localStorage.setItem('beritaID', item?.id)
                              dispatch(
                                setStateHalaman({
                                  page: item?.judul,
                                  id: item?.id,
                                }),
                              )
                            }}
                            key={idx}
                            className="h-full w-3/5 flex-shrink-0 flex-grow"
                          >
                            <div className="flex h-full flex-col gap-16 rounded-2xl border bg-white p-12 shadow hover:cursor-pointer">
                              <img
                                src={item?.gambar ?? '/img/tutwuri.png'}
                                alt={item?.judul}
                                loading="lazy"
                                className="h-[30vh] w-full rounded-2xl"
                              />
                              <div className="flex flex-col items-center justify-center gap-8">
                                <p className="text-center text-[3rem] font-bold">
                                  {item?.judul}
                                </p>
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <NoData />
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  )
}
