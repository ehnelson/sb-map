import { MapContainer, TileLayer} from 'react-leaflet';
import Field from './Field'
function MapWidget() {
    return (
        <MapContainer id="mapid" center={[39.828, -98.579]} zoom={5}>
            <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Field />
        </MapContainer>
    )
}

export default MapWidget
