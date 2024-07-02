export function IconSuccess({
  width,
  height,
  fill1,
  fill2,
}: {
  width?: string
  height?: string
  fill1?: string
  fill2?: string
}) {
  return (
    <svg
      width={width ?? '61'}
      height={height ?? '60'}
      viewBox={`0 0 ${width ?? '61'} ${height ?? '60'}`}
      fill={fill1 ?? 'none'}
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clip-path="url(#clip0_6128_530)">
        <path
          d="M30.5007 3.33325C25.2265 3.33325 20.0708 4.89722 15.6855 7.8274C11.3001 10.7576 7.88221 14.9223 5.86388 19.795C3.84554 24.6677 3.31745 30.0295 4.34639 35.2023C5.37533 40.3752 7.91508 45.1267 11.6445 48.8561C15.3739 52.5855 20.1254 55.1253 25.2983 56.1542C30.4711 57.1831 35.8329 56.655 40.7056 54.6367C45.5783 52.6184 49.743 49.2004 52.6732 44.8151C55.6034 40.4298 57.1673 35.2741 57.1673 29.9999C57.1673 22.9275 54.3578 16.1447 49.3568 11.1437C44.3559 6.14277 37.5731 3.33325 30.5007 3.33325ZM30.5007 53.3333C25.8858 53.3333 21.3745 51.9648 17.5374 49.4009C13.7002 46.837 10.7095 43.1928 8.94347 38.9292C7.17743 34.6656 6.71535 29.974 7.61567 25.4478C8.516 20.9216 10.7383 16.764 14.0015 13.5008C17.2647 10.2375 21.4223 8.01525 25.9486 7.11493C30.4748 6.21461 35.1663 6.67669 39.4299 8.44273C43.6936 10.2088 47.3377 13.1995 49.9016 17.0366C52.4655 20.8738 53.834 25.385 53.834 29.9999C53.834 36.1883 51.3757 42.1232 46.9998 46.4991C42.624 50.8749 36.689 53.3333 30.5007 53.3333Z"
          fill={fill2 ?? '#1B892D'}
        />
        <path
          d="M47.1669 20.1668C46.8546 19.8564 46.4322 19.6821 45.9919 19.6821C45.5516 19.6821 45.1292 19.8564 44.8169 20.1668L26.3169 38.5835L16.3169 28.5835C16.0119 28.2541 15.5886 28.0595 15.14 28.0423C14.6915 28.0251 14.2545 28.1868 13.9252 28.4918C13.5959 28.7968 13.4012 29.2201 13.3841 29.6686C13.3669 30.1172 13.5286 30.5541 13.8336 30.8835L26.3169 43.3335L47.1669 22.5335C47.3231 22.3785 47.4471 22.1942 47.5317 21.9911C47.6163 21.788 47.6599 21.5701 47.6599 21.3501C47.6599 21.1301 47.6163 20.9123 47.5317 20.7092C47.4471 20.5061 47.3231 20.3217 47.1669 20.1668Z"
          fill={fill2 ?? '#1B892D'}
        />
      </g>
      <defs>
        <clipPath id="clip0_6128_530">
          <rect
            width="60"
            height="60"
            fill="white"
            transform="translate(0.5)"
          />
        </clipPath>
      </defs>
    </svg>
  )
}