import { Polygon } from "react-leaflet"

function Field() {
    //Husky stadium field coordinates, go dawgs
    var coords = [[47.650650, -122.302096],
        [47.650235, -122.302297],
        [47.649982, -122.301137],
        [47.650398, -122.300938]]
    return (
        <Polygon color="purple" positions={coords} />
    )
}
export default Field