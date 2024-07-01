import { enumRoute } from '@/libs/enum/enum-route'
import { MenuType } from '@/libs/types/beranda-type'
import { Link } from 'react-router-dom'
import { RootMobileChildren } from './root-mobile-children'
import { Dispatch, SetStateAction } from 'react'
import { useDispatch } from 'react-redux'
import { setStateHalaman } from '@/store/reducer/stateIdHalaman'

export function RootMobileParent({
  data,
  setIsShow,
}: {
  data: MenuType[]
  setIsShow: Dispatch<SetStateAction<boolean>>
}) {
  const dispatch = useDispatch()

  return (
    <>
      {data?.map((item, idx) => (
        <Link
          to={
            item?.nama_menu === 'Home'
              ? '/'
              : item?.slug === 'program-sekolah'
                ? '#'
                : item?.slug === 'akademik'
                  ? '#'
                  : item?.jenis_menu === enumRoute.ROUTE
                    ? item?.slug
                    : item?.jenis_menu === enumRoute.HALAMAN &&
                        item?.id_konten === ''
                      ? `/halaman`
                      : item?.jenis_menu === enumRoute.HALAMAN &&
                          item?.id_konten !== ''
                        ? `/halaman/page/${item?.slug}`
                        : item?.jenis_menu === enumRoute.PROGRAM
                          ? `/program-details`
                          : item?.jenis_menu === enumRoute.BERITA
                            ? `/berita`
                            : item?.jenis_menu === enumRoute.MADING
                              ? `/mading`
                              : item?.jenis_menu === enumRoute.AGENDA
                                ? `/agenda`
                                : item?.jenis_menu === enumRoute.PENGUMUMAN
                                  ? `/pengumuman`
                                  : item?.jenis_menu === enumRoute.PRESTASI
                                    ? `/prestasi`
                                    : item?.jenis_menu === enumRoute.URL
                                      ? item?.id_konten
                                      : item?.slug
          }
          target={item?.jenis_menu === enumRoute.URL ? '_blank' : '_self'}
          key={idx}
          className="p-16 text-[2rem] uppercase hover:cursor-pointer phones:text-[2.4rem]"
          onClick={() => {
            if (
              item?.jenis_menu === enumRoute?.HALAMAN &&
              item?.id_parent !== ''
            ) {
              localStorage.setItem('beritaID', item?.id_konten)
              dispatch(
                setStateHalaman({
                  page: item?.slug,
                  id: item?.id_konten,
                }),
              )
            }
          }}
        >
          <RootMobileChildren item={item} setIsShow={setIsShow} />
        </Link>
      ))}
    </>
  )
}
