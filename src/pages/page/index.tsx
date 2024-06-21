import { Breadcrumb } from '@/components/Breadcrumb'
import Loading from '@/components/Loading'
import { HalamanDetail } from '@/features/page'
import { HalamanDetailType } from '@/libs/types/beranda-type'
import { getHalamanSlice } from '@/store/reducer/stateIdHalaman'
import { getThemeSlice } from '@/store/reducer/stateTheme'
import { useGetHalamanDetailQuery } from '@/store/slices/berandaAPI'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

export default function HalamanPage() {
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

  // --- Halaman Page ---
  const [halamanDetail, setHalamanDetail] = useState<HalamanDetailType>()
  const {
    data: halamanDetailData,
    isLoading,
    isFetching,
  } = useGetHalamanDetailQuery({
    id: id,
  })

  const loadingHalamanDetail = isLoading || isFetching

  useEffect(() => {
    if (halamanDetailData?.data) {
      setHalamanDetail(halamanDetailData?.data)
    }
  }, [halamanDetailData?.data, id])

  return (
    <div className="mb-80 mt-32 flex flex-col gap-32">
      <Breadcrumb color={color} />
      {loadingHalamanDetail ? (
        <Loading />
      ) : (
        <HalamanDetail
          judul={halamanDetail?.judul}
          photo={halamanDetail?.url_gambar}
          isi={halamanDetail?.isi}
        />
      )}
    </div>
  )
}
