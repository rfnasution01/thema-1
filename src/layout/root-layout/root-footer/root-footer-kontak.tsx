import { bgPrimary400 } from '@/libs/helpers/format-color'

export function RootFooterKontak({ color }: { color: string }) {
  return (
    <div className="flex w-1/3 flex-col gap-48 phones:w-full">
      <p className="font-bold">Kontak Kami</p>
      <p>
        Sampaikan kritik, saran, komentar, aduan yang anda miliki ke kontak kami
        agar kami dapat memberikan layanan terbaik kepada anda
      </p>
      <div className="flex">
        <button
          type="button"
          className={`${bgPrimary400(color)} rounded-2xl p-12`}
        >
          Kontak
        </button>
      </div>
    </div>
  )
}
