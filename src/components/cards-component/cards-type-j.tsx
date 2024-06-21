import dayjs from 'dayjs'
import { NoData } from '../NoData'
import { BerandaType } from '@/libs/types/beranda-type'
import { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { Link } from 'react-router-dom'
import { convertToSlug } from '@/libs/helpers/format-text'
import { useDispatch } from 'react-redux'
import { setStateHalaman } from '@/store/reducer/stateIdHalaman'
import { SingleSkeleton } from '../skeleton-component'

export function CardTypeJ({ agenda }: { agenda: BerandaType }) {
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
          {agenda?.berita?.length > 0 ? (
            agenda?.berita?.slice(0, 3).map((item, idx) => (
              <Link
                to={`/${convertToSlug(agenda?.kelompok)}/page/${item?.seo}`}
                onClick={() => {
                  dispatch(
                    setStateHalaman({
                      page: item?.judul,
                      id: item?.id,
                    }),
                  )
                  localStorage.setItem('beritaID', item?.id)
                }}
                className="flex h-full transform-gpu items-center gap-32 duration-300 hover:translate-x-32"
                key={idx}
              >
                <div
                  style={{ lineHeight: '130%' }}
                  className={`h-full w-1/6 rounded-2xl bg-orange-400 p-24 text-center text-[2.4rem] text-white phones:w-2/6`}
                >
                  {dayjs(item?.tanggal).locale('id').format('DD MMM YYYY')}
                </div>
                <div
                  className="h-full w-5/6 text-[2.6rem] font-bold phones:w-4/6"
                  style={{ lineHeight: '130%' }}
                >
                  {item?.judul}
                </div>
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
