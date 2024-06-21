import Loading from '@/components/Loading'
import { SingleSkeleton } from '@/components/skeleton-component'
import {
  ProfilBg,
  ProfilHasil,
  ProfilSasaran,
  ProfilTujuan,
  ProfilVisi,
} from '@/features/profil'
import { IdentitasType } from '@/libs/types/beranda-type'
import { ProfilType } from '@/libs/types/profil-type'
import { getThemeSlice } from '@/store/reducer/stateTheme'
import { useGetIdentitasQuery } from '@/store/slices/berandaAPI'
import { useGetProfilQuery } from '@/store/slices/profilAPI'
import { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { useSelector } from 'react-redux'

export default function ProfilPage() {
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

  //   --- Profil ---
  const [profil, setProfil] = useState<ProfilType>()
  const { data, isFetching, isLoading } = useGetProfilQuery()

  const loadingProfil = isFetching || isLoading

  useEffect(() => {
    if (data?.data) {
      setProfil(data?.data)
    }
  }, [data?.data])

  // --- Identitas ---
  const [identitas, setIdentitas] = useState<IdentitasType>()
  const { data: identitasData } = useGetIdentitasQuery()

  useEffect(() => {
    if (identitasData?.data) {
      setIdentitas(identitasData?.data)
    }
  }, [identitasData?.data])

  const [isLoaded, setIsLoaded] = useState(false)
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  useEffect(() => {
    if (inView) {
      // Simulate data fetching
      setTimeout(() => {
        setIsLoaded(true)
      }, 1000) // Adjust the delay as needed
    }
  }, [inView])

  return (
    <div className="mb-32 flex flex-col gap-32">
      {/* --- Banner --- */}
      {loadingProfil ? (
        <Loading />
      ) : (
        <div className="flex flex-col gap-32">
          <div ref={ref} className="flex h-[85vh] w-full flex-col gap-32">
            {isLoaded ? (
              <ProfilBg
                profil={profil}
                height="h-[85vh]"
                gambar="/img/identitas.png"
              />
            ) : (
              <SingleSkeleton height="h-[85vh]" />
            )}
          </div>
          {profil?.profil?.length > 0 && (
            <>
              <ProfilVisi profil={profil} color={color} />
              <ProfilTujuan profil={profil} sekolah={identitas?.nama_website} />
              <ProfilSasaran
                profil={profil}
                sekolah={identitas?.nama_website}
              />
              <ProfilHasil
                profil={profil}
                sekolah={identitas?.nama_website}
                color={color}
              />
            </>
          )}
        </div>
      )}
    </div>
  )
}
