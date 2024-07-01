import { IdentitasType } from '@/libs/types/beranda-type'
import { getThemeSlice } from '@/store/reducer/stateTheme'
import { useGetIdentitasQuery } from '@/store/slices/berandaAPI'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootMedsosLink } from './root-medsos-link'
import { RootScrollToUp } from './root-scroll-to-up'
import { Helmet } from 'react-helmet'
import { RootHeaderMain } from './root-header'
import { RootLogo } from './root-logo'
import { RootNavigationMain } from './root-navigation'
import {
  RootMobileMapping,
  RootNavigationMobileMain,
} from './root-navigation-mobile'
import { RootFooterMain } from './root-footer'
import { Outlet } from 'react-router-dom'
import { usePathname } from '@/libs/hooks/usePathname'

export default function RootLayout() {
  const stateColor = useSelector(getThemeSlice)?.color
  const [isShow, setIsShow] = useState<boolean>(false)
  const { firstPathname } = usePathname()

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

  const [identitas, setIdentitas] = useState<IdentitasType>()
  const {
    data: identitasData,
    isLoading: isLoadingIdentitas,
    isFetching: isFetchingIdentitas,
  } = useGetIdentitasQuery()

  useEffect(() => {
    if (identitasData?.data) {
      setIdentitas(identitasData?.data)
    }
  }, [identitasData?.data])

  const loadingIdentitas = isLoadingIdentitas || isFetchingIdentitas

  return (
    <>
      {firstPathname === 'daftar-kehadiran' ||
      firstPathname === 'jadwal-belajar' ? (
        <Outlet />
      ) : (
        <div className="flex h-screen flex-col px-128 text-[2rem] phones:px-0 phones:text-[2.4rem]">
          <div className="scrollbar flex h-auto w-full flex-col overflow-y-auto bg-white phones:bg-background">
            {/* --- Header --- */}
            <RootHeaderMain color={color} />
            <RootNavigationMobileMain
              color={color}
              setIsShow={setIsShow}
              isShow={isShow}
            />

            {!isShow ? (
              <>
                {/* --- Logo --- */}
                <RootLogo identitas={identitas} />
                {/* --- Navigasi --- */}
                <RootNavigationMain color={color} />
                {/* --- Content --- */}
                <Outlet />
                {/* --- Footer --- */}
                <RootFooterMain
                  color={color}
                  identitas={identitas}
                  loadingIdentitas={loadingIdentitas}
                />
              </>
            ) : (
              <RootMobileMapping color={color} setIsShow={setIsShow} />
            )}
            <RootMedsosLink
              loadingIdentitas={loadingIdentitas}
              identitas={identitas}
              color={color}
            />
            <RootScrollToUp color={color} />
          </div>
          <Helmet>
            <meta charSet="utf-8" />
            <title>{identitas?.nama_website}</title>
            <link rel="canonical" href="https://demolaman1.avnet.id/" />
          </Helmet>
        </div>
      )}
    </>
  )
}
