export function SingleSkeleton({
  width = 'w-full',
  height = 'h-[5.5rem]',
  classname,
}: {
  width?: string
  height?: string
  classname?: string
}) {
  return (
    <div
      className={`${height} ${width} ${classname} animate-pulse rounded-md bg-slate-200 font-roboto text-[3rem] duration-100`}
    />
  )
}
