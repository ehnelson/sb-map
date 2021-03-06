import { MapContainer, TileLayer, useMap, useMapEvent} from 'react-leaflet';
import Field from './Field'
import fieldData from '../fields.json' 
import BoundingProperties from '../BoundingProperties'
import { Component } from 'react';

function ChangeView({ center, zoom }) {
    const map = useMap();
    if(center === undefined || center === null || map.getCenter().equals(center)){
        return null
    }else{
        center = {lat: center[0], lng: center[1]}
    }
    map.setView(center, zoom);
    return null;
}

class MapWidget extends Component{
    constructor(props){
        super(props)
        this.state = {
            boundingProperties: new BoundingProperties()
        }
    }

    render(){
        var cb = this.props.debugCallback
        function ClickHandler(){
            useMapEvent('click', (e) => {
                cb([e.latlng.lat, e.latlng.lng])
            })
            return ( <div />)
        }
        return (
            <MapContainer id="mapid" center={this.props.center} zoom={5}>
                <ChangeView center={this.props.center} zoom={20} />
                <ClickHandler />
                <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {fieldData.map((field) =>
                    <Field
                        id={field.team} 
                        key={field.team}
                        data={field}
                        bounds={this.state.boundingProperties}/>
                )}
                {/* <Polygon pathOptions={{opacity:'0.2', fillOpacity:'0.1'}} positions={this.state.boundingProperties.mapData} /> */}
            </MapContainer>
        )
    }
}

export default MapWidget