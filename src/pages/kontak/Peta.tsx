import { IdentitasType } from '@/libs/types/beranda-type'
import { MapContainer, Marker, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import icon from 'leaflet/dist/images/marker-icon.png'
import iconShadow from 'leaflet/dist/images/marker-shadow.png'

const DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
})

L.Marker.prototype.options.icon = DefaultIcon

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
