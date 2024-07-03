import { Trash } from 'lucide-react'
import { Dispatch, SetStateAction } from 'react'

export function ChatLampiran({
  dir,
  setDir,
}: {
  dir: string[]

  setDir: Dispatch<SetStateAction<string[]>>
}) {
  const handleRemoveItem = (indexToRemove) => {
    setDir((prevMultiImg) => {
      return prevMultiImg.filter((_, index) => index !== indexToRemove)
    })
  }

  return (
    <div className="flex w-full flex-wrap items-start gap-32 whitespace-nowrap phones:w-full">
      {dir &&
        dir.length > 0 &&
        dir?.map((name, idx) => (
          <div
            className="relative flex w-1/5 flex-col items-center gap-4 phones:w-1/3"
            key={idx}
          >
            <div className="relative w-full">
              <img
                src={name}
                alt="Gambar"
                className="h-[20rem] w-full rounded-2xl object-cover filter"
                loading="lazy"
              />
              <span className="absolute right-2 top-2 rounded-lg bg-danger-700 p-4 text-white hover:cursor-pointer hover:bg-danger">
                <Trash
                  size={15}
                  onClick={(e) => {
                    e.stopPropagation()
                    handleRemoveItem(idx)
                  }}
                />
              </span>
            </div>
          </div>
        ))}
    </div>
  )
}
