import { FaqDetailType } from '@/libs/types/faq-type'
import { Accordion } from './faq-accordion'
import { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { SingleSkeleton } from '@/components/skeleton-component'

export function FaqDetail({ data }: { data: FaqDetailType[] }) {
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
    <div ref={ref} className={'flex flex-col gap-12 p-32 phones:p-0'}>
      {isLoaded ? (
        <>
          {data?.map((item, idx) => (
            <div key={idx}>
              <Accordion
                title={item?.pertanyaan}
                content={item?.jawaban}
                idx={idx}
              />
            </div>
          ))}
        </>
      ) : (
        <>
          <SingleSkeleton />
          <SingleSkeleton classname="phones:hidden" />
          <SingleSkeleton classname="phones:hidden" />
        </>
      )}
    </div>
  )
}
