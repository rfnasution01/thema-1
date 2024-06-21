import { BeritaPopuler } from '@/libs/types/beranda-type'
import { setStateHalaman } from '@/store/reducer/stateIdHalaman'
import dayjs from 'dayjs'
import 'dayjs/locale/id'
import { CalendarDays } from 'lucide-react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

export function CardsTypeA({ populer }: { populer: BeritaPopuler[] }) {
  const dispatch = useDispatch()

  return (
    <>
      {populer?.map((item, idx) => (
        <Link
          to={`/berita/page/${item?.seo}`}
          onClick={() => {
            dispatch(setStateHalaman({ page: item?.judul, id: item?.id }))
            localStorage.setItem('beritaID', item?.id)
          }}
          className="flex transform-gpu items-start gap-24 border-b border-border pb-16 duration-300 hover:translate-x-24"
          key={idx}
        >
          <div className="w-2/5">
            <img
              src={item?.gambar?.gambar}
              alt={item?.gambar?.keterangan}
              loading="lazy"
              className="h-[10vh] w-full rounded-lg"
            />
          </div>
          <div className="flex w-3/5 flex-col gap-24">
            <p className="line-clamp-2 font-bold">{item?.judul}</p>
            <div className="flex items-center gap-8 text-[1.6rem]">
              <span>
                <CalendarDays size={14} />
              </span>
              <p>{dayjs(item?.tanggal).locale('id').format('DD MMMM YYYY')}</p>
            </div>
          </div>
        </Link>
      ))}
    </>
  )
}
