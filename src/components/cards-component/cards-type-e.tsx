import { convertToSlug } from '@/libs/helpers/format-text'
import { setStateHalaman } from '@/store/reducer/stateIdHalaman'
import { ReactNode, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

export function CardTypeE({
  photo,
  nama,
  isi,
  id,
  kelompok,
  height = 'h-[50vh]',
}: {
  photo: string
  nama: string
  isi: string | ReactNode
  id: string
  kelompok: string
  height?: string
}) {
  const [isShow, setIsShow] = useState<boolean>(false)
  const dispatch = useDispatch()
  return (
    <Link
      to={
        kelompok === 'direktori'
          ? ''
          : `/${kelompok}/page/${convertToSlug(nama)}`
      }
      className={`relative block`}
      onMouseEnter={() => {
        setIsShow(true)
      }}
      onMouseLeave={() => {
        setIsShow(false)
      }}
      onClick={() => {
        localStorage.setItem('beritaID', id)
        dispatch(
          setStateHalaman({
            page: nama,
            id: id,
          }),
        )
      }}
    >
      <img
        src={photo}
        alt={nama}
        className={`${height} w-full rounded-2xl bg-opacity-10 object-cover filter phones:h-[30vh]`}
        loading="lazy"
      />
      <div className={`absolute top-0 flex h-full w-[100%]`}>
        <div
          className={`relative flex h-full w-full flex-col justify-end ${isShow ? 'bg-black bg-opacity-65' : ''}`}
        >
          <div className="flex flex-col gap-16 border bg-white p-24">
            <p className="line-clamp-2 font-roboto text-[2.4rem] phones:text-[2.8rem]">
              {nama ?? '-'}
            </p>
            {isShow &&
              (kelompok === 'direktori' ? (
                <div>{isi}</div>
              ) : (
                <div
                  dangerouslySetInnerHTML={{ __html: isi }}
                  className="article-content line-clamp-3"
                />
              ))}
          </div>
        </div>
      </div>
    </Link>
  )
}
