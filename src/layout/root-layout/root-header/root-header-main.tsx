import { MenubarLayanan } from '@/components/menubar-component'
import { bgPrimary100, bgPrimary500 } from '@/libs/helpers/format-color'
import { useEffect, useState } from 'react'
import { BeritaTerbaruType, MenuType } from '@/libs/types/beranda-type'
import { useGetMenuTopQuery } from '@/store/slices/berandaAPI'
import { RootHeaderMapping } from './root-header-mapping'
import { RunningText } from '@/components/RunningText'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setStateHalaman } from '@/store/reducer/stateIdHalaman'
import { SingleSkeleton } from '@/components/skeleton-component'
import { useInView } from 'react-intersection-observer'

export function RootHeaderMain({ color }: { color: string }) {
  const dispatch = useDispatch()

  // --- Menu Top ---
  const [menuTop, setMenuTop] = useState<MenuType[]>([])
  const [beritaTerbaru, setBeritaTerbaru] = useState<BeritaTerbaruType[]>([])
  const {
    data: menuTopData,
    isLoading: isLoadingMenuTop,
    isFetching: isFetchingMenuTop,
  } = useGetMenuTopQuery()

  const loadingMenuTop = isLoadingMenuTop || isFetchingMenuTop

  useEffect(() => {
    if (menuTopData) {
      setMenuTop(menuTopData?.data)
      setBeritaTerbaru(menuTopData?.berita_terbaru)
    }
  }, [menuTopData])

  const sortedData = [...menuTop].sort((a, b) => {
    return parseInt(a.urutan) - parseInt(b.urutan)
  })

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
      ref={ref}
      id="header"
      className={`${bgPrimary500(color)} flex w-full items-center gap-32 px-32 py-16 phones:hidden`}
    >
      {isLoaded ? (
        <>
          {loadingMenuTop ? (
            <SingleSkeleton height="h-[3rem]" />
          ) : (
            <>
              <div className="flex w-9/12 items-center gap-32">
                <MenubarLayanan color={color} />
                <div
                  className={`text-nowrap text-[2rem] font-bold uppercase ${bgPrimary100(color)} rounded-lg p-8`}
                >
                  Berita Terbaru
                </div>
                <RunningText className="flex-1" color={color}>
                  <div className="flex w-full gap-32">
                    {beritaTerbaru?.map((item, idx) => (
                      <Link
                        to={`/berita/page/${item?.seo}`}
                        key={idx}
                        onClick={() => {
                          localStorage.setItem('beritaID', item?.id)
                          dispatch(
                            setStateHalaman({
                              id: item?.id,
                              page: item?.judul,
                            }),
                          )
                        }}
                        className="w-full"
                      >
                        • {item?.judul}
                      </Link>
                    ))}
                  </div>
                </RunningText>
              </div>
              <div className="w-3/12">
                <RootHeaderMapping
                  menuTop={sortedData}
                  className="justify-end"
                />
              </div>
            </>
          )}
        </>
      ) : (
        <div className="flex w-full items-center gap-32">
          <SingleSkeleton height="h-[3rem]" width="w-[10%]" />
          <SingleSkeleton height="h-[3rem]" width="w-[65%]" />
          <SingleSkeleton height="h-[3rem]" width="w-[25%]" />
        </div>
      )}
    </div>
  )
}
