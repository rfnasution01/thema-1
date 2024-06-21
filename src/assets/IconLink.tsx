export function IconLink({
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
      viewBox="0 0 85 84"
      fill={fill1 ?? 'none'}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M21.3496 17.3723V12.25C21.3496 9.35051 23.7 7 26.5996 7H72.0996C74.9992 7 77.3496 9.35051 77.3496 12.25V57.75C77.3496 60.6496 74.9992 63 72.0996 63H66.8801"
        stroke={fill2 ?? 'black'}
        stroke-width="3.33333"
      />
      <path
        d="M61.5996 17.5H12.5996C9.70011 17.5 7.34961 19.8505 7.34961 22.75V71.75C7.34961 74.6495 9.70011 77 12.5996 77H61.5996C64.4991 77 66.8496 74.6495 66.8496 71.75V22.75C66.8496 19.8505 64.4991 17.5 61.5996 17.5Z"
        fill={fill3 ?? '#2F88FF'}
        stroke={fill2 ?? 'black'}
        stroke-width="3.33333"
        stroke-linejoin="round"
      />
      <path
        d="M32.6191 40.4426L41.881 30.801C44.4213 28.2605 48.5961 28.3165 51.2055 30.9259C53.815 33.5354 53.871 37.7101 51.3305 40.2504L47.9878 43.7903"
        stroke="white"
        stroke-width="3.33333"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M23.9151 50.3076C23.022 51.2006 21.1754 52.9839 21.1754 52.9839C18.635 55.5242 18.566 60.0521 21.1754 62.6616C23.7849 65.271 27.9595 65.3268 30.5 62.7865L39.5373 54.5818"
        stroke="white"
        stroke-width="3.33333"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M33.0099 49.5745C31.7978 48.3625 31.1367 46.8127 31.0308 45.2457C30.9086 43.4394 31.5245 41.6103 32.8849 40.25"
        stroke="white"
        stroke-width="3.33333"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M39.4121 45.2573C42.0215 47.8667 42.0775 52.0416 39.5371 54.5819"
        stroke="white"
        stroke-width="3.33333"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  )
}
