import { BerandaType } from '@/libs/types/beranda-type'
import { useGetBerandaQuery } from '@/store/slices/berandaAPI'
import { useEffect, useState } from 'react'
import {
  bgPrimary900,
  textPrimary100,
  textPrimary700,
} from '@/libs/helpers/format-color'
import { convertSlugToText, convertToSlug } from '@/libs/helpers/format-text'
import { Link } from 'react-router-dom'
import { SingleSkeleton } from '@/components/skeleton-component'
import { CardListB, CardTypeI, CardTypeJ } from '@/components/cards-component'

export function HomeCard({ color }: { color: string }) {
  //   --- Beranda ---
  const [beranda, setBeranda] = useState<BerandaType[]>([])
  const {
    data: dataBeranda,
    isFetching: isFetchingBeranda,
    isLoading: isLoadingBeranda,
  } = useGetBerandaQuery()

  const loadingBeranda = isFetchingBeranda || isLoadingBeranda

  useEffect(() => {
    if (dataBeranda?.data) {
      setBeranda(dataBeranda?.data)
    }
  }, [dataBeranda?.data])

  const berita = beranda?.find((item) => item?.kelompok === 'Berita')
  const pengumuman = beranda?.find((item) => item?.kelompok === 'Pengumuman')
  const agenda = beranda?.find((item) => item?.kelompok === 'Agenda')

  return (
    <div className="flex flex-col gap-32 px-64 phones:px-32">
      <div className="flex flex-col gap-128">
        {loadingBeranda ? (
          <SingleSkeleton height="h-[30vh]" />
        ) : (
          beranda?.length > 0 && (
            <div className="flex flex-col gap-32">
              <CardListB
                data={berita}
                kelompok={berita?.kelompok}
                color={color}
              />
              <div className="flex h-full w-full gap-32 phones:flex-col">
                <div
                  className={`flex-1 rounded-3xl ${bgPrimary900(color)} p-32`}
                >
                  <div className="flex min-h-[70vh] flex-col items-center justify-between gap-32">
                    <div className="flex flex-col items-center justify-start gap-64">
                      <div className="flex flex-col items-center justify-center">
                        <img
                          src="/img/block-icon-news.png"
                          alt="Pengumuman"
                          loading="lazy"
                          className="h-[20rem] w-[20rem]"
                        />
                        <p className="text-[3.2rem] font-bold">Pengumuman</p>
                      </div>
                      <CardTypeI pengumuman={pengumuman} />
                    </div>
                    <div className="flex w-full flex-col items-center gap-32">
                      <hr className="w-full border border-border" />
                      <Link
                        to={`/${convertToSlug(pengumuman?.kelompok)}`}
                        className={`text-[2.4rem] ${textPrimary100(color)}`}
                      >
                        Lihat Semua {convertSlugToText(pengumuman?.kelompok)}
                      </Link>
                    </div>
                  </div>
                </div>
                <div
                  className={`flex-1 ${textPrimary700(color)} rounded-3xl bg-white p-32`}
                >
                  <div className="flex min-h-[70vh] flex-col items-center justify-between gap-32">
                    <div className="flex flex-col items-center justify-start gap-64">
                      <div className="flex flex-col items-center justify-center">
                        <img
                          src="/img/block-icon-calendar.png"
                          alt="Agenda"
                          loading="lazy"
                          className="h-[20rem] w-[20rem]"
                        />
                        <p className="text-[3.2rem] font-bold">Agenda</p>
                      </div>
                      <CardTypeJ agenda={agenda} />
                    </div>
                    <div className="flex w-full flex-col items-center gap-32">
                      <hr className="w-full border border-background" />
                      <Link
                        to={`/${convertToSlug(agenda?.kelompok)}`}
                        className={`text-[2.4rem] ${textPrimary700(color)}`}
                      >
                        Lihat Semua {convertSlugToText(agenda?.kelompok)}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  )
}
