import { bgPrimary100 } from '@/libs/helpers/format-color'
import { getThemeSlice } from '@/store/reducer/stateTheme'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

export function Accordion({
  title,
  content,
  idx,
}: {
  title: string
  content: string
  idx: number
}) {
  const [isActive, setIsActive] = useState(false)

  const stateColor = useSelector(getThemeSlice)?.color

  useEffect(() => {
    if (stateColor) {
      setColor(stateColor)
    }
  }, [stateColor])

  const colorParams = localStorage.getItem('themeColor')

  const baseColor = import.meta.env.VITE_BASE_THEME
  const [color, setColor] = useState<string>(
    colorParams ?? stateColor ?? baseColor,
  )

  return (
    <div className="rounded-lg border hover:cursor-pointer">
      <div
        className={`flex items-center justify-between ${bgPrimary100(color)} px-32 py-16`}
        onClick={() => setIsActive(!isActive)}
      >
        <div>
          {idx + 1}.{title}
        </div>
        <div>{isActive ? '-' : '+'}</div>
      </div>
      {isActive && (
        <div className="border-b border-l border-r bg-white px-32 py-16 text-[2.2rem] duration-300">
          <div dangerouslySetInnerHTML={{ __html: content }} />
        </div>
      )}
    </div>
  )
}
