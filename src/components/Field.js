import * as geolib from 'geolib';
import GeodesicLine from './GeodesicLine'
import {Polygon, Tooltip} from 'react-leaflet'

// Geodesic line (ELI5 version) imagine each field is right on the equator, and the line attempts to follow that, bisecting the planet.
// I think this makes the 'straightest' line, ie the shortest distance between two points.
// However, the curvature doesn't seem to match 
function getGeodesicLine(coords){
    var line = [coords[0], coords[1]]
    var a = {latitude: coords[0][0], longitude: coords[0][1]}
    var b = {latitude: coords[1][0], longitude: coords[1][1]}

    var bearing = geolib.getRhumbLineBearing(a, b) - 90
    //bearing = geolib.getGreatCircleBearing(a, b)
    var dest = geolib.computeDestinationPoint(b, 4000000, bearing)
    line[2] = [dest.latitude, dest.longitude]
    dest = geolib.computeDestinationPoint(a, 4000000, bearing)
    line[3] = [dest.latitude, dest.longitude]
    line[4] = coords[0]
    return line
}

// Calculate the field lines as if they were on a flat plane, mostly ignoring curvature.
// Feels kinda wrong, but matches way way way better with the actual 20020 project.
function getStraightLine(data, bounds){
    //First two points follow the endzone, second and third mark a sideline to follow
    var line = [data.coords[0], data.coords[1]]

    var sideline = [data.coords[1], data.coords[2]]
    var slope = (sideline[1][1] - sideline[0][1]) / (sideline[1][0] - sideline[0][0])
    if(slope === Infinity || slope === 0){
        console.log("You made a perfectly horizontal field, very cool, please fudge the numbers for " + data.team)
        return line
    }

    // Assuming both sidelines have the same slope.  miniscule difference.
    // They do have different intersects though, which helps maintain the field width 
    var inter0 =  line[0][1] - slope * line[0][0]
    var inter1 =  line[1][1] - slope * line[1][0]

    var bounded = bounds.findLineTermination(line, slope, inter0, inter1)
    return bounded
}

function Field(params) {

    var line = getStraightLine(params.data, params.bounds)
    var ComponentType = Polygon
    if(false){ // Lazy :) .  I think I will reenable this as a toggle at somepoint?  
        line = getGeodesicLine(params.data.coords)
        ComponentType = GeodesicLine
    }

    return (
        <ComponentType
            color={params.data.color} 
            opacity={0.9}
            positions={line} 
            fill={true}
            fillOpacity={0.2}>
                <Tooltip sticky direction="bottom" offset={[0, 20]}>{params.data.team}</Tooltip>
        </ ComponentType>
    )

}
export default Field
