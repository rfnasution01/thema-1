import { MenubarColor } from '@/components/menubar-component'
import { bgPrimary700 } from '@/libs/helpers/format-color'
import { LayoutDashboard, X } from 'lucide-react'
import { Dispatch, SetStateAction } from 'react'

export function RootNavigationMobileMain({
  color,
  isShow,
  setIsShow,
}: {
  color: string
  isShow: boolean
  setIsShow: Dispatch<SetStateAction<boolean>>
}) {
  return (
    <div
      className={`${bgPrimary700(color)} sticky top-0 z-20 hidden p-32 phones:block`}
    >
      <div
        className="flex items-center justify-between gap-12"
        onClick={() => setIsShow(!isShow)}
      >
        <div className="flex items-center gap-12">
          {isShow ? <X size={16} /> : <LayoutDashboard size={16} />}
          Menu
        </div>
        <button
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
          }}
        >
          <MenubarColor color={color} isMobile />
        </button>
      </div>
    </div>
  )
}
