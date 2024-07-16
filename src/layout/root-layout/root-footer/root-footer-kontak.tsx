import { bgPrimary400 } from '@/libs/helpers/format-color'
import { Link } from 'react-router-dom'

export function RootFooterKontak({ color }: { color: string }) {
  return (
    <div className="flex w-1/3 flex-col gap-48 phones:w-full">
      <p className="font-bold">Kontak Kami</p>
      <p>
        Sampaikan kritik, saran, komentar, aduan yang anda miliki ke kontak kami
        agar kami dapat memberikan layanan terbaik kepada anda
      </p>
      <div className="flex">
        <Link to="kontak" className={`${bgPrimary400(color)} rounded-2xl p-12`}>
          Kontak
        </Link>
      </div>
    </div>
  )
}
