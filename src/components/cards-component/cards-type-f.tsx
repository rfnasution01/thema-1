import { convertToSlug } from '@/libs/helpers/format-text'
import { setStateHalaman } from '@/store/reducer/stateIdHalaman'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

export function CardTypeF({
  photo,
  nama,
  isi,
  id,
}: {
  photo: string
  nama: string
  isi: string
  id: string
}) {
  const dispatch = useDispatch()

  return (
    <Link
      to={`/testimonial/page/${convertToSlug(nama)}`}
      onClick={() => {
        localStorage.setItem('beritaID', id)
        dispatch(
          setStateHalaman({
            page: nama,
            id: id,
          }),
        )
      }}
      className="flex h-full flex-col gap-24 rounded-2xl bg-white px-24 pb-32 pt-24 shadow hover:cursor-pointer hover:shadow-lg"
    >
      <div className="h-[25vh] w-full">
        <img
          src={photo}
          alt={nama}
          className="h-full w-full object-cover"
          loading="lazy"
        />
      </div>
      <div className="flex flex-col gap-4">
        <p className="line-clamp-2 font-roboto text-[2.4rem] phones:text-[2.8rem]">
          {nama ?? '-'}
        </p>
        <div
          dangerouslySetInnerHTML={{ __html: isi }}
          className="article-content line-clamp-3"
        />
      </div>
    </Link>
  )
}
