import dayjs from 'dayjs'
import { NoData } from '../NoData'
import { BerandaType } from '@/libs/types/beranda-type'
import { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import 'dayjs/locale/id'
import { Link } from 'react-router-dom'
import { convertToSlug } from '@/libs/helpers/format-text'
import { useDispatch } from 'react-redux'
import { setStateHalaman } from '@/store/reducer/stateIdHalaman'
import { SingleSkeleton } from '../skeleton-component'

export function CardTypeI({ pengumuman }: { pengumuman: BerandaType }) {
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

  const dispatch = useDispatch()
  return (
    <div ref={ref} className="flex w-full flex-col gap-32">
      {isLoaded ? (
        <>
          {pengumuman?.berita?.length > 0 ? (
            pengumuman?.berita?.slice(0, 3).map((item, idx) => (
              <Link
                to={`/${convertToSlug(pengumuman?.kelompok)}/page/${item?.seo}`}
                onClick={() => {
                  dispatch(
                    setStateHalaman({
                      page: item?.judul,
                      id: item?.id,
                    }),
                  )
                  localStorage.setItem('beritaID', item?.id)
                }}
                className="flex h-full transform-gpu flex-col gap-12 duration-300 hover:scale-95"
                key={idx}
              >
                <p
                  className="text-[2.6rem] font-bold"
                  style={{ lineHeight: '130%' }}
                >
                  {item?.judul}
                </p>
                <p>
                  {dayjs(item?.tanggal).locale('id').format('DD MMMM YYYY')}
                </p>
              </Link>
            ))
          ) : (
            <NoData />
          )}
        </>
      ) : (
        <>
          <SingleSkeleton height="h-[15vh]" />
        </>
      )}
    </div>
  )
}
