import {
  Menubar,
  MenubarContent,
  MenubarMenu,
  MenubarTrigger,
} from '@/components/Menubar'
import { bgPrimary500 } from '@/libs/helpers/format-color'
import { LayananType } from '@/libs/types/layanan-type'
import { useGetLayananQuery } from '@/store/slices/layananAPI'
import { LayoutDashboard } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export function MenubarLayanan({ color }: { color: string }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const handleCloseMenubarContent = () => {
    setIsMenuOpen(false)
  }

  const [layanan, setLayanan] = useState<LayananType[]>([])
  const {
    data: dataLayanan,
    isLoading: isLoadingLayanan,
    isFetching: isFetchingLayanan,
  } = useGetLayananQuery()

  const loading = isLoadingLayanan || isFetchingLayanan

  useEffect(() => {
    if (dataLayanan?.data) {
      setLayanan(dataLayanan?.data)
    }
  }, [dataLayanan?.data])

  return (
    <Menubar className="px-4">
      <MenubarMenu>
        <MenubarTrigger
          disabled={loading || layanan?.length < 1}
          className="w-full text-center text-white transition-all duration-300 hover:cursor-pointer hover:opacity-90 disabled:cursor-not-allowed"
          variant="nothing"
          layout="icon"
          size="fit"
          onClick={handleMenuClick}
        >
          <span className={`rounded-2xl ${bgPrimary500(color)}`}>
            <LayoutDashboard size={16} />
          </span>
        </MenubarTrigger>
        {isMenuOpen && (
          <MenubarContent className="shadow-grey-light-1 absolute left-[1rem] top-[1rem] w-[35rem] rounded-2xl transition-all duration-300">
            <div className="flex flex-col gap-16 bg-white p-24">
              {layanan?.map((item, idx) => (
                <Link
                  to={`${item?.url}`}
                  className={`text-[2.4rem] hover:cursor-pointer hover:text-slate-500`}
                  key={idx}
                  onClick={() => {
                    handleCloseMenubarContent()
                  }}
                >
                  {item?.nama_layanan}
                </Link>
              ))}
            </div>
          </MenubarContent>
        )}
      </MenubarMenu>
    </Menubar>
  )
}
