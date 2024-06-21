import { textPrimary100 } from '@/libs/helpers/format-color'
import { ReactNode, useState } from 'react'

export const RunningText = ({
  children,
  color,
  className,
}: {
  children: ReactNode
  color: string
  className?: string
}) => {
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
  }

  return (
    <div className={`relative flex overflow-hidden ${className}`}>
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          animationPlayState: isHovered ? 'paused' : 'running',
          animationDuration: '100s',
        }}
        className={`animate-marquee whitespace-nowrap text-nowrap text-[2rem] font-bold  uppercase tracking-1.5 ${textPrimary100(color)} hover:cursor-pointer phones:text-[2.4rem]`}
      >
        {children}
      </div>
    </div>
  )
}
