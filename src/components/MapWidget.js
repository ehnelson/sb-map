import { MapContainer, TileLayer, Polygon} from 'react-leaflet';
import Field from './Field'
import fieldData from '../fields.json' 
import BoundingProperties from '../BoundingProperties'

function MapWidget() {
    const boundingProperties = new BoundingProperties()
    return (
        <MapContainer id="mapid" center={[39.828, -98.579]} zoom={5}>
            <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {fieldData.map((field) =>
                <Field 
                    id={field.name} 
                    key={field.name}
                    data={field}
                    bounds={boundingProperties}/>
            )}
            <Polygon pathOptions={{opacity:'0.2', fillOpacity:'0.1'}} positions={boundingProperties.mapData} />
        </MapContainer>
    )
}

export default MapWidget
