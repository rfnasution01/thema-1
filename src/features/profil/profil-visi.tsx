import { bgPrimary500 } from '@/libs/helpers/format-color'
import { ProfilType } from '@/libs/types/profil-type'

export function ProfilVisi({
  profil,
  color,
}: {
  profil: ProfilType
  color: string
}) {
  return (
    <div className="flex items-center justify-center">
      <div className="relative -top-80 w-4/6 phones:top-0 phones:flex phones:w-full">
        <div
          className={`flex w-full flex-col gap-48 rounded-2xl ${bgPrimary500(color)} hadow px-128 py-32 phones:p-32`}
        >
          <div className="flex w-full flex-col justify-center gap-12">
            <p className="text-center font-roboto text-[5rem] uppercase">
              {profil?.profil?.[0]?.jenis}
            </p>
            <blockquote className="text-center font-nunito text-[4rem]">
              {`"${profil?.profil?.[0]?.keterangan}"`}
            </blockquote>
            <blockquote className="text-center font-mono text-[2.4rem]">
              {`"${profil?.profil?.[0]?.sub_keterangan}"`}
            </blockquote>
          </div>
          <div className="flex w-full flex-col justify-center gap-12">
            <p className="text-center font-roboto text-[5rem] uppercase">
              {profil?.profil?.[1]?.jenis}
            </p>
            <ul className="ml-48 list-disc">
              {profil?.profil?.[1]?.list?.map((item, idx) => (
                <li key={idx} className="py-8">
                  {item?.keterangan ?? ''}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
