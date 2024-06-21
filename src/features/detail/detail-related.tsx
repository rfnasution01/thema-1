import Loading from '@/components/Loading'
import { CardTypeC, CardTypeD } from '@/components/cards-component'
import { usePathname } from '@/libs/hooks/usePathname'
import { DetailRelatedType } from '@/libs/types/detail-type'
import { setStateHalaman } from '@/store/reducer/stateIdHalaman'
import { useGetDetailRelatedQuery } from '@/store/slices/detailAPI'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

export function DetailRelated({ id, color }: { id: string; color: string }) {
  const { firstPathname } = usePathname()
  // --- Berita Detail Page ---
  const [detailRelated, setDetailRelated] = useState<DetailRelatedType[]>()
  const {
    data: detailData,
    isLoading: detailIsLoading,
    isFetching: detailIsFetching,
  } = useGetDetailRelatedQuery({
    id: id,
    jenis: firstPathname,
  })

  const loadingBeritaDetail = detailIsLoading || detailIsFetching

  useEffect(() => {
    if (detailData?.related) {
      setDetailRelated(detailData?.related)
    }
  }, [detailData?.related, id])

  const dispatch = useDispatch()

  return (
    <div className="flex w-full flex-col gap-12 phones:w-full">
      <div className="flex border-b-4 border-danger-700 pb-8">
        <p className="border-l-4 border-danger-700 px-12 py-8 font-nunito text-[3rem] uppercase">
          berita lainnya
        </p>
      </div>

      {loadingBeritaDetail ? (
        <Loading />
      ) : (
        <div className="grid grid-cols-12 gap-32">
          {detailRelated?.map((item, idx) => (
            <Link
              to={`/${firstPathname}/page/${item?.seo}`}
              onClick={() => {
                dispatch(setStateHalaman({ id: item?.id, page: item?.seo }))
              }}
              key={idx}
              className="col-span-6 phones:col-span-12"
            >
              <div className="flex w-full transform gap-24 border-b border-[#00000033] py-12 transition-transform hover:translate-x-12 hover:cursor-pointer phones:flex-col phones:gap-32">
                <div className="w-full phones:hidden">
                  <CardTypeD
                    judul={item?.judul}
                    gambar={item?.photo}
                    hits={item?.hits}
                    color={color}
                    tanggal={item?.tanggal}
                  />
                </div>
                <div className="hidden phones:block">
                  <CardTypeC
                    judul={item?.judul}
                    tanggal={item?.tanggal}
                    isi={item?.isi}
                  />
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
