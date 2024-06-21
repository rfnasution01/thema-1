import { IconLeft, IconRight } from '@/assets'
import { SliderType } from '@/libs/types/beranda-type'
import clsx from 'clsx'
import { Dispatch, SetStateAction } from 'react'
import { Link } from 'react-router-dom'

export function SliderAtomic1({
  height = 'h-[80vh]',
  gambar,
  keterangan,
  isShadow,
  slider,
  showIndex,
  setShowIndex,
  isShowNext,
  url,
  color,
}: {
  height?: string
  gambar: string
  keterangan: string
  isShadow?: boolean
  slider: SliderType[]
  showIndex?: number
  setShowIndex: Dispatch<SetStateAction<number>>
  isShowNext?: boolean
  url?: string
  color?: string
}) {
  return (
    <Link to={`${url === null ? '/' : url}`} className={`relative block`}>
      <img
        src={gambar}
        alt={keterangan}
        className={`phones:h-[30vh] ${height} w-full rounded-lg bg-opacity-10 object-cover filter`}
        loading="lazy"
      />
      <div
        className={`absolute top-0 flex h-full w-[100%] ${isShadow ? `bg-black-100 bg-opacity-80` : ''}`}
      >
        {isShowNext && (
          <div
            className={`relative flex h-full w-full flex-col justify-end border-white `}
          >
            {slider?.length > 1 && (
              <div
                className={`absolute bottom-0 top-0 flex ${isShadow ? 'w-[80%] phones:w-[70%]' : 'w-full'} flex-grow items-center justify-between px-4`}
              >
                <button
                  type="button"
                  className={clsx('', {
                    'hover:cursor-pointer': showIndex > 0,
                    'opacity-50': !(showIndex > 0),
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
                    'opacity-50': !(showIndex < slider?.length - 1),
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
        )}
      </div>
    </Link>
  )
}
