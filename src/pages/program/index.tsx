import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { ProgramDetailType } from '@/libs/types/beranda-type'
import { useGetProgramQuery } from '@/store/slices/berandaAPI'
import Loading from '@/components/Loading'
import { Breadcrumb } from '@/components/Breadcrumb'
import { getThemeSlice } from '@/store/reducer/stateTheme'
import { CardTypeB } from '@/components/cards-component'

export default function Program() {
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

      {loadingProgram ? (
        <Loading />
      ) : (
        <div className="px-64 phones:p-32">
          <div
            className={
              'flex flex-col gap-32 rounded-2xl border p-64 shadow-lg phones:border phones:p-0 phones:shadow-none'
            }
          >
            <p className="font-roboto text-[5rem]">Program</p>
            <CardTypeB program={program} color={color} />
          </div>
        </div>
      )}
    </div>
  )
}
