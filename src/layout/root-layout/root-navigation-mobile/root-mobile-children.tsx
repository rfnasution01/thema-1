import { enumRoute } from '@/libs/enum/enum-route'
import { MenuType } from '@/libs/types/beranda-type'
import { setStateHalaman } from '@/store/reducer/stateIdHalaman'
import { Dispatch, SetStateAction } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

export function RootMobileChildren({
  item,
  setIsShow,
}: {
  item: MenuType
  setIsShow: Dispatch<SetStateAction<boolean>>
}) {
  const dispatch = useDispatch()

  return (
    <ul onClick={() => setIsShow(false)}>
      {item?.children?.length > 0 ? (
        <div className="flex flex-col gap-24">
          <p>{item?.nama_menu}</p>
          {item?.children?.map((list, id) => (
            <li
              className="pl-32"
              key={id}
              onClick={() => {
                localStorage.setItem('beritaID', list?.id_konten)
                dispatch(
                  setStateHalaman({
                    id: list?.id_konten,
                    page: item?.nama_menu,
                  }),
                )
              }}
            >
              <Link
                to={
                  list?.nama_menu === 'Home'
                    ? '/'
                    : list?.jenis_menu === enumRoute.ROUTE
                      ? list?.slug
                      : list?.jenis_menu === enumRoute.HALAMAN
                        ? `/halaman/page/${list?.slug}`
                        : list?.jenis_menu === enumRoute.PROGRAM
                          ? `/program-details/page/${list?.slug}`
                          : list?.jenis_menu === enumRoute.BERITA
                            ? `/berita/page/${list?.slug}`
                            : list?.jenis_menu === enumRoute.AGENDA
                              ? `/agenda/page/${list?.slug}`
                              : list?.jenis_menu === enumRoute.PENGUMUMAN
                                ? `/pengumuman/page/${list?.slug}`
                                : list?.jenis_menu === enumRoute.PRESTASI
                                  ? `/prestasi/page/${list?.slug}`
                                  : list?.jenis_menu === enumRoute.URL
                                    ? list?.id_konten
                                    : list?.slug
                }
                target={list?.jenis_menu === enumRoute.URL ? '_blank' : '_self'}
              >
                {list?.nama_menu}
              </Link>
            </li>
          ))}
        </div>
      ) : (
        item?.nama_menu
      )}
    </ul>
  )
}
