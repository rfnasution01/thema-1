import { Breadcrumb } from '@/components/Breadcrumb'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getThemeSlice } from '@/store/reducer/stateTheme'
import { SingleSkeleton } from '@/components/skeleton-component'
import { useInView } from 'react-intersection-observer'
import { Search } from 'lucide-react'
import { convertSlugToText } from '@/libs/helpers/format-text'
import { usePathname } from '@/libs/hooks/usePathname'
import { debounce } from 'lodash'
import { bgPrimary700 } from '@/libs/helpers/format-color'
import { useGetTestimoniQuery } from '@/store/slices/testimoniAPI'
import { TestimoniType } from '@/libs/types/testimoni-type'
import { CardTypeE } from '@/components/cards-component'

export default function Direktori() {
  const stateColor = useSelector(getThemeSlice)?.color

  useEffect(() => {
    if (stateColor) {
      setColor(stateColor)
    }
  }, [stateColor])

  const colorParams = localStorage.getItem('themeColor')

  const baseColor = import.meta.env.VITE_BASE_THEME
  const [color, setColor] = useState<string>(
    colorParams ?? stateColor ?? baseColor,
  )

  // --- Testimoni ---
  const [testimoni, setTestimoni] = useState<TestimoniType[]>([])
  const {
    data: dataTestimoni,
    isFetching: isFetchingTestimoni,
    isLoading: isLoadingTestimoni,
  } = useGetTestimoniQuery({
    page_number: 1,
    page_size: 100,
  })

  const loadingTestimoni = isFetchingTestimoni || isLoadingTestimoni

  useEffect(() => {
    if (dataTestimoni?.data) {
      setTestimoni(dataTestimoni?.data)
    }
  }, [dataTestimoni?.data])

  const [isLoaded, setIsLoaded] = useState(false)
  const [search, setSearch] = useState<string>('')
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  console.log(search)

  useEffect(() => {
    if (inView) {
      // Simulate data fetching
      setTimeout(() => {
        setIsLoaded(true)
      }, 1000) // Adjust the delay as needed
    }
  }, [inView])

  const { firstPathname } = usePathname()

  const handleSearch = debounce((searchValue: string) => {
    setSearch(searchValue)
  }, 300)

  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    handleSearch(value)
  }

  const handleClick = () => {
    const inputElement = document.querySelector(
      'input[type="text"]',
    ) as HTMLInputElement
    handleSearch(inputElement.value)
  }

  return (
    <div className="mb-80 mt-32 flex flex-col gap-32">
      <Breadcrumb color={color} />

      {loadingTestimoni ? (
        <SingleSkeleton height="h-[40vh]" />
      ) : (
        <div ref={ref} className="flex flex-col gap-32 px-64 phones:px-32">
          {isLoaded ? (
            <div
              className={
                'flex flex-col gap-32 phones:border-transparent phones:shadow-none'
              }
            >
              {/* Titlte  */}
              <div className="flex items-center justify-between gap-32">
                <p className="font-roboto text-[5rem]">
                  {convertSlugToText(firstPathname)}
                </p>
                <div className="flex w-1/2 justify-end">
                  <input
                    type="text"
                    className="h-1/2 w-4/6 rounded-lg border border-gray-300 p-16 text-[2rem] focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 phones:w-full"
                    placeholder="Search"
                    onChange={(e) => onSearch(e)}
                  />
                  <button
                    className={`${bgPrimary700(color)} px-12`}
                    type="button"
                    style={{
                      borderTopRightRadius: '1rem',
                      borderBottomRightRadius: '1rem',
                    }}
                    onClick={() => handleClick()}
                  >
                    <Search size={20} />
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-12 gap-32">
                {testimoni?.map((item, idx) => (
                  <div
                    key={idx}
                    className="col-span-2 bg-red-300 phones:col-span-12"
                  >
                    <CardTypeE
                      isi={item?.isi}
                      nama={item?.nama}
                      photo={item?.photo}
                      id={item?.id}
                      kelompok="testimonial"
                      height="h-[40vh]"
                    />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <SingleSkeleton height="h-[30vh]" />
          )}
        </div>
      )}
    </div>
  )
}
