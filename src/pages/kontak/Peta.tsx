import { IdentitasType } from '@/libs/types/beranda-type'
import { MapContainer, Marker, TileLayer } from 'react-leaflet'

export function Peta({ identitas }: { identitas: IdentitasType }) {
  return (
    <MapContainer
      center={[Number(identitas?.latitude), Number(identitas?.longitude)]}
      zoom={13}
      style={{ height: '50vh', width: '100%', zIndex: 0 }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker
        position={[Number(identitas?.latitude), Number(identitas?.longitude)]}
      ></Marker>
    </MapContainer>
  )
}
