import { BranchOrganization, CardOrganization } from '@/features/organization'
import { DataStrukturOrganisasi } from './dataStaff'
import { convertSlugToText } from '@/libs/helpers/format-text'
import { Breadcrumb } from '@/components/Breadcrumb'
import { useSelector } from 'react-redux'
import { getThemeSlice } from '@/store/reducer/stateTheme'
import { useEffect, useState } from 'react'
import { TestimoniType } from '@/libs/types/testimoni-type'
import { useGetTestimoniQuery } from '@/store/slices/testimoniAPI'
import { SingleSkeleton } from '@/components/skeleton-component'
import { useInView } from 'react-intersection-observer'
import { usePathname } from '@/libs/hooks/usePathname'

export default function Organization() {
  const data = DataStrukturOrganisasi
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

  console.log(testimoni)

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

  const { firstPathname } = usePathname()

  return (
    <div className="mb-80 mt-32 flex flex-col gap-32">
      <Breadcrumb color={color} />

      {loadingTestimoni ? (
        <SingleSkeleton height="h-[40vh]" />
      ) : (
        <div ref={ref} className="flex flex-col gap-32 px-64 phones:px-32">
          {isLoaded ? (
            <div
              className={
                'flex flex-col gap-32 phones:border-transparent phones:shadow-none'
              }
            >
              {/* Titlte  */}
              <div className="flex items-center justify-between gap-32">
                <p className="font-roboto text-[5rem]">
                  {convertSlugToText(firstPathname)}
                </p>
              </div>
              <div className="flex flex-col items-center justify-center text-[2rem] phones:overflow-x-auto phones:pb-32">
                {data?.map((item, idx) => (
                  <div className="flex flex-col" key={idx}>
                    <BranchOrganization
                      isBefore
                      lengthBefore={idx === 0 ? 0 : data?.[idx]?.length}
                    />
                    <div className="flex gap-64">
                      {item?.map((list, id) => (
                        <div className="flex" key={id}>
                          <CardOrganization list={list} idx={idx} />
                        </div>
                      ))}
                    </div>
                    <BranchOrganization
                      isAfter
                      lengthAfter={
                        idx === data.length - 1 ? 0 : data?.[idx]?.length
                      }
                    />
                    <BranchOrganization isSeparator={data[idx].length > 2} />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <SingleSkeleton height="h-[30vh]" />
          )}
        </div>
      )}
    </div>
  )
}
