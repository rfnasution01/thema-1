import { Breadcrumb } from '@/components/Breadcrumb'
import Loading from '@/components/Loading'
import { HalamanDetail } from '@/features/page'
import { bgHoverPrimary100 } from '@/libs/helpers/format-color'
import { convertToSlug } from '@/libs/helpers/format-text'
import { TestimoniType } from '@/libs/types/testimoni-type'
import {
  getHalamanSlice,
  setStateHalaman,
} from '@/store/reducer/stateIdHalaman'
import { getThemeSlice } from '@/store/reducer/stateTheme'
import {
  useGetTestimoniIdQuery,
  useGetTestimoniQuery,
} from '@/store/slices/testimoniAPI'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

export default function TestimonialDetail() {
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

  const stateId = useSelector(getHalamanSlice)?.id

  useEffect(() => {
    if (stateId) {
      setId(stateId)
    }
  }, [stateId])

  const idParams = localStorage.getItem('beritaID')

  const [id, setId] = useState<string>(idParams ?? stateId ?? '')

  // --- Testimonial Page ---
  const [testimonialDetail, setTestimonialDetail] = useState<TestimoniType>()
  const {
    data: testimonialDetailData,
    isLoading,
    isFetching,
  } = useGetTestimoniIdQuery({
    id: id,
  })

  const loadingTestimonialDetail = isLoading || isFetching

  useEffect(() => {
    if (testimonialDetailData?.data) {
      setTestimonialDetail(testimonialDetailData?.data)
    }
  }, [testimonialDetailData?.data, id])

  const dispatch = useDispatch()

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

  return (
    <div className="mb-80 mt-32 flex flex-col gap-32">
      <Breadcrumb color={color} />
      {loadingTestimonialDetail ? (
        <Loading />
      ) : (
        <div className="flex flex-col gap-32">
          <HalamanDetail
            judul={testimonialDetail?.nama}
            photo={testimonialDetail?.photo}
            isi={testimonialDetail?.isi}
          />
          {loadingTestimoni ? (
            <Loading />
          ) : (
            <div className="w-full px-[30rem] phones:p-32">
              <div
                className={'flex h-full w-full flex-col gap-32 p-32 phones:p-0'}
              >
                <p className="text-[3rem] font-bold">Testimoni Lainnya</p>
                <div className="grid h-full w-full grid-cols-6 gap-32 phones:flex phones:w-full phones:overflow-x-auto phones:pb-32">
                  {testimoni?.slice(0, 2)?.map((item, idx) => (
                    <Link
                      to={`/testimonial/page/${convertToSlug(item?.nama)}`}
                      key={idx}
                      className={`col-span-2 phones:col-span-6 phones:w-3/5 phones:flex-shrink-0`}
                      onClick={() => {
                        localStorage.setItem('beritaID', item?.id)
                        dispatch(
                          setStateHalaman({
                            page: item?.nama,
                            id: item?.id,
                          }),
                        )
                      }}
                    >
                      <div
                        className={`${bgHoverPrimary100(color)} flex flex-col items-center justify-center gap-32 rounded-2xl border bg-white p-24 shadow-md phones:py-64`}
                      >
                        <div className="flex items-center justify-center">
                          <img
                            src={item?.photo}
                            alt={item?.nama}
                            className="h-[15rem] w-[15rem] rounded-full object-cover filter"
                            loading="lazy"
                          />
                        </div>
                        <div className="flex flex-col items-center gap-12 text-center">
                          <p className="text-[2.8rem] font-bold">
                            {item?.nama}
                          </p>
                          <p className="line-clamp-3">
                            {item?.keterangan_singkat}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
                  <Link
                    to={`/testimonial`}
                    className={`${bgHoverPrimary100(color)} col-span-2 flex items-center justify-center border bg-white text-[2.8rem] shadow-md phones:col-span-4 phones:w-3/5 phones:flex-shrink-0`}
                  >
                    Read More
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
