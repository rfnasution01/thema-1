import { ProfilType } from '@/libs/types/profil-type'

export function ProfilSasaran({
  profil,
  sekolah,
}: {
  profil: ProfilType
  sekolah: string
}) {
  return (
    <div className="flex gap-32 px-64 phones:flex-col-reverse">
      <div className="min-h-[40rem] w-1/3 phones:w-full">
        <img
          src={profil?.profil?.[3]?.gambar ?? '/img/identitas.png'}
          alt="tujuan"
          className="h-[40rem] w-full rounded-lg object-cover"
          loading="lazy"
        />
      </div>
      <div className="flex h-full w-2/3 flex-col gap-12 phones:w-full">
        <p className="border-b-2 border-border pb-8 font-roboto text-[5rem]">
          {profil?.profil?.[3]?.jenis} {sekolah}
        </p>
        <div className="flex flex-col gap-8">
          <p>{profil?.profil?.[3]?.keterangan}</p>
          <ol className="ml-48 list-decimal">
            {profil?.profil?.[3]?.list?.map((item, idx) => (
              <li key={idx} className="py-8">
                {item?.keterangan ?? '-'}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  )
}
