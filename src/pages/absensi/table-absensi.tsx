import { useEffect, useState } from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { UseFormReturn } from 'react-hook-form'
import { useInView } from 'react-intersection-observer'
import { Form } from '@/components/Form'
import { Link } from 'react-router-dom'
import { ChevronLeft } from 'lucide-react'
import { FormLabelInput } from '@/components/input'
import { SingleSkeleton } from '@/components/skeleton-component'
import clsx from 'clsx'
import dayjs from 'dayjs'
import { PresensiType } from '@/libs/types/absensi-tyoe'

export function TableAbsensi({
  item,
  form,
  newvalue,
}: {
  item: PresensiType[]
  form: UseFormReturn
  newvalue: string
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

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 10,
    slidesToScroll: 1,
    vertical: true,
    verticalSwiping: true,
    autoplay: true,
    autoplaySpeed: 2000,
  }

  return (
    <div
      ref={ref}
      className={`flex h-full w-full flex-col gap-12`}
      style={{ scrollbarGutter: 'stable' }}
    >
      <Form {...form}>
        <form className="flex items-center justify-between gap-12 phones:flex-col phones:items-start phones:gap-24">
          <Link to={'/'} className="flex items-center gap-12 text-danger">
            <ChevronLeft size={20} />
            <p className="text-[2.4rem]">Kembali ke Home</p>
          </Link>
          <div className="flex items-center gap-12 phones:w-full">
            <p
              className="text-[2.4rem] font-bold phones:w-1/2"
              style={{ fontWeight: 100 }}
            >
              Hari/Tanggal:
            </p>
            <FormLabelInput
              className="w-full phones:w-1/2"
              name="tanggal"
              type="date"
              form={form}
              defaultValue={newvalue}
            />
          </div>
        </form>
      </Form>
      {!isLoaded ? (
        <SingleSkeleton height="h-full" />
      ) : (
        <div className="h-full flex-1 overflow-hidden">
          <table className="rounded-3x w-full flex-1 border-collapse bg-[#fcfcfc] text-[2rem]">
            <thead className="align-top text-[2rem] leading-medium">
              <tr>
                <th className="sticky top-0 z-10 w-[5%] bg-[#1835B3] px-24 py-16 text-center align-middle text-white">
                  No
                </th>
                <th className="sticky top-0 z-10 w-[35%] bg-[#1835B3] px-24 py-16 text-center align-middle text-white">
                  Nama dan Jabatan
                </th>
                <th className="sticky top-0 z-10 w-[15%] bg-[#1835B3] px-24 py-16 text-center align-middle text-white">
                  Absensi Masuk
                </th>
                <th className="sticky top-0 z-10 w-[15%] bg-[#1835B3] px-24 py-16 text-center align-middle text-white">
                  Jam Datang
                </th>
                <th className="sticky top-0 z-10 w-[15%] bg-[#1835B3] px-24 py-16 text-center align-middle text-white">
                  Absensi Keluar
                </th>
                <th className="sticky top-0 z-10 w-[15%] bg-[#1835B3] px-24 py-16 text-center align-middle text-white">
                  Jam Keluar
                </th>
              </tr>
            </thead>
          </table>
          <Slider {...settings}>
            {item?.map((list, idx) => (
              <div key={idx}>
                <table className="rounded-3x w-full flex-1 border-collapse bg-[#fcfcfc] text-[2rem]">
                  <tbody className="h-full">
                    <tr
                      className={clsx(
                        'text-white transition-all ease-in hover:cursor-pointer',
                        {
                          'bg-[#1DA1F2]': idx % 2 === 0,
                          'bg-[#0099FF]': idx % 2 === 1,
                        },
                      )}
                    >
                      <td className="w-[5%] px-24 py-12 text-center align-middle font-sans text-[2rem] leading-medium">
                        {idx + 1}
                      </td>
                      <td className="w-[35%] px-24 py-12 text-center align-middle font-sans text-[2.4rem] font-bold leading-medium">
                        {list?.nama}
                      </td>
                      <td className="w-[15%] px-24 py-12 text-center align-middle font-sans text-[2rem] leading-medium">
                        <div className="flex items-center justify-center">
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
                        </div>
                      </td>
                      <td
                        className={clsx(
                          'w-[15%] px-24 py-12 text-center align-middle font-sans text-[2rem] font-bold leading-medium',
                        )}
                      >
                        {list?.in_at ? (
                          <div className="flex flex-col gap-4">
                            <p>{list?.status_in}</p>
                            <p>
                              {dayjs(list?.in_at)?.locale('id').format('HH:mm')}
                            </p>
                          </div>
                        ) : (
                          list?.status_in
                        )}
                      </td>
                      <td className="w-[15%] px-24 py-12 text-center align-middle font-sans text-[2rem] leading-medium">
                        <div className="flex items-center justify-center">
                          {list?.gambar_out ? (
                            <img
                              src={list?.gambar_out}
                              alt={list?.nama}
                              loading="lazy"
                              className="h-[10rem] w-[10rem] rounded-2xl object-cover"
                            />
                          ) : (
                            'Tidak Ada'
                          )}
                        </div>
                      </td>
                      <td
                        className={clsx(
                          'w-[15%] px-24 py-12 text-center align-middle font-sans text-[2rem] font-bold leading-medium',
                        )}
                      >
                        {list?.status_in === 'Alpa' ? (
                          'Alpa'
                        ) : (
                          <div className="flex flex-col gap-4">
                            <p>{list?.status_out ?? 'Ontime'}</p>
                            {!list?.status_out && (
                              <p>
                                {dayjs(list?.out_at)
                                  .locale('id')
                                  .format('HH:mm')}
                              </p>
                            )}
                          </div>
                        )}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            ))}
          </Slider>
        </div>
      )}
    </div>
  )
}
