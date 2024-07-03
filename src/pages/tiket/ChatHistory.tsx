import { Link } from 'react-router-dom'
import TimeSinceUploaded from '@/libs/helpers/format-time'
import clsx from 'clsx'
import { ChatType } from '@/libs/types/kontak-type'
import { CheckCheck } from 'lucide-react'

export function ChatHistory({
  chat,
  nama,
}: {
  chat: ChatType[]
  nama: string
}) {
  // --- Notifikasi ---

  // const notReadNewsId = chat?.find(
  //   (item) => item?.baca === '0' && item?.jenis_chat !== 'ADMIN',
  // )?.id

  return (
    <div className="flex flex-1 flex-col gap-32">
      {chat?.map((item, idx) => (
        <div className={`flex w-full flex-col gap-24`} key={idx}>
          {/* {item?.jenis_chat !== 'ADMIN' &&
            chat?.belum_baca > 0 &&
            notReadNewsId === item?.id && (
              <div className="flex w-full justify-center">
                <p className="rounded-full border bg-white px-24 py-12">
                  {chat?.belum_baca} Pesan Belum dibaca
                </p>
              </div>
            )} */}
          <div
            className={`flex w-full gap-32 ${item?.jenis_chat === 'UMUM' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`flex w-3/5 gap-32 ${item?.jenis_chat === 'UMUM' ? 'flex-row-reverse' : 'flex-row'}`}
            >
              <div
                className={clsx(
                  'flex flex-1 flex-col gap-8 rounded-2xl border p-24',
                  {
                    'border-[#73C2FF] bg-[#f5faff]':
                      item?.jenis_chat !== 'UMUM',
                    'border-green-300 bg-green-100':
                      item?.jenis_chat !== 'ADMIN',
                  },
                )}
              >
                <p className="text-rose-700">
                  {item?.jenis_chat !== 'UMUM' ? item?.user : nama}
                </p>
                <p className="font-sf-pro">{item?.isi}</p>
                {item.lampiran?.length > 0 && (
                  <div className="flex flex-wrap gap-32">
                    {item?.lampiran?.map((list, index) => (
                      <Link
                        to={list?.dokumen}
                        className=""
                        target="_blank"
                        key={index}
                      >
                        <img
                          src={list?.dokumen}
                          alt={list?.id}
                          className="h-[6rem] w-[10rem] rounded-2xl object-cover filter"
                          loading="lazy"
                        />
                      </Link>
                    ))}
                  </div>
                )}
                <div className="items-canter flex justify-end gap-16 text-[2rem] italic">
                  <TimeSinceUploaded uploadTime={item?.tanggal} />
                  {item?.baca === '0' && item?.jenis_chat !== 'SISWA' ? (
                    <span className="text-slate-500">
                      <CheckCheck size={16} />
                    </span>
                  ) : item?.baca === '1' && item?.jenis_chat !== 'SISWA' ? (
                    <span className="text-primary">
                      <CheckCheck size={16} />
                    </span>
                  ) : (
                    ''
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
