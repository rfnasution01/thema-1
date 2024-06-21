import { SliderType } from '@/libs/types/beranda-type'
import { Dispatch, SetStateAction } from 'react'
import { SliderAtomic1 } from './slider-atomic-1'

export function SliderTypeA({
  slider,
  showIndex,
  setShowIndex,
  color,
}: {
  slider: SliderType[]
  showIndex: number
  setShowIndex: Dispatch<SetStateAction<number>>
  color: string
}) {
  return (
    <div className="flex h-full w-full">
      <div className="w-1/12 phones:w-1/12">
        {slider?.length > 0 && (
          <div className="h-full flex-shrink-0">
            <SliderAtomic1
              gambar={
                slider?.[
                  showIndex > 0 ? showIndex - 1 : showIndex === 0 ? 1 : 0
                ]?.gambar
              }
              keterangan={
                slider?.[
                  showIndex > 0 ? showIndex - 1 : showIndex === 0 ? 1 : 0
                ]?.judul
              }
              height="h-[77vh]"
              url={
                slider?.[
                  showIndex > 0 ? showIndex - 1 : showIndex === 0 ? 1 : 0
                ]?.url
              }
              isShadow
              slider={slider}
              showIndex={showIndex}
              setShowIndex={setShowIndex}
            />
          </div>
        )}
      </div>
      <div className="w-10/12 flex-shrink-0 phones:w-10/12">
        <SliderAtomic1
          gambar={slider?.[showIndex]?.gambar}
          keterangan={slider?.[showIndex]?.judul}
          height="h-[77vh]"
          url={slider?.[showIndex]?.url}
          slider={slider}
          showIndex={showIndex}
          setShowIndex={setShowIndex}
          isShowNext
          color={color}
        />
      </div>
      <div className="w-1/12 flex-shrink-0 phones:w-1/12">
        {slider?.length > 0 && (
          <div className="h-full">
            <SliderAtomic1
              gambar={
                slider?.[
                  showIndex < slider?.length - 1
                    ? showIndex + 1
                    : showIndex === 0
                      ? 1
                      : 0
                ]?.gambar
              }
              keterangan={
                slider?.[
                  showIndex < slider?.length - 1
                    ? showIndex + 1
                    : showIndex === 0
                      ? 1
                      : 0
                ]?.judul
              }
              height="h-[77vh]"
              url={
                slider?.[
                  showIndex < slider?.length - 1
                    ? showIndex + 1
                    : showIndex === 0
                      ? 1
                      : 0
                ]?.url
              }
              isShadow
              slider={slider}
              showIndex={showIndex}
              setShowIndex={setShowIndex}
            />
          </div>
        )}
      </div>
    </div>
  )
}
