import * as geolib from 'geolib';
import GeodesicLine from './GeodesicLine'

function getLine(coords){
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

function Field(params) {
    var line = getLine(params.data.coords)
    return (
        <GeodesicLine color={params.data.color} positions={line} />
    )
}
export default Field

// Data should be able to be two coordinates (endzone), plus name, plus color.  Maybe ID
// Could switch to coordinate center (easily available on wiki and whatnot) + bearing.

