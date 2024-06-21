import { enumRoute } from '@/libs/enum/enum-route'
import { MenuType } from '@/libs/types/beranda-type'
import { Link } from 'react-router-dom'

export function RootHeaderMapping({
  menuTop,
  className,
}: {
  menuTop: MenuType[]
  className?: string
}) {
  return (
    <div className={`flex items-center gap-32 ${className}`}>
      {menuTop?.slice(0, 3).map((item, idx) => (
        <Link
          to={
            item?.nama_menu === 'Home'
              ? '/'
              : item?.slug === 'merdeka-belajar-kampus-merdeka-mbkm'
                ? '#'
                : item?.jenis_menu === enumRoute.ROUTE
                  ? item?.slug
                  : item?.jenis_menu === enumRoute.HALAMAN
                    ? `/halaman`
                    : item?.jenis_menu === enumRoute.PROGRAM
                      ? `/program-details`
                      : item?.jenis_menu === enumRoute.BERITA
                        ? `/berita`
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
          target={item?.jenis_menu === 'URL' ? '_blank' : '_self'}
          key={idx}
          className="hover:text-white"
        >
          {item?.nama_menu}
        </Link>
      ))}
    </div>
  )
}
