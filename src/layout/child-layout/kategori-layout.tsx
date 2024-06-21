import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { usePathname } from '@/libs/hooks/usePathname'
import { getKategoriSlice } from '@/store/reducer/stateIdKategori'
import { ListType } from '@/libs/types/list-type'
import { useGetKategoriQuery } from '@/store/slices/kategoriAPI'
import { Meta } from '@/store/api'
import { Breadcrumb } from '@/components/Breadcrumb'
import { getThemeSlice } from '@/store/reducer/stateTheme'
import { CardListA } from '@/components/cards-component'
import { NoData } from '@/components/NoData'

export default function Kategori() {
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
  const stateId = useSelector(getKategoriSlice)?.id

  useEffect(() => {
    if (stateId) {
      setId(stateId)
    }
  }, [stateId])

  const idParams = localStorage.getItem('beritaID')
  const [id, setId] = useState<string>(idParams ?? stateId ?? '')

  const [pageNumber, setPageNumber] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(12)
  const [search, setSearch] = useState<string>('')
  const [meta, setMeta] = useState<Meta>()

  // --- Berita Kategori Page ---
  const [kategori, setKategori] = useState<ListType[]>()
  const {
    data: kategoriData,
    isLoading: kategoriIsLoading,
    isFetching: kategoriIsFetching,
  } = useGetKategoriQuery({
    jenis: firstPathname,
    page_number: pageNumber,
    page_size: pageSize,
    search: search,
    seo_kategori: id,
  })

  const loadingKategori = kategoriIsLoading || kategoriIsFetching

  useEffect(() => {
    if (kategoriData) {
      setKategori(kategoriData?.data)
      setMeta(kategoriData?.meta)
    }
  }, [kategoriData, id])

  return (
    <div className="mb-80 mt-32 flex flex-col gap-32">
      <Breadcrumb color={color} />
      {kategori?.length > 0 ? (
        <CardListA
          data={kategori}
          setPageNumber={setPageNumber}
          setPageSize={setPageSize}
          setSearch={setSearch}
          pageNumber={pageNumber}
          lastPage={meta?.last_page}
          color={color}
          loading={loadingKategori}
        />
      ) : (
        <NoData />
      )}
    </div>
  )
}
