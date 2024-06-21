import { bgPrimary700 } from '@/libs/helpers/format-color'
import { ChevronUp } from 'lucide-react'

export function RootScrollToUp({ color }: { color: string }) {
  return (
    <div
      className={`fixed bottom-32 right-32 z-30 flex flex-col items-center justify-center gap-32 phones:bottom-8 phones:right-8 `}
    >
      <a
        href="#header"
        className={`px-24 py-12 ${bgPrimary700(color)} flex items-center gap-12 rounded-lg bg-opacity-50 hover:bg-opacity-90`}
      >
        <ChevronUp size={16} />
        Scroll Ke Atas
      </a>
    </div>
  )
}
