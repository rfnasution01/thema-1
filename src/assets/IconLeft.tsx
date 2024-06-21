export function IconLeft({
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
      <rect
        x="40"
        y="40"
        width="40"
        height="40"
        rx="20"
        transform="rotate(-180 40 40)"
        fill={fill2 ?? '#4963A4'}
      />
      <path
        d="M20 3.33333C10.795 3.33333 3.33335 10.795 3.33335 20C3.33335 29.205 10.795 36.6667 20 36.6667C29.205 36.6667 36.6667 29.205 36.6667 20C36.6667 10.795 29.205 3.33333 20 3.33333Z"
        stroke={fill3 ?? 'white'}
        stroke-width="3.33333"
        stroke-linejoin="round"
      />
      <path
        d="M22.5 12.5L15 20L22.5 27.5"
        stroke={fill3 ?? 'white'}
        stroke-width="3.33333"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  )
}
