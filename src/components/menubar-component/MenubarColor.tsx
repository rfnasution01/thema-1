import {
  Menubar,
  MenubarContent,
  MenubarMenu,
  MenubarTrigger,
} from '@/components/Menubar'
import { bgPrimary500 } from '@/libs/helpers/format-color'
import { setStateTheme } from '@/store/reducer/stateTheme'
import { Settings } from 'lucide-react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'

export function MenubarColor({
  color,
  isMobile,
}: {
  color: string
  isMobile?: boolean
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const handleCloseMenubarContent = () => {
    setIsMenuOpen(false)
  }

  const dispatch = useDispatch()

  return (
    <Menubar className="px-4">
      <MenubarMenu>
        <MenubarTrigger
          className="w-full text-center text-white opacity-20 transition-all duration-300 hover:cursor-pointer hover:opacity-90 phones:opacity-100"
          variant="nothing"
          layout="icon"
          size="fit"
          onClick={handleMenuClick}
        >
          <span
            className={`rounded-2xl ${isMobile ? '' : bgPrimary500(color)} p-12 phones:p-0`}
          >
            <Settings size={isMobile ? 16 : 24} />
          </span>
        </MenubarTrigger>
        {isMenuOpen && (
          <MenubarContent className="shadow-grey-light-1 absolute -right-[1rem] -top-[1rem] w-[25rem] transition-all duration-300">
            <div className="flex items-center justify-center gap-16 bg-white p-24">
              {['SD', 'SMP', 'SMA', 'ISLAMIC'].map((item, idx) => (
                <div
                  className={`h-[4rem] w-[4rem] rounded-full hover:cursor-pointer ${item === 'SD' ? 'bg-sd-300' : item === 'SMP' ? 'bg-smp-300' : item === 'SMA' ? 'bg-sma-300' : item === 'ISLAMIC' ? 'bg-islamic-300' : 'bg-sd-300'}`}
                  key={idx}
                  onClick={() => {
                    dispatch(setStateTheme({ color: item }))
                    localStorage.setItem('themeColor', item)
                    handleCloseMenubarContent()
                  }}
                ></div>
              ))}
            </div>
          </MenubarContent>
        )}
      </MenubarMenu>
    </Menubar>
  )
}
