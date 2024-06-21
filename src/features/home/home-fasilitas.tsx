import { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { SingleSkeleton } from '@/components/skeleton-component'
import { bgPrimary700, textPrimary100 } from '@/libs/helpers/format-color'
import { useGetFasilitasQuery } from '@/store/slices/berandaAPI'
import { FasilitasType } from '@/libs/types/beranda-type'

export function HomeFasilitas({ color }: { color: string }) {
  const [fasilitas, setFasilitas] = useState<FasilitasType[]>()
  const {
    data: galeryData,
    isLoading: galeryLoading,
    isFetching: galeryFetching,
  } = useGetFasilitasQuery({
    page_number: 1,
    page_size: 100,
  })

  const loadingFasilitas = galeryFetching || galeryLoading

  useEffect(() => {
    if (galeryData?.data) {
      setFasilitas(galeryData?.data)
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

  return (
    <>
      {fasilitas?.length > 0 && (
        <div className={`"flex flex-col gap-32 px-64 py-32 phones:px-32`}>
          {/* --- Title --- */}
          <div className="flex flex-col items-center justify-center gap-24">
            <img
              src="/img/block-icon-facility.png"
              alt="Pengumuman"
              loading="lazy"
              className="h-[20rem] w-[20rem]"
            />
            <p className={`text-[4rem] font-bold ${textPrimary100}}`}>
              Fasilitas
            </p>
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
            ) : loadingFasilitas ? (
              <SingleSkeleton height="h-[40vh]" width="w-[20%]" />
            ) : (
              <div className="grid grid-cols-12 gap-32 phones:gap-48">
                {fasilitas?.map((item, idx) => (
                  <div key={idx} className="col-span-3 phones:col-span-12">
                    <div className="flex flex-col items-center gap-32 phones:gap-24">
                      <img
                        src={item?.photo}
                        alt={item?.nama}
                        loading="lazy"
                        className="h-[30vh] w-full rounded-3xl object-cover filter"
                      />
                      <p
                        className={`w-full rounded-2xl py-24 text-center ${bgPrimary700(color)} hover:bg-opacity-80`}
                      >
                        {item?.nama}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}
