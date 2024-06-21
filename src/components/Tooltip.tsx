import { bgPrimary800 } from '@/libs/helpers/format-color'
import * as Tooltip from '@radix-ui/react-tooltip'
import { ReactNode } from 'react'

const Tooltips = ({
  triggerComponent,
  tooltipContent,
  position,
  color,
}: {
  triggerComponent: ReactNode
  tooltipContent: ReactNode
  position?: 'bottom' | 'top' | 'left' | 'right'
  color?: string
}) => {
  return (
    <Tooltip.Provider>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <div className="hover:cursor-pointer">{triggerComponent} </div>
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            className={`z-20 w-[15vw] rounded-xl p-8 shadow-2xl ${bgPrimary800(color)}`}
            sideOffset={5}
            side={position}
          >
            {tooltipContent}
            <Tooltip.Arrow />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  )
}

export default Tooltips
