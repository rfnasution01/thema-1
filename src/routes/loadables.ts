import loadable from '@loadable/component'

// ------------------
// ----- Layouts -----
// ------------------
export const RootLayout = loadable(() => import('@/layout/root-layout'))
export const RouteLayout = loadable(() => import('@/layout/route-layout'))
export const DetailLayout = loadable(
  () => import('@/layout/child-layout/detail-layout'),
)
export const KategoriLayout = loadable(
  () => import('@/layout/child-layout/kategori-layout'),
)

// ------------------
// ----- Pages -----
// ------------------

export const ComingSoonPage = loadable(() => import('@/pages/coming-soon'))
export const HomePage = loadable(() => import('@/pages/home'))
export const HalamanPage = loadable(() => import('@/pages/page'))
export const TentangKamiPage = loadable(() => import('@/pages/about'))
export const ProgramPage = loadable(() => import('@/pages/program'))
export const ProgramDetailPage = loadable(
  () => import('@/pages/program-details'),
)
export const FaqPage = loadable(() => import('@/pages/faq'))
export const ProfilPage = loadable(() => import('@/pages/profil'))
export const TestimonialPage = loadable(() => import('@/pages/testimonial'))
export const TestimonialDetailPage = loadable(
  () => import('@/pages/testimonial/tertimonial-details'),
)
export const GaleriPage = loadable(() => import('@/pages/galeri'))
export const DirektoriPage = loadable(() => import('@/pages/directory'))
export const OrganizationPage = loadable(() => import('@/pages/organization'))
export const DownloadPage = loadable(() => import('@/pages/download'))
export const KontakPage = loadable(() => import('@/pages/kontak'))
export const AbsensiPage = loadable(() => import('@/pages/absensi'))
export const JadwalBelajarPage = loadable(
  () => import('@/pages/akademik/jadwal-belajar'),
)
export const TiketPage = loadable(() => import('@/pages/tiket'))
