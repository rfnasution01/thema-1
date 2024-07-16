import { SingleSkeleton } from '@/components/skeleton-component'
import clsx from 'clsx'
import { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'

export function HalamanDetail({
  isDetail,
  judul,
  photo,
  isi,
}: {
  judul: string
  photo: string
  isi: string
  isDetail?: boolean
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
    <div className={clsx('', { 'px-[30rem] phones:p-32': !isDetail })}>
      <div
        ref={ref}
        className={
          'flex flex-col gap-32 p-32 phones:border-transparent phones:p-0 phones:shadow-none'
        }
      >
        {isLoaded ? (
          <>
            <p className="font-roboto text-[5rem]">{judul}</p>
            {photo && (
              <div className="h-full w-full">
                <img
                  src={photo}
                  alt={judul}
                  className="h-full w-full rounded-3xl object-cover filter"
                  loading="lazy"
                />
              </div>
            )}
            <div
              dangerouslySetInnerHTML={{ __html: isi }}
              className="article-content"
            />
          </>
        ) : (
          <SingleSkeleton height="h-[30vh]" />
        )}
      </div>
    </div>
  )
}
