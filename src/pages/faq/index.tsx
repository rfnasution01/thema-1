import { Breadcrumb } from '@/components/Breadcrumb'
import Loading from '@/components/Loading'
import { FaqDetail, FaqTab } from '@/features/faq'
import { usePathname } from '@/libs/hooks/usePathname'
import { FaqDetailType, FaqType } from '@/libs/types/faq-type'
import { getThemeSlice } from '@/store/reducer/stateTheme'
import {
  useGetFaqByKategoriQuery,
  useGetFaqKategoriQuery,
} from '@/store/slices/faqAPI'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

export default function Faq() {
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

  // --- Faq Kategori ---
  const [faqKategori, setFaqKategori] = useState<FaqType[]>()

  const {
    data: faqKategoriData,
    isLoading: faqKategoriLoaading,
    isFetching: faqKategoriFetching,
  } = useGetFaqKategoriQuery()

  const loadingFaqKategori = faqKategoriLoaading || faqKategoriFetching

  useEffect(() => {
    if (faqKategoriData?.data) {
      setFaqKategori(faqKategoriData?.data)
      setTab(faqKategoriData?.data?.[0]?.id)
    }
  }, [faqKategoriData?.data])

  const [tab, setTab] = useState<string>('')

  // --- Faq Page ---
  const [faqDetail, setFaqDetail] = useState<FaqDetailType[]>()

  const {
    data: faqDetailData,
    isLoading: faqDetailLoading,
    isFetching: faqDetailFetching,
  } = useGetFaqByKategoriQuery(
    {
      id: tab,
    },
    { skip: tab === null },
  )

  const loadingFaqDetail = faqDetailFetching || faqDetailLoading

  useEffect(() => {
    if (faqDetailData?.data) {
      setFaqDetail(faqDetailData?.data)
    }
  }, [faqDetailData?.data, tab])

  const { firstPathname } = usePathname()

  return (
    <div className="mb-80 mt-32 flex flex-col gap-32">
      <Breadcrumb color={color} />
      <div className="scrollbar h-[75vh] w-full overflow-y-auto px-64 phones:p-32">
        {loadingFaqDetail || loadingFaqKategori ? (
          <Loading />
        ) : (
          <div className="flex h-full phones:h-auto phones:flex-none phones:flex-col phones:gap-32">
            <FaqTab
              menu={faqKategori}
              firstPathname={firstPathname}
              setTab={setTab}
              tab={tab}
              color={color}
            />

            <div className="scrollbar h-full w-4/5 flex-1 overflow-y-auto phones:w-full">
              <FaqDetail data={faqDetail} />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
