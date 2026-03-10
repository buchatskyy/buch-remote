import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import {Icon} from "leaflet"
import posIcon from "../../../media/logomap.svg"
import 'leaflet/dist/leaflet.css'

export default function Map() {
    const myIcon = new Icon({
  iconUrl: posIcon,
  iconSize: [80, 80],
  iconAnchor: [12, 41]
})
    const position = [46.180554, 12.279605]
    return (
        <MapContainer center={position} zoom={18} style={{ height: "100%", width: "100%" }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker icon={myIcon} position={position}>
                <Popup>
                    I am here
                </Popup>
            </Marker>
        </MapContainer>
    )
}