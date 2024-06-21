import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import Loading from '@/components/Loading'
import { convertSlugToText } from '@/libs/helpers/format-text'
import { usePathname } from '@/libs/hooks/usePathname'
import { Breadcrumb } from '@/components/Breadcrumb'
import { getThemeSlice } from '@/store/reducer/stateTheme'
import { TestimoniType } from '@/libs/types/testimoni-type'
import { useGetTestimoniQuery } from '@/store/slices/testimoniAPI'
import { CardTypeE, CardTypeF } from '@/components/cards-component'
import { useInView } from 'react-intersection-observer'
import { SingleSkeleton } from '@/components/skeleton-component'

export default function Testimonial() {
  const { firstPathname } = usePathname()
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
    <div className="mb-80 mt-32 flex flex-col gap-32">
      <Breadcrumb color={color} />

      <div className="px-64 phones:p-32" ref={ref}>
        {isLoaded ? (
          <div
            className={
              'phones:bg-w flex flex-col gap-32 rounded-2xl phones:rounded-none phones:border-transparent phones:p-0 phones:shadow-none'
            }
          >
            <div className="flex items-center justify-between gap-32">
              <p className="font-roboto text-[5rem]">
                {convertSlugToText(firstPathname)}
              </p>
            </div>

            {loadingTestimoni ? (
              <Loading />
            ) : (
              <div className="grid grid-cols-12 gap-32">
                {testimoni?.map((item, idx) => (
                  <div className="col-span-3 phones:col-span-12" key={idx}>
                    <div className="block phones:hidden">
                      <CardTypeE
                        isi={item?.isi}
                        nama={item?.nama}
                        photo={item?.photo}
                        id={item?.id}
                        kelompok="testimonial"
                      />
                    </div>
                    <div className="hidden phones:block">
                      <CardTypeF
                        isi={item?.isi}
                        nama={item?.nama}
                        photo={item?.photo}
                        id={item?.id}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center gap-32">
            <SingleSkeleton height="h-[30vh]" width="w-1/4 phones:w-full" />
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
    </div>
  )
}
