import dayjs from 'dayjs'

export function CardTypeC({
  judul,
  isi,
  tanggal,
}: {
  judul: string
  isi: string
  tanggal: string
}) {
  return (
    <div className="hidden phones:block">
      <div className="flex flex-col gap-32">
        <p className="text-[3rem] font-bold">{judul}</p>
        <p dangerouslySetInnerHTML={{ __html: isi }} className="line-clamp-4" />
        <p className="italic">
          {dayjs(tanggal).locale('id').format('MMMM D, YYYY HH:mm')}
        </p>
      </div>
    </div>
  )
}
