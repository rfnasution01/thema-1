import { Breadcrumb } from '@/components/Breadcrumb'
import { NoData } from '@/components/NoData'
import { CardListA } from '@/components/cards-component'
import { usePathname } from '@/libs/hooks/usePathname'
import { ListType } from '@/libs/types/list-type'
import { Meta } from '@/store/api'
import { getThemeSlice } from '@/store/reducer/stateTheme'
import { useGetListQuery } from '@/store/slices/listAPI'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

export default function RouteLayout() {
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

  const { firstPathname } = usePathname()

  // --- List ---
  const [list, setList] = useState<ListType[]>()
  const [pageNumber, setPageNumber] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(12)
  const [search, setSearch] = useState<string>('')
  const [meta, setMeta] = useState<Meta>()
  const {
    data: listData,
    isLoading: listIsLoading,
    isFetching: listIsFethcing,
  } = useGetListQuery({
    page_number: pageNumber,
    page_size: pageSize,
    search: search,
    jenis: firstPathname,
  })

  const loadingList = listIsLoading || listIsFethcing

  useEffect(() => {
    if (listData) {
      setList(listData?.data)
      setMeta(listData?.meta)
    }
  }, [listData])

  return (
    <div className="mb-80 mt-32 flex flex-col gap-32">
      <Breadcrumb color={color} />
      {list?.length > 0 ? (
        <CardListA
          data={list}
          setPageNumber={setPageNumber}
          setPageSize={setPageSize}
          setSearch={setSearch}
          pageNumber={pageNumber}
          lastPage={meta?.last_page}
          color={color}
          loading={loadingList}
        />
      ) : (
        <NoData />
      )}
    </div>
  )
}
