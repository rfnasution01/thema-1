import Loading from '@/components/Loading'
import { bgPrimary100, bgPrimary700 } from '@/libs/helpers/format-color'
import { LayananType } from '@/libs/types/layanan-type'
import { useGetLayananQuery } from '@/store/slices/layananAPI'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export function HomeBannerLayanan({ color }: { color: string }) {
  const [showIndex, setShowIndex] = useState<number>(0)

  //   --- layanan ---
  const [layanan, setLayanan] = useState<LayananType[]>([])
  const {
    data: dataLayanan,
    isFetching: isFetchingLayanan,
    isLoading: isLoadingLayanan,
  } = useGetLayananQuery()

  const loadingLayanan = isFetchingLayanan || isLoadingLayanan

  useEffect(() => {
    if (dataLayanan?.data) {
      setLayanan(dataLayanan?.data)
    }
  }, [dataLayanan?.data])

  return (
    <div className="flex flex-col phones:hidden">
      {loadingLayanan ? (
        <Loading />
      ) : (
        <div className="flex items-center gap-32 px-64">
          <Link
            target="_blank"
            to={'https://avnet.id'}
            className={`${bgPrimary700(color)} rounded-full px-32 py-16`}
          >
            avnet.id
          </Link>
          <div className="flex flex-1 items-center gap-24">
            <button
              disabled={layanan?.length <= 4}
              type="button"
              className={`hover:cursor-pointer ${layanan?.length <= 4 ? 'opacity-50' : 'opacity-100'}`}
              onClick={() => {
                if (showIndex > 0) {
                  setShowIndex(showIndex - 1)
                } else {
                  setShowIndex(layanan?.length - 4)
                }
              }}
            >
              <ChevronLeft size={20} />
            </button>
            <div className="w-full flex-1 border-l border-r border-border px-4">
              <div className="flex items-center gap-24 overflow-hidden">
                {layanan?.slice(showIndex, showIndex + 4)?.map((item, idx) => (
                  <Link
                    to={item?.url}
                    key={idx}
                    target="_blank"
                    className={`flex w-1/4 flex-shrink-0 items-center gap-12 ${bgPrimary100(color)} rounded-full px-32 py-16`}
                  >
                    <img
                      src={item?.icon}
                      alt={item.keterangan}
                      className="h-[3rem] w-[3rem] rounded-lg object-cover"
                    />
                    <p>{item?.nama_layanan}</p>
                  </Link>
                ))}
              </div>
            </div>
            <button
              type="button"
              disabled={layanan?.length <= 4}
              className={`hover:cursor-pointer ${layanan?.length <= 4 ? 'opacity-50' : 'opacity-100'}`}
              onClick={() => {
                if (showIndex < layanan?.length - 4) {
                  setShowIndex(showIndex + 1)
                } else {
                  setShowIndex(0)
                }
              }}
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
