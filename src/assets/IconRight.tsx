export function IconRight({
  size = 40,
  fill1,
  fill2,
  fill3,
}: {
  size?: number
  fill1?: string
  fill2?: string
  fill3?: string
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill={fill1 ?? 'none'}
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="40" height="40" rx="20" fill={fill2 ?? '#4963A4'} />
      <path
        d="M20 36.6667C29.205 36.6667 36.6667 29.205 36.6667 20C36.6667 10.795 29.205 3.33333 20 3.33333C10.795 3.33333 3.33334 10.795 3.33334 20C3.33334 29.205 10.795 36.6667 20 36.6667Z"
        stroke={fill3 ?? 'white'}
        stroke-width="3.33333"
        stroke-linejoin="round"
      />
      <path
        d="M17.5 27.5L25 20L17.5 12.5"
        stroke={fill3 ?? 'white'}
        stroke-width="3.33333"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  )
}
