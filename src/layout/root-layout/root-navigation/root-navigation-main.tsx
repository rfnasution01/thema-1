import { SingleSkeleton } from '@/components/skeleton-component'
import { enumRoute } from '@/libs/enum/enum-route'
import {
  bgPrimary700,
  borderPrimary400,
  hoverPrimary400,
} from '@/libs/helpers/format-color'
import { usePathname } from '@/libs/hooks/usePathname'
import { MenuType } from '@/libs/types/beranda-type'
import { useGetMenuUtamaQuery } from '@/store/slices/berandaAPI'
import { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { Link } from 'react-router-dom'
import { RootNavigationChildren } from './root-navigation-children'

export function RootNavigationMain({ color }: { color: string }) {
  // --- Menu Utama ---
  const [menuUtama, setMenuUtama] = useState<MenuType[]>([])
  const {
    data: menuUtamaData,
    isLoading: isLoadingMenuUtama,
    isFetching: isFetchingMenuUtama,
  } = useGetMenuUtamaQuery()

  const loadingMenuUtama = isLoadingMenuUtama || isFetchingMenuUtama

  useEffect(() => {
    if (menuUtamaData?.data) {
      setMenuUtama(menuUtamaData?.data)
    }
  }, [menuUtamaData?.data])

  const { firstPathname } = usePathname()

  const isActivePage = (item: string) => {
    if (
      (item.toLowerCase() === 'home' && firstPathname === '') ||
      item?.toLocaleLowerCase() === firstPathname
    ) {
      return true
    }
    return false
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

  const sortedData = [...menuUtama].sort((a, b) => {
    return parseInt(a.urutan) - parseInt(b.urutan)
  })

  return (
    <>
      {sortedData?.length > 0 && (
        <div ref={ref} className="sticky top-0 z-20 phones:hidden">
          {isLoaded ? (
            <>
              {loadingMenuUtama ? (
                <SingleSkeleton />
              ) : (
                <div
                  className={`${bgPrimary700(color)} flex items-center px-32`}
                >
                  {menuUtama?.map((item, idx) => (
                    <Link
                      to={
                        item?.nama_menu === 'Home'
                          ? '/'
                          : item?.slug === 'merdeka-belajar-kampus-merdeka-mbkm'
                            ? '#'
                            : item?.jenis_menu === enumRoute.ROUTE
                              ? item?.slug
                              : item?.jenis_menu === enumRoute.HALAMAN
                                ? `/halaman`
                                : item?.jenis_menu === enumRoute.PROGRAM
                                  ? `/program-details`
                                  : item?.jenis_menu === enumRoute.BERITA
                                    ? `/berita`
                                    : item?.jenis_menu === enumRoute.MADING
                                      ? `/mading`
                                      : item?.jenis_menu === enumRoute.AGENDA
                                        ? `/agenda`
                                        : item?.jenis_menu ===
                                            enumRoute.PENGUMUMAN
                                          ? `/pengumuman`
                                          : item?.jenis_menu ===
                                              enumRoute.PRESTASI
                                            ? `/prestasi`
                                            : item?.jenis_menu === enumRoute.URL
                                              ? item?.id_konten
                                              : item?.slug
                      }
                      target={
                        item?.jenis_menu === enumRoute.URL ? '_blank' : '_self'
                      }
                      className={`
                ${isActivePage(item?.slug) ? borderPrimary400(color) : hoverPrimary400(color)} ${item?.children?.length > 0 ? '' : 'px-32 py-24 '} text-[2rem] uppercase hover:cursor-pointer phones:text-[2.4rem]`}
                      key={idx}
                    >
                      <RootNavigationChildren color={color} item={item} />
                    </Link>
                  ))}
                </div>
              )}
            </>
          ) : (
            <SingleSkeleton />
          )}
        </div>
      )}
    </>
  )
}
