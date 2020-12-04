import * as geolib from 'geolib';
import GeodesicLine from './GeodesicLine'

function getLine(coords){
    var line = [coords[0], coords[1]]
    var a = {latitude: coords[0][0], longitude: coords[0][1]}
    var b = {latitude: coords[1][0], longitude: coords[1][1]}

    var bearing = geolib.getRhumbLineBearing(a, b)
    //bearing = geolib.getGreatCircleBearing(a, b)
    var dest = geolib.computeDestinationPoint(b, 4000000, bearing - 90)
    line[2] = [dest.latitude, dest.longitude]
    dest = geolib.computeDestinationPoint(a, 4000000, bearing - 90)
    line[3] = [dest.latitude, dest.longitude]
    line[4] = coords[0]
    return line
}

function Field() {
    //Husky stadium field coordinates, go dawgs
    var coords = [[47.650650, -122.302096],
        [47.650235, -122.302297]]
        //[47.649982, -122.301137]]
        //[47.650398, -122.300938]]
    var line = getLine(coords)
    return (
        <GeodesicLine color="purple" positions={line} />
    )
}
export default Field

// Data should be able to be two coordinates (endzone), plus name, plus color.  Maybe ID
// Could switch to coordinate center (easily available on wiki and whatnot) + bearing.

// Original coordinates for the stadium
// [47.650650, -122.302096]
// [47.650235, -122.302297]
// [47.649982, -122.301137]
// [47.650398, -122.300938]
