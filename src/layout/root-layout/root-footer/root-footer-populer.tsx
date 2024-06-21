import { CardsTypeA } from '@/components/cards-component'
import { BeritaPopuler } from '@/libs/types/beranda-type'
import { useGetBeritaPopulerQuery } from '@/store/slices/berandaAPI'
import { useEffect, useState } from 'react'

export function RootFooterPopuler() {
  // --- Populer ---
  const [populer, setPopuler] = useState<BeritaPopuler[]>([])
  const { data: dataPopuler } = useGetBeritaPopulerQuery({ jumlah: 2 })

  useEffect(() => {
    if (dataPopuler?.data) {
      setPopuler(dataPopuler?.data)
    }
  }, [dataPopuler?.data])

  return (
    <div className="flex w-1/3 flex-col gap-48 phones:w-full">
      <p className="font-bold">Populer</p>
      <div className="flex flex-col gap-32">
        {populer?.length > 0 && <CardsTypeA populer={populer} />}
      </div>
    </div>
  )
}
