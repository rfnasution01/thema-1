import { FileWarning } from 'lucide-react'

export function NoData() {
  return (
    <div className="flex flex-col items-center gap-16 text-primary-700">
      <span>
        <FileWarning size={80} />
      </span>
      <p className="font-roboto text-[3rem]">No Data Available.</p>
      <p className="font-mono text-[2rem]">
        There is no data to show you right now
      </p>
    </div>
  )
}
