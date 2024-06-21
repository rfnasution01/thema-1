import { ReactNode } from 'react'

export function IconLabel({
  icon,
  label,
}: {
  icon: JSX.Element
  label: string | number | ReactNode
}) {
  return (
    <div className="flex items-center gap-4">
      <span>{icon}</span>
      <div className="text-nowrap">{label}</div>
    </div>
  )
}
