import {
  bgPrimary400,
  bgPrimary700,
  textPrimary700,
} from '@/libs/helpers/format-color'
import { convertToSlug } from '@/libs/helpers/format-text'
import { BerandaType } from '@/libs/types/beranda-type'
import { setStateHalaman } from '@/store/reducer/stateIdHalaman'
import dayjs from 'dayjs'
import 'dayjs/locale/id'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

export function CardTypeH({
  kelompok,
  data,
  color,
  index,
  isShow,
}: {
  kelompok: string
  data: BerandaType
  color: string
  index: number
  isShow?: boolean
}) {
  const handleBeritaClick = (id) => {
    localStorage.setItem('beritaID', id)
  }

  const dispatch = useDispatch()
  const navigate = useNavigate()

  return (
    <div className="flex flex-col overflow-hidden">
      <div
        className="relative col-span-6 block transition-transform duration-300 ease-in-out hover:scale-105 hover:bg-opacity-0"
        style={{ borderRadius: '3rem' }}
      >
        <img
          src={data?.berita?.[index]?.photo?.gambar}
          alt={data?.berita?.[index]?.photo?.keterangan}
          className="h-[50vh] w-full bg-opacity-10 object-cover filter hover:bg-opacity-0 phones:h-[30vh]"
          loading="lazy"
          style={{
            borderRadius: '3rem',
          }}
        />
        <div className="absolute top-0 flex h-full w-[100%]">
          <Link
            to={`/${convertToSlug(kelompok)}/page/${data?.berita?.[index]?.seo}`}
            onClick={() => {
              handleBeritaClick(data?.berita?.[index]?.id)
              dispatch(
                setStateHalaman({
                  id: data?.berita?.[index]?.id,
                  page: data?.berita?.[index]?.seo,
                }),
              )
            }}
            style={{ borderRadius: '3rem' }}
            className={`relative flex h-full w-full flex-col hover:bg-opacity-0 ${bgPrimary700(color)} bg-opacity-20`}
          >
            <div className="flex flex-shrink flex-col gap-16 p-32">
              <div className="flex">
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    localStorage.setItem(
                      'beritaID',
                      data?.berita?.[index]?.seo_kategori,
                    )
                    dispatch(
                      setStateHalaman({
                        page: data?.berita?.[index]?.kategori,
                        id: data?.berita?.[index]?.seo_kategori,
                      }),
                    )
                    navigate(
                      `/${kelompok}/${data?.berita?.[index]?.seo_kategori}`,
                    )
                  }}
                  className={`flex items-center gap-8 rounded-full bg-white px-24 py-8 ${textPrimary700(color)}`}
                >
                  <p
                    className={`h-[1.6rem] w-[1.6rem] rounded-full ${bgPrimary400(color)}`}
                  ></p>
                  <p>{data?.berita?.[index]?.kategori}</p>
                </button>
              </div>
              <p
                className={`line-clamp-3 rounded-lg text-[4rem] font-bold tracking-0.25 text-white ${isShow ? 'line-clamp-2 phones:block' : 'phones:hidden'}`}
                style={{ lineHeight: '150%' }}
              >
                {data?.berita?.[index]?.judul}
              </p>
              <p
                className={`text-[2.4rem] tracking-1.25 text-white ${isShow ? 'phones:block' : 'phones:hidden'}`}
              >
                {dayjs(data?.berita?.[index]?.tanggal)
                  .locale('id')
                  .format('DD MMMM YYYY')}
              </p>
            </div>
          </Link>
        </div>
      </div>
      <Link
        to={`/${convertToSlug(kelompok)}/page/${data?.berita?.[index]?.seo}`}
        onClick={() => {
          handleBeritaClick(data?.berita?.[index]?.id)
          dispatch(
            setStateHalaman({
              id: data?.berita?.[index]?.id,
              page: data?.berita?.[index]?.seo,
            }),
          )
        }}
        className={`${isShow ? 'phones:hidden' : ''} hidden phones:block`}
        style={{
          borderBottomLeftRadius: '3rem',
          borderBottomRightRadius: '3rem',
        }}
      >
        <div
          style={{
            borderBottomLeftRadius: '3rem',
            borderBottomRightRadius: '3rem',
          }}
          className={`flex flex-col gap-32 border bg-white p-32 ${textPrimary700(color)}`}
        >
          <p className="text-[2.4rem] tracking-1.25">
            {dayjs(data?.berita?.[index]?.tanggal)
              .locale('id')
              .format('DD MMMM YYYY')}
          </p>
          <p
            className="line-clamp-3 rounded-lg text-[4rem] font-bold tracking-0.25"
            style={{ lineHeight: '150%' }}
          >
            {data?.berita?.[index]?.judul}
          </p>
        </div>
      </Link>
    </div>
  )
}
