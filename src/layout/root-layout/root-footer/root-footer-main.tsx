import { SingleSkeleton } from '@/components/skeleton-component'
import {
  bgPrimary700,
  bgPrimary900,
  textPrimary100,
} from '@/libs/helpers/format-color'
import { IdentitasType } from '@/libs/types/beranda-type'
import { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { RootFooterAlamat } from './root-footer-alamat'
import { RootFooterKontak } from './root-footer-kontak'
import { RootFooterPopuler } from './root-footer-populer'
import { RootFooterCopyright } from './root-footer-copyright'

export function RootFooterMain({
  color,
  identitas,
  loadingIdentitas,
}: {
  color: string
  identitas: IdentitasType
  loadingIdentitas: boolean
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
    <div ref={ref} className={`flex flex-col ${textPrimary100(color)}`}>
      {isLoaded ? (
        <>
          {!loadingIdentitas ? (
            <>
              <div
                className={`${bgPrimary700(color)} flex w-full gap-32 px-64 py-32 phones:flex-col phones:items-start phones:gap-64 phones:px-32`}
              >
                {/* --- Alamat --- */}
                <RootFooterAlamat identitas={identitas} />

                {/* --- Populer --- */}
                <RootFooterPopuler />
                {/* --- Kontak Kami --- */}
                <RootFooterKontak color={color} />
              </div>
              <RootFooterCopyright color={color} identitas={identitas} />
            </>
          ) : (
            <SingleSkeleton height="h-[30vh]" />
          )}
        </>
      ) : (
        <div className="flex flex-col">
          <div
            className={`${bgPrimary700(color)} flex gap-32 px-64 py-32 phones:flex-col phones:p-32`}
          >
            <div className="flex w-1/3 flex-col gap-12 phones:w-full">
              <SingleSkeleton height="h-[2vh]" />
              <SingleSkeleton height="h-[2vh]" classname="phones:hidden" />
              <SingleSkeleton height="h-[2vh]" classname="phones:hidden" />
            </div>
            <div className="flex w-1/3 flex-col gap-12 phones:w-full">
              <SingleSkeleton height="h-[6vh]" />
              <SingleSkeleton height="h-[6vh]" classname="phones:hidden" />
            </div>
            <div className="flex w-1/3 flex-col gap-32 phones:w-full">
              <SingleSkeleton height="h-[8vh]" />
            </div>
          </div>
          <div className={`${bgPrimary900(color)} px-64 py-32 phones:p-32`}>
            <SingleSkeleton />
          </div>
        </div>
      )}
    </div>
  )
}
