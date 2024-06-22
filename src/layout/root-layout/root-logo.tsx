import { SingleSkeleton } from '@/components/skeleton-component'
import { IdentitasType } from '@/libs/types/beranda-type'
import { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { Link } from 'react-router-dom'

export function RootLogo({ identitas }: { identitas: IdentitasType }) {
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
      id="header"
      className="flex h-[20vh] items-center justify-center phones:h-[12vh]"
    >
      {isLoaded ? (
        <div className={`relative block w-full`}>
          <img
            src="/img/bg-logo-large.jpg"
            alt={identitas?.nama_website}
            className={`h-[20vh] w-full rounded-lg object-cover filter phones:h-[12vh]`}
            loading="lazy"
          />
          <div className="absolute top-0 flex h-full w-[100%] bg-white bg-opacity-70">
            <Link
              to={`/`}
              className={`relative flex h-full w-full flex-col items-center justify-center border-white`}
            >
              <div className="flex  items-center gap-32 p-32">
                <img
                  src={identitas?.logo ?? '/img/SMA.png'}
                  alt={identitas?.nama_website}
                  className={`h-[12vh] rounded-lg object-cover filter phones:h-[9vh]`}
                  loading="lazy"
                />
                <div className="flex flex-col gap-12">
                  <p className="text-[2.4rem]">{identitas?.nama_website}</p>
                  <p className="text-[2rem] phones:hidden">
                    {identitas?.alamat}
                  </p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      ) : (
        <SingleSkeleton height="h-[20vh] phones:h-[12vh]" />
      )}
    </div>
  )
}
