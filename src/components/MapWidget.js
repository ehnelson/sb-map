import { MapContainer, TileLayer} from 'react-leaflet';
import Field from './Field'
import fieldData from '../fields.json' 
function MapWidget() {
    console.log(fieldData)
    return (
        <MapContainer id="mapid" center={[39.828, -98.579]} zoom={5}>
            <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {fieldData.map((field) =>
                <Field id={field.name} data={field}/>
            )}
        </MapContainer>
    )
}

export default MapWidget
