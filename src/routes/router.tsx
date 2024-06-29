import { createBrowserRouter } from 'react-router-dom'
import {
  ComingSoonPage,
  DetailLayout,
  DirektoriPage,
  DownloadPage,
  FaqPage,
  GaleriPage,
  HalamanPage,
  HomePage,
  KategoriLayout,
  OrganizationPage,
  ProfilPage,
  ProgramDetailPage,
  ProgramPage,
  RootLayout,
  RouteLayout,
  TentangKamiPage,
  TestimonialDetailPage,
  TestimonialPage,
} from './loadables'
import Kontak from '@/pages/kontak'

const categories = ['berita', 'pengumuman', 'agenda', 'prestasi', 'mading']

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        path: '',
        element: <HomePage />,
      },

      {
        path: 'halaman/page/:id',
        element: <HalamanPage />,
      },
      {
        path: 'tentang-kami',
        element: <TentangKamiPage />,
      },
      {
        path: 'program',
        element: <ProgramPage />,
      },
      {
        path: 'direktori',
        element: <DirektoriPage />,
      },
      {
        path: 'program-details/page/:id',
        element: <ProgramDetailPage />,
      },
      {
        path: 'faq',
        element: <FaqPage />,
      },
      {
        path: 'download',
        element: <DownloadPage />,
      },
      {
        path: 'profil',
        element: <ProfilPage />,
      },
      {
        path: 'organisasi',
        element: <OrganizationPage />,
      },
      {
        path: 'galeri-detail/page/:id',
        element: <GaleriPage />,
      },

      {
        path: 'testimonial',
        element: <TestimonialPage />,
      },
      {
        path: 'testimonial/page/:id',
        element: <TestimonialDetailPage />,
      },
      {
        path: 'kontak',
        element: <Kontak />,
      },

      ...categories.flatMap((category) => [
        { path: category, element: <RouteLayout /> },
        { path: `${category}/:kategori`, element: <KategoriLayout /> },
        { path: `${category}/page/:id`, element: <DetailLayout /> },
      ]),
    ],
  },

  {
    path: '*',
    element: <ComingSoonPage />,
  },
])
