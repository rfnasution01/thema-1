import { IconLeft, IconRight } from '@/assets'
import { SliderType } from '@/libs/types/beranda-type'
import clsx from 'clsx'
import { Dispatch, SetStateAction } from 'react'
import { Link } from 'react-router-dom'

export function SliderAtomic2({
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
    <div className={`relative col-span-6 block`}>
      <img
        src={slider?.[showIndex]?.gambar}
        alt={slider?.[showIndex]?.judul}
        className={`h-[77vh] w-full rounded-lg bg-opacity-10 object-cover filter phones:h-[30vh]`}
        style={{}}
        loading="lazy"
      />
      <Link
        to={slider?.[showIndex]?.url}
        target="_blank"
        className="absolute top-0 flex h-full w-[100%]"
      >
        <div
          className={`relative flex h-full w-full flex-col justify-end border-white`}
        >
          {slider?.length > 1 && (
            <div
              className={`absolute bottom-0 top-0 flex w-full flex-grow items-center justify-between px-4 phones:w-full`}
            >
              <button
                type="button"
                className={clsx('', {
                  'hover:cursor-pointer': showIndex > 0,
                  'hover:cursor-not-allowed': !(showIndex > 0),
                })}
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation
                  if (showIndex > 0) {
                    setShowIndex(showIndex - 1)
                  }
                }}
              >
                <IconLeft
                  fill2={
                    color === 'SD'
                      ? 'red'
                      : color === 'SMP'
                        ? 'blue'
                        : color === 'SMA'
                          ? 'grey'
                          : color === 'ISLAMIC'
                            ? 'green'
                            : 'blue'
                  }
                />
              </button>
              <button
                type="button"
                className={clsx('', {
                  'hover:cursor-pointer': showIndex < slider?.length - 1,
                  'hover:cursor-not-allowed': !(showIndex < slider?.length - 1),
                })}
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  if (showIndex < slider?.length - 1) {
                    setShowIndex(showIndex + 1)
                  }
                }}
              >
                <IconRight
                  fill2={
                    color === 'SD'
                      ? 'red'
                      : color === 'SMP'
                        ? 'blue'
                        : color === 'SMA'
                          ? 'grey'
                          : color === 'ISLAMIC'
                            ? 'green'
                            : 'blue'
                  }
                />
              </button>
            </div>
          )}
        </div>
      </Link>
    </div>
  )
}
