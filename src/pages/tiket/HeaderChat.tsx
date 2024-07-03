import { getInitials } from '@/libs/helpers/format-text'
import { DataTiketType } from '@/libs/types/kontak-type'
import dayjs from 'dayjs'
import { Link } from 'react-router-dom'

export function HeaderChat({ data }: { data: DataTiketType }) {
  const nama = `${data?.ticket?.nama_depan} ${data?.ticket?.nama_belakang}`
  return (
    <div className="flex gap-32">
      <div className="flex h-[7rem] w-[7rem] items-center justify-center rounded-full bg-blue-300 p-16">
        {getInitials(nama)}
      </div>
      <div className="flex flex-1 flex-col gap-32">
        <div className="flex flex-col gap-12">
          <p className="text-[2.6rem] uppercase">
            {data?.ticket?.nama_depan} {data?.ticket?.nama_belakang}
          </p>
          <p>
            {dayjs(data?.ticket?.tanggal)
              .locale('id')
              .format('DD MMMM YYYY HH:mm')}
          </p>
        </div>
        <p>Kode: {data?.ticket?.kode_tiket}</p>
        <p style={{ lineHeight: '130%' }}>{data?.ticket?.pesan}</p>
        {data?.ticket?.lampiran?.length > 0 && (
          <div className="flex flex-col gap-12">
            <p>{data?.ticket?.lampiran?.length} Attachments</p>
            <div className="flex flex-wrap gap-32">
              {data?.ticket?.lampiran?.map((item, idx) => (
                <Link to={item?.dokumen} key={idx} target="_blank">
                  <img
                    src={item?.dokumen}
                    alt={item?.id}
                    className="h-[10rem] w-[20rem] rounded-2xl object-cover filter"
                    loading="lazy"
                  />
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
