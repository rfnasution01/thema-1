import { bgWhite } from '@/libs/helpers/format-color'
import { convertToSlug } from '@/libs/helpers/format-text'
import { BerandaType } from '@/libs/types/beranda-type'
import { setStateHalaman } from '@/store/reducer/stateIdHalaman'
import dayjs from 'dayjs'
import 'dayjs/locale/id'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

export function CardTypeG({
  kelompok,
  data,
  color,
  width = 'w-1/2',
  index,
  isSmall,
  isShow,
}: {
  kelompok: string
  data: BerandaType
  color: string
  width?: 'w-1/2' | 'w-full'
  index: number
  isSmall?: boolean
  isShow?: boolean
}) {
  const dispatch = useDispatch()

  return (
    <Link
      to={`/${convertToSlug(kelompok)}/page/${data?.berita?.[index]?.seo}`}
      onClick={() => {
        localStorage.setItem('beritaID', data?.berita?.[index]?.id)
        dispatch(
          setStateHalaman({
            page: data?.berita?.[index]?.judul,
            id: data?.berita?.[index]?.id,
          }),
        )
      }}
      style={{ borderRadius: '3rem' }}
      className={`${bgWhite(color)} flex h-full w-full shadow-md ${width} flex-col items-center overflow-hidden border bg-white hover:cursor-pointer phones:w-full phones:flex-col phones:items-start`}
    >
      <div
        className={`w-full flex-1 ${isShow ? 'phones:block' : 'phones:hidden'} transition-transform duration-300 ease-in-out hover:scale-110`}
      >
        <img
          src={data?.berita?.[index]?.photo?.gambar}
          alt={data?.berita?.[index]?.photo?.keterangan}
          className="h-[25vh] w-full object-cover filter"
          style={{
            borderTopLeftRadius: '3rem',
            borderTopRightRadius: '3rem',
          }}
          loading="lazy"
        />
      </div>
      <div
        className={`flex w-full flex-1 gap-24 p-32 ${isSmall ? 'flex-col-reverse' : 'flex-col'}`}
      >
        <p className={`text-[1.8rem] tracking-1.25`}>
          {dayjs(data?.berita?.[index]?.tanggal)
            .locale('id')
            .format('DD MMMM YYYY')}
        </p>
        <p
          className={`rounded-lg ${isSmall ? 'line-clamp-2' : 'line-clamp-3'} text-[2.4rem] font-bold tracking-0.25`}
          style={{ lineHeight: '150%' }}
        >
          {data?.berita?.[index]?.judul}
        </p>
      </div>
    </Link>
  )
}
