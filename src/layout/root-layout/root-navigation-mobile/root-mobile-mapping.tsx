import Loading from '@/components/Loading'
import { bgPrimary500 } from '@/libs/helpers/format-color'
import { MenuType } from '@/libs/types/beranda-type'
import {
  useGetMenuTopQuery,
  useGetMenuUtamaQuery,
} from '@/store/slices/berandaAPI'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { RootMobileParent } from './root-mobile-parent'

export function RootMobileMapping({
  color,
  setIsShow,
}: {
  color: string
  setIsShow: Dispatch<SetStateAction<boolean>>
}) {
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

  const sortedDataMenuUtama = [...menuUtama].sort((a, b) => {
    return parseInt(a.urutan) - parseInt(b.urutan)
  })

  // --- Menu Top ---
  const [menuTop, setMenuTop] = useState<MenuType[]>([])
  const {
    data: menuTopData,
    isLoading: isLoadingMenuTop,
    isFetching: isFetchingMenuTop,
  } = useGetMenuTopQuery()

  const loadingMenuTop = isLoadingMenuTop || isFetchingMenuTop

  useEffect(() => {
    if (menuTopData) {
      setMenuTop(menuTopData?.data)
    }
  }, [menuTopData])

  const sortedDataMenuTop = [...menuTop].sort((a, b) => {
    return parseInt(a.urutan) - parseInt(b.urutan)
  })

  const loading = loadingMenuTop || loadingMenuUtama

  return (
    <div
      className={`scrollbar flex flex-1 flex-col gap-0 overflow-y-auto ${bgPrimary500(color)} p-32`}
    >
      {loading ? (
        <Loading />
      ) : (
        <>
          <RootMobileParent data={sortedDataMenuUtama} setIsShow={setIsShow} />
          <RootMobileParent data={sortedDataMenuTop} setIsShow={setIsShow} />
        </>
      )}
    </div>
  )
}
