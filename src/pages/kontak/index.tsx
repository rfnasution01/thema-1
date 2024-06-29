import { Breadcrumb } from '@/components/Breadcrumb'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getThemeSlice } from '@/store/reducer/stateTheme'
import { SingleSkeleton } from '@/components/skeleton-component'
import { useInView } from 'react-intersection-observer'
import { convertSlugToText } from '@/libs/helpers/format-text'
import { usePathname } from '@/libs/hooks/usePathname'
import Loading from '@/components/Loading'
import { IdentitasType } from '@/libs/types/beranda-type'
import { useGetIdentitasQuery } from '@/store/slices/berandaAPI'
import 'leaflet/dist/leaflet.css'
import { Peta } from './Peta'
import { Pertanyaan } from './Pertanyaan'

export default function Kontak() {
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

  // --- Identitas ---
  const [Identitass, setIdentitass] = useState<IdentitasType>()

  const {
    data: dataIdentitas,
    isFetching: isFetchingIdentitas,
    isLoading: isLoadingIdentitas,
  } = useGetIdentitasQuery()

  const loadingIdentitas = isFetchingIdentitas || isLoadingIdentitas

  useEffect(() => {
    if (dataIdentitas?.data) {
      setIdentitass(dataIdentitas?.data)
    }
  }, [dataIdentitas?.data])

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
            {/* Title  */}
            <div className="flex items-center justify-between gap-32 phones:flex-col phones:items-start">
              <p className="font-roboto text-[5rem]">
                {convertSlugToText(firstPathname)}
              </p>
            </div>

            {loadingIdentitas ? (
              <Loading />
            ) : (
              <div className="flex w-full flex-col gap-32 phones:flex-col">
                <Peta identitas={Identitass} />
                <Pertanyaan identitas={Identitass} />
              </div>
            )}
          </div>
        ) : (
          <SingleSkeleton height="h-[30vh]" />
        )}
      </div>
    </div>
  )
}
