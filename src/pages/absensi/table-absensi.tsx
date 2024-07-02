import { SingleSkeleton } from '@/components/skeleton-component'
import { PresensiType } from '@/libs/types/absensi-tyoe'
import clsx from 'clsx'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'

export function TableAbsensi({ item }: { item: PresensiType[] }) {
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
      className={`scrollbar flex h-full w-full flex-col overflow-auto `}
      style={{ scrollbarGutter: 'stable' }}
    >
      {!isLoaded ? (
        <SingleSkeleton height="h-full" />
      ) : (
        <table className="rounded-3x scrollbar h-full w-full flex-1 border-collapse overflow-auto bg-[#fcfcfc] text-[2rem]">
          <thead className="align-top text-[2rem] leading-medium">
            <tr>
              <th className="sticky top-0 w-[5%] bg-[#1835B3] px-24 py-16 text-center align-middle text-white">
                No
              </th>
              <th className="sticky top-0 w-[35%] bg-[#1835B3] px-24 py-16 text-center align-middle text-white">
                Nama dan Jabatan
              </th>
              <th className="sticky top-0 w-[15%] bg-[#1835B3] px-24 py-16 text-center align-middle text-white">
                Absensi Masuk
              </th>
              <th className="sticky top-0 w-[15%] bg-[#1835B3] px-24 py-16 text-center align-middle text-white">
                Jam Datang
              </th>
              <th className="sticky top-0 w-[15%] bg-[#1835B3] px-24 py-16 text-center align-middle text-white">
                Absensi Keluar
              </th>
              <th className="sticky top-0 w-[15%] bg-[#1835B3] px-24 py-16 text-center align-middle text-white">
                Jam Keluar
              </th>
            </tr>
          </thead>
          <tbody>
            {item?.map((list, idx) => (
              <tr
                key={idx}
                className="transition-all ease-in hover:cursor-pointer"
              >
                <td className="px-24 py-12 text-center align-middle font-sans text-[2rem] leading-medium">
                  {idx + 1}
                </td>
                <td className="px-24 py-12 text-center align-middle font-sans text-[2.4rem] font-bold leading-medium">
                  {list?.nama}
                </td>
                <td className="flex justify-center px-24 py-12 text-center align-middle font-sans text-[2rem] leading-medium">
                  {list?.gambar_in ? (
                    <img
                      src={list?.gambar_in}
                      alt={list?.nama}
                      loading="lazy"
                      className="h-[10rem] w-[10rem] rounded-2xl object-cover"
                    />
                  ) : (
                    'Tidak Ada'
                  )}
                </td>
                <td
                  className={clsx(
                    'px-24 py-12 text-center align-middle font-sans text-[2rem] font-bold leading-medium',
                    {
                      'text-[#137719]': list?.status_in === 'Ontime',
                      'text-[#DD1F1F]': list?.status_in === 'Alpa',
                      'text-[#FF9502]': list?.status_in === 'Sakit',
                    },
                  )}
                >
                  {list?.in_at ? (
                    <div className="flex flex-col gap-4">
                      <p>{list?.status_in}</p>
                      <p>{dayjs(list?.in_at)?.locale('id').format('HH:mm')}</p>
                    </div>
                  ) : (
                    list?.status_in
                  )}
                </td>
                <td className="flex justify-center px-24 py-12 text-center align-middle font-sans text-[2rem] leading-medium">
                  {list?.gambar_in ? (
                    <img
                      src={list?.gambar_in}
                      alt={list?.nama}
                      loading="lazy"
                      className="h-[10rem] w-[10rem] rounded-2xl object-cover"
                    />
                  ) : (
                    'Tidak Ada'
                  )}
                </td>
                <td
                  className={clsx(
                    'px-24 py-12 text-center align-middle font-sans text-[2rem] font-bold leading-medium',
                    {
                      'text-[#137719]': list?.status_in === 'Ontime',
                      'text-[#DD1F1F]':
                        list?.status_in === 'Alpa' ||
                        list?.status_out === 'Tidak Mengisi Absensi Pulang',
                      'text-[#FF9502]': list?.status_in === 'Sakit',
                    },
                  )}
                >
                  {list?.status_in === 'Alpa' ? (
                    'Alpa'
                  ) : (
                    <div className="flex flex-col gap-4">
                      <p>{list?.status_out ?? 'Ontime'}</p>
                      {!list?.status_out && (
                        <p>
                          {dayjs(list?.out_at).locale('id').format('HH:mm')}
                        </p>
                      )}
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
