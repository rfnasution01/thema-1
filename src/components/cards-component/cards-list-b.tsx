import { BerandaType } from '@/libs/types/beranda-type'
import { Link } from 'react-router-dom'
import { convertToSlug } from '@/libs/helpers/format-text'
import { useEffect, useState } from 'react'
import { bgWhite } from '@/libs/helpers/format-color'
import 'dayjs/locale/id'
import { useInView } from 'react-intersection-observer'
import { SingleSkeleton } from '../skeleton-component'
import { CardTypeH } from './cards-type-h'
import { CardTypeG } from './cards-type-g'

export function CardListB({
  data,
  kelompok,
  color,
}: {
  data: BerandaType
  kelompok: string
  color: string
}) {
  const [showIndex, setShowIndex] = useState<number>(0)

  useEffect(() => {
    const interval = setInterval(() => {
      if (showIndex === data?.berita?.length - 1) {
        setShowIndex(0)
      } else {
        setShowIndex(showIndex + 1)
      }
    }, 3000) // Mengganti gambar setiap 3 detik

    return () => clearInterval(interval)
  }, [showIndex, data?.berita?.length])

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
    <div ref={ref} className="flex flex-col gap-32">
      {isLoaded ? (
        <>
          {/* --- Main Berita --- */}
          <div className="flex items-center gap-32 phones:flex-col phones:items-start phones:gap-24">
            {/* --- Left --- */}
            <div className="w-1/2 phones:w-full">
              <CardTypeH
                kelompok={kelompok}
                color={color}
                data={data}
                index={0}
              />
            </div>
            {/* --- Right --- */}
            <div className="flex h-[50vh] w-1/2 items-center gap-32 phones:h-auto phones:w-full phones:flex-col phones:items-start">
              {data?.berita?.length > 1 && (
                <CardTypeG
                  kelompok={kelompok}
                  data={data}
                  color={color}
                  width="w-1/2"
                  index={1}
                />
              )}
              {data?.berita?.length > 2 && (
                <CardTypeG
                  kelompok={kelompok}
                  data={data}
                  color={color}
                  width="w-1/2"
                  index={2}
                />
              )}
            </div>
          </div>
          {/* --- Berita Lainnya --- */}
          {data?.berita?.length > 3 && (
            <>
              <div className="block phones:hidden">
                <div className="grid grid-cols-6 gap-32">
                  {data?.berita?.slice(3, 8)?.map((_item, idx) => (
                    <div
                      className="col-span-1 h-full phones:col-span-3"
                      key={idx}
                    >
                      <CardTypeG
                        kelompok={kelompok}
                        data={data}
                        color={color}
                        width="w-full"
                        index={3 + idx}
                        isSmall
                      />
                    </div>
                  ))}
                  <Link
                    to={`/${convertToSlug(kelompok)}`}
                    className={`col-span-1 flex h-full items-center justify-center border bg-white p-32 text-[4rem] ${bgWhite(color)}`}
                    style={{ borderRadius: '3rem', lineHeight: '150%' }}
                  >
                    Lihat Berita Lainnya
                  </Link>
                </div>
              </div>
              <div className="hidden phones:block">
                <div className="flex h-full w-full items-center gap-32 overflow-x-auto pb-32">
                  {data?.berita?.slice(3, 8)?.map((_item, idx) => (
                    <div className="w-3/5 flex-shrink-0 flex-grow" key={idx}>
                      <CardTypeG
                        kelompok={kelompok}
                        data={data}
                        color={color}
                        width="w-full"
                        index={3 + idx}
                        isSmall
                        isShow
                      />
                    </div>
                  ))}
                  <Link
                    to={`/${convertToSlug(kelompok)}`}
                    className={`flex h-full w-3/5 flex-shrink-0 flex-grow items-center justify-center bg-white p-32 text-[4rem] ${bgWhite(color)}`}
                    style={{ borderRadius: '3rem' }}
                  >
                    Lihat Berita Lainnya
                  </Link>
                </div>
              </div>
            </>
          )}
        </>
      ) : (
        <div className="flex flex-col gap-32">
          <div className="flex items-center gap-32">
            <SingleSkeleton height="h-[40vh]" width="w-2/4 phones:w-full" />
            <SingleSkeleton
              height="h-[40vh]"
              width="w-1/4"
              classname="phones:hidden"
            />
            <SingleSkeleton
              height="h-[40vh]"
              width="w-1/4"
              classname="phones:hidden"
            />
          </div>
          <div className="flex items-center gap-32">
            <SingleSkeleton
              height="h-[30vh] phones:h-[10vh]"
              width="w-1/6 phones:w-full"
            />
            <SingleSkeleton
              height="h-[30vh]"
              width="w-1/6"
              classname="phones:hidden"
            />
            <SingleSkeleton
              height="h-[30vh]"
              width="w-1/6"
              classname="phones:hidden"
            />
            <SingleSkeleton
              height="h-[30vh]"
              width="w-1/6"
              classname="phones:hidden"
            />
            <SingleSkeleton
              height="h-[30vh]"
              width="w-1/6"
              classname="phones:hidden"
            />
            <SingleSkeleton
              height="h-[30vh]"
              width="w-1/6"
              classname="phones:hidden"
            />
          </div>
        </div>
      )}
    </div>
  )
}
