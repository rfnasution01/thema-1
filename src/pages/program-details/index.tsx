import { Breadcrumb } from '@/components/Breadcrumb'
import Loading from '@/components/Loading'
import { HalamanDetail } from '@/features/page'
import { ProgramDetailTab } from '@/features/program-detail'
import { ProgramDetailType } from '@/libs/types/beranda-type'
import { getHalamanSlice } from '@/store/reducer/stateIdHalaman'
import { getThemeSlice } from '@/store/reducer/stateTheme'
import {
  useGetProgramDetailQuery,
  useGetProgramQuery,
} from '@/store/slices/berandaAPI'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

export default function ProgramDetailsPage() {
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

  // --- Program Detail Page ---
  const [programDetail, setProgramDetail] = useState<ProgramDetailType>()
  const {
    data: programDetailData,
    isLoading: programDetailIsLoading,
    isFetching: programDetailIsFetching,
  } = useGetProgramDetailQuery({
    id: id,
  })

  const loadingProgramDetail = programDetailIsLoading || programDetailIsFetching

  useEffect(() => {
    if (programDetailData?.data) {
      setProgramDetail(programDetailData?.data)
    }
  }, [programDetailData?.data, id])

  // --- Program Page ---
  const [program, setProgram] = useState<ProgramDetailType[]>()
  const {
    data: programData,
    isLoading: programIsLoading,
    isFetching: programIsFethcing,
  } = useGetProgramQuery()

  const loadingProgram = programIsLoading || programIsFethcing

  useEffect(() => {
    if (programData?.data) {
      setProgram(programData?.data)
    }
  }, [programData?.data])

  return (
    <div className="mb-80 mt-32 flex flex-col gap-32">
      <Breadcrumb color={color} />

      <div className="scrollbar h-[75vh] w-full overflow-y-auto px-64 phones:p-32">
        {loadingProgram || loadingProgramDetail ? (
          <Loading />
        ) : (
          <div className="flex h-full phones:h-auto phones:flex-none phones:flex-col phones:gap-32">
            <ProgramDetailTab
              menu={program}
              firstPathname="Program"
              setTab={setId}
              tab={id}
              color={color}
            />
            <div className="scrollbar h-full flex-1 overflow-y-auto phones:flex-none">
              <HalamanDetail
                judul={programDetail?.judul}
                photo={programDetail?.photo}
                isi={programDetail?.isi_lengkap}
                isDetail
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
