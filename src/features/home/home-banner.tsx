import { SingleSkeleton } from '@/components/skeleton-component'
import { SliderAtomic2, SliderTypeA } from '@/components/sliders-component'
import { bgPrimary200, bgPrimary800 } from '@/libs/helpers/format-color'
import { SliderType } from '@/libs/types/beranda-type'
import { useGetSliderQuery } from '@/store/slices/berandaAPI'
import { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'

export function HomeBanner({ color }: { color: string }) {
  // --- Slider ---
  const [slider, setSlider] = useState<SliderType[]>([])
  const {
    data: dataSlider,
    isFetching: isFetchingSlider,
    isLoading: isLoadingSlider,
  } = useGetSliderQuery()

  const loadingSlider = isFetchingSlider || isLoadingSlider

  useEffect(() => {
    if (dataSlider?.data) {
      setSlider(dataSlider?.data)
    }
  }, [dataSlider?.data])

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

  const [showIndex, setShowIndex] = useState<number>(0)

  return (
    <div ref={ref} className="flex h-full phones:h-[30vh]">
      {loadingSlider ? (
        <SingleSkeleton height="h-[30vh]" />
      ) : (
        <>
          <div className="flex w-full flex-col gap-32 phones:h-[30vh]">
            {isLoaded ? (
              <>
                <div className="block phones:hidden">
                  <SliderTypeA
                    showIndex={showIndex}
                    setShowIndex={setShowIndex}
                    slider={slider}
                    color={color}
                  />
                  {slider?.length > 1 && (
                    <div className="flex items-center justify-center gap-x-16">
                      {slider?.map((_item, idx) => (
                        <div
                          onClick={() => setShowIndex(idx)}
                          className={`h-16 w-16 rounded-full hover:cursor-pointer ${idx === showIndex ? bgPrimary800(color) : bgPrimary200(color)}`}
                          key={idx}
                        />
                      ))}
                    </div>
                  )}
                </div>
                <div className="hidden h-[30vh] phones:block">
                  <SliderAtomic2
                    slider={slider}
                    setShowIndex={setShowIndex}
                    showIndex={showIndex}
                    color={color}
                  />
                </div>
              </>
            ) : (
              <SingleSkeleton height="h-[30vh]" />
            )}
          </div>
        </>
      )}
    </div>
  )
}
