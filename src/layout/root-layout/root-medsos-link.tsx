import {
  IconFacebook,
  IconInstagram,
  IconTwitter,
  IconWhatsapp,
} from '@/assets'
import { MenubarColor } from '@/components/menubar-component'
import { SingleSkeleton } from '@/components/skeleton-component'
import { IdentitasType } from '@/libs/types/beranda-type'
import { Link } from 'react-router-dom'

export function RootMedsosLink({
  color,
  loadingIdentitas,
  identitas,
}: {
  color: string
  loadingIdentitas: boolean
  identitas: IdentitasType
}) {
  return (
    <div
      className={`fixed bottom-1/4 right-32 z-30 flex flex-col items-center justify-center gap-32 phones:right-8  phones:hidden `}
    >
      <div className="flex flex-col items-center justify-center gap-32 ">
        <MenubarColor color={color} />
        {loadingIdentitas ? (
          <SingleSkeleton />
        ) : (
          <Link
            to={`https://www.facebook.com/${identitas?.fb}`}
            target="_blank"
            className="opacity-20 hover:cursor-pointer hover:opacity-90"
          >
            <IconFacebook size={40} />
          </Link>
        )}
        {loadingIdentitas ? (
          <SingleSkeleton />
        ) : (
          <Link
            to={`https://www.twitter.com/${identitas?.tw}`}
            target="_blank"
            className="opacity-20 hover:cursor-pointer hover:opacity-90"
          >
            <IconTwitter size={40} />
          </Link>
        )}
        {loadingIdentitas ? (
          <SingleSkeleton />
        ) : (
          <Link
            to={`https://www.instagram.com/${identitas?.ig}`}
            target="_blank"
            className="opacity-20 hover:cursor-pointer hover:opacity-90"
          >
            <IconInstagram size={40} />
          </Link>
        )}
        {loadingIdentitas ? (
          <SingleSkeleton />
        ) : (
          <Link
            to={`https://api.whatsapp.com/send?phone=${identitas?.wa}`}
            target="_blank"
            className="opacity-20 hover:cursor-pointer hover:opacity-90"
          >
            <IconWhatsapp size={40} />
          </Link>
        )}
      </div>
    </div>
  )
}
