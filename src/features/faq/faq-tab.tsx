import { SingleSkeleton } from '@/components/skeleton-component'
import { bgPrimary500 } from '@/libs/helpers/format-color'
import { convertToSlug } from '@/libs/helpers/format-text'
import { FaqType } from '@/libs/types/faq-type'
import clsx from 'clsx'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'

export function FaqTab({
  menu,
  firstPathname,
  tab,
  setTab,
  color,
}: {
  menu: FaqType[]
  firstPathname: string
  tab: string
  setTab: Dispatch<SetStateAction<string>>
  color: string
}) {
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
    <div
      ref={ref}
      className={`${bgPrimary500(color)} flex ${!isLoaded ? 'w-2/12 phones:w-full' : 'w-auto'} flex-col gap-32 p-64 phones:p-32`}
    >
      {isLoaded ? (
        <>
          <p className="font-roboto text-[3rem] uppercase">{firstPathname}</p>
          <div className="flex flex-col gap-16">
            {menu?.map((item, idx) => (
              <div
                key={idx}
                className={clsx('border-l-4 p-8 hover:cursor-pointer', {
                  'border-primary-100 bg-primary-100 bg-opacity-10':
                    convertToSlug(item?.id) === tab ||
                    (tab === undefined && idx === 0),
                  'border-transparent': convertToSlug(item?.kategori) !== tab,
                })}
                onClick={() => setTab(convertToSlug(item?.kategori))}
              >
                {item?.kategori}
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="flex flex-col gap-32">
          <SingleSkeleton height="h-[3rem]" />
          <SingleSkeleton height="h-[3rem]" classname="phones:hidden" />
          <SingleSkeleton height="h-[3rem]" classname="phones:hidden" />
        </div>
      )}
    </div>
  )
}
