import { Breadcrumb } from '@/components/Breadcrumb'
import { GaleriDetailType } from '@/libs/types/galeri-type'
import { useGetGaleriDetailQuery } from '@/store/slices/galeriAPI'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getThemeSlice } from '@/store/reducer/stateTheme'
import { getHalamanSlice } from '@/store/reducer/stateIdHalaman'
import { SingleSkeleton } from '@/components/skeleton-component'
import { useInView } from 'react-intersection-observer'

export default function GaleriPage() {
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

  const stateId = useSelector(getHalamanSlice)?.id

  useEffect(() => {
    if (stateId) {
      setId(stateId)
    }
  }, [stateId])

  const idParams = localStorage.getItem('beritaID')

  const [id, setId] = useState<string>(idParams ?? stateId ?? '')

  // --- Galeri Page ---
  const [galeriDetail, setGaleriDetail] = useState<GaleriDetailType>()
  const {
    data: galeryDetailData,
    isLoading: galeryDetailLoading,
    isFetching: galeryDetailFetching,
  } = useGetGaleriDetailQuery(
    {
      id: id,
    },
    { skip: id === '' },
  )

  const loadingGaleriDetail = galeryDetailFetching || galeryDetailLoading

  useEffect(() => {
    if (galeryDetailData?.data) {
      setGaleriDetail(galeryDetailData?.data)
    }
  }, [galeryDetailData?.data, id])

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

      {loadingGaleriDetail ? (
        <SingleSkeleton height="h-[40vh]" />
      ) : (
        <div ref={ref} className="flex flex-col gap-32 px-64 phones:px-32">
          {isLoaded ? (
            <>
              {galeriDetail?.lampiran?.map((item, idx) => (
                <div className="h-full w-full flex-1" key={idx}>
                  <img
                    src={item?.gambar}
                    alt={item?.judul}
                    className={`h-full w-full rounded-lg bg-opacity-10 object-cover filter phones:h-[30vh]`}
                    loading="lazy"
                  />
                </div>
              ))}
            </>
          ) : (
            <SingleSkeleton height="h-[30vh]" />
          )}
        </div>
      )}
    </div>
  )
}
