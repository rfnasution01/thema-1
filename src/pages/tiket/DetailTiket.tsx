import { NoData } from '@/components/NoData'
import { getInitials } from '@/libs/helpers/format-text'
import { DataTiketType } from '@/libs/types/kontak-type'
import dayjs from 'dayjs'
import { UseFormReturn } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { FormFindTiket } from './FormFindTiket'

export function DetailTiket({
  form,
  data,
  handleSubmitFindTiket,
}: {
  form: UseFormReturn
  data: DataTiketType
  handleSubmitFindTiket: () => Promise<void>
}) {
  const nama = `${data?.ticket?.nama_depan} ${data?.ticket?.nama_belakang}`

  return (
    <div className="flex flex-col gap-64">
      <FormFindTiket
        form={form}
        handleSubmitFindTiket={handleSubmitFindTiket}
      />
      {/* --- Detail --- */}
      {data ? (
        <div className="flex gap-32">
          <div className="flex h-[7rem] w-[7rem] items-center justify-center rounded-full bg-primary text-white">
            {getInitials(nama)}
          </div>
          <div className="flex flex-1 flex-col gap-32">
            <div className="flex h-full gap-32">
              <div className="flex flex-1 flex-col gap-8">
                <p className="font-roboto text-[2.8rem]">{nama}</p>
                <p>
                  {dayjs(data?.ticket?.tanggal)
                    .locale('id')
                    .format('DD MMMM YYYY HH:mm')}
                </p>
              </div>

              {data?.ticket?.status === 0 ? (
                <div className="">
                  <p className="rounded-full bg-yellow-700 px-24 py-12 text-[1.8rem] text-yellow-100">
                    Menugggu
                  </p>
                </div>
              ) : data?.ticket?.status === 1 ? (
                <div className="">
                  <p className="rounded-full bg-green-700 px-24 py-12 text-[1.8rem] text-green-100">
                    Diproses
                  </p>
                </div>
              ) : (
                <div className="">
                  <p className="rounded-full bg-rose-700 px-24 py-12 text-[1.8rem] text-rose-100">
                    Ditutup
                  </p>
                </div>
              )}
            </div>
            <p>
              Kode:{' '}
              <span className="font-bold">{data?.ticket?.kode_tiket}</span>
            </p>
            <p>{data?.ticket?.pesan}</p>
            {data?.ticket?.lampiran?.length > 0 && (
              <div className="flex flex-col gap-24">
                <p className="border-b pb-8">
                  {data?.ticket?.lampiran?.length} Attachment
                </p>
                <div className="flex flex-wrap gap-32">
                  {data?.ticket?.lampiran?.map((item, idx) => (
                    <Link to={item?.dokumen} target="_blank" key={idx}>
                      <img
                        alt={item?.id}
                        src={item?.dokumen}
                        className="h-[9rem] w-[13rem] rounded-2xl object-cover filter hover:scale-105"
                        loading="lazy"
                      />
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <NoData />
      )}
    </div>
  )
}
