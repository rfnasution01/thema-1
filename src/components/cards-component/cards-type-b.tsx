import { bgHoverPrimary100 } from '@/libs/helpers/format-color'
import { ProgramDetailType } from '@/libs/types/beranda-type'
import { setStateHalaman } from '@/store/reducer/stateIdHalaman'
import { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { SingleSkeleton } from '../skeleton-component'

export function CardTypeB({
  program,
  color,
}: {
  program: ProgramDetailType[]
  color: string
}) {
  const dispatch = useDispatch()

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
    <div ref={ref}>
      {isLoaded ? (
        <div className="phones:gapx-32 mt-96 grid grid-cols-3 gap-x-48 gap-y-96 phones:gap-y-96">
          {program?.map((item, idx) => (
            <div
              className="col-span-1 h-full phones:col-span-3"
              key={idx}
              onClick={() => {
                dispatch(setStateHalaman({ id: item?.id, page: item?.seo }))
              }}
            >
              <Link
                to={`/program-details/page/${item?.seo}`}
                className={`flex h-full flex-col gap-24 rounded-2xl bg-background ${bgHoverPrimary100(color)} px-24 pb-32 pt-24 shadow hover:cursor-pointer hover:shadow-lg`}
              >
                <div className="relative -top-96">
                  <img
                    src={item?.photo}
                    alt={item?.judul}
                    className="h-[16rem] w-[16rem]  object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="relative -top-96 flex flex-col gap-4">
                  <p className="font-roboto text-[3rem] phones:text-[3.2rem]">
                    {item?.judul ?? '-'}
                  </p>
                  <p className="line-clamp-3 text-[2.4rem] tracking-1.25 phones:text-[2.8rem]">
                    {item?.isi_singkat ?? '-'}
                  </p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex items-center gap-32">
          <SingleSkeleton height="h-[30vh]" width="w-1/4 phones:w-full" />
          <SingleSkeleton
            height="h-[30vh]"
            width="w-1/4"
            classname="phones:hidden"
          />
          <SingleSkeleton
            height="h-[30vh]"
            width="w-1/4"
            classname="phones:hidden"
          />
          <SingleSkeleton
            height="h-[30vh]"
            width="w-1/4"
            classname="phones:hidden"
          />
        </div>
      )}
    </div>
  )
}
