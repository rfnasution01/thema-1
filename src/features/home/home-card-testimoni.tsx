import { TestimoniType } from '@/libs/types/testimoni-type'

export function HomeCardTestimoni({ props }: { props: TestimoniType }) {
  return (
    <div className="flex flex-col items-center gap-32 phones:bg-white">
      <div
        className="flex flex-col items-center justify-center gap-16 border px-32 py-64 text-center shadow-md"
        style={{ borderRadius: '3rem' }}
      >
        <img
          loading="lazy"
          className="h-[20rem] w-[20rem] rounded-full object-cover"
          src={props.photo}
          alt={props?.nama}
        />
        <p className="text-center font-nunito text-[3rem]">
          <span className="">{props.nama}</span>
        </p>

        <p
          className="line-clamp-4 text-justify font-sf-pro tracking-1.25"
          style={{ lineHeight: '130%' }}
        >
          {props.keterangan_singkat}
        </p>
      </div>
    </div>
  )
}
