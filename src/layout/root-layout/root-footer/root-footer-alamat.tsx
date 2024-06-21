import { IconFacebook, IconGoogle, IconInstagram, IconYoutube } from '@/assets'
import { IdentitasType } from '@/libs/types/beranda-type'
import { Link } from 'react-router-dom'

export function RootFooterAlamat({ identitas }: { identitas: IdentitasType }) {
  return (
    <div className="flex w-1/3 flex-col gap-48 phones:w-full">
      <p className="font-bold">Alamat</p>

      <div className="flex flex-col gap-32">
        <div className="flex flex-col gap-8">
          <p className="font-bold">{identitas?.alamat ?? '-'}</p>
          <p>{identitas?.kota ?? '-'}</p>
        </div>

        <div className="flex flex-col gap-8">
          <p>
            <span className="underline">Phone</span>:{' '}
            {identitas?.telepon ?? '-'}
          </p>
          <p>
            <span className="underline">Fax</span>: -
          </p>
          <p>
            <span className="underline">Email</span>: {identitas?.email ?? '-'}
          </p>
        </div>

        <div className="flex items-center gap-16">
          <Link
            target="_blank"
            className="duration-300 hover:-translate-y-12"
            to={`https://www.facebook.com/${identitas?.fb}`}
          >
            <IconFacebook size={26} />
          </Link>
          <Link
            target="_blank"
            to={`mailto:${identitas?.email}`}
            className="duration-300 hover:-translate-y-12"
          >
            <IconGoogle size={26} />
          </Link>
          <Link
            target="_blank"
            to={`https://www.youtube.com/${identitas?.yt}`}
            className="duration-300 hover:-translate-y-12"
          >
            <IconYoutube size={26} />
          </Link>
          <Link
            className="duration-300 hover:-translate-y-12"
            target="_blank"
            to={`https://www.instagram.com/${identitas?.ig}`}
          >
            <IconInstagram size={26} />
          </Link>
        </div>
      </div>
    </div>
  )
}
