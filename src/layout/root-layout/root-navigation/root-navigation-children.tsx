import Tooltips from '@/components/Tooltip'
import { enumRoute } from '@/libs/enum/enum-route'
import { textPrimary100 } from '@/libs/helpers/format-color'
import { MenuType } from '@/libs/types/beranda-type'
import { setStateHalaman } from '@/store/reducer/stateIdHalaman'
import { ChevronDown } from 'lucide-react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

export function RootNavigationChildren({
  item,
  color,
}: {
  item: MenuType
  color: string
}) {
  const dispatch = useDispatch()

  return (
    <>
      {item?.children?.length > 0 ? (
        <Tooltips
          color={color}
          triggerComponent={
            <div
              className={`flex items-center gap-4 px-32 py-24 uppercase ${textPrimary100(color)}`}
            >
              <p>{item?.nama_menu}</p>
              <ChevronDown size={12} />
            </div>
          }
          tooltipContent={
            <div
              className="flex flex-col gap-y-16 border-l p-12"
              style={{
                borderImage:
                  'linear-gradient(180deg, #FFFFFF 0%, #0D1A4B 100%)',
                borderImageSlice: 1,
              }}
            >
              <div className="mx-16 flex flex-col items-start gap-y-16 text-[2rem]">
                {item?.children.map((list, no) => (
                  <div
                    key={no}
                    onClick={() => {
                      localStorage.setItem('beritaID', list?.id_konten)
                      dispatch(
                        setStateHalaman({
                          id: list?.id_konten,
                          page: list?.nama_menu,
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
                      target={
                        list?.jenis_menu === enumRoute.URL ? '_blank' : '_self'
                      }
                    >
                      <div
                        className={`${textPrimary100(color)} text-nowrap hover:cursor-pointer`}
                      >
                        {list?.nama_menu}
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          }
          position="bottom"
        />
      ) : (
        item?.nama_menu
      )}
    </>
  )
}
