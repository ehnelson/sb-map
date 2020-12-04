import { createPathComponent } from '@react-leaflet/core'
import {
  GeodesicLine as LeafletGeodesicline
} from 'leaflet.geodesic'

//Wrapper for the geodesic line package.  actually pretty easy!
//Mostly code from the react-leaflet package.  Removed some typescript stuff for now.

export const GeodesicLine = createPathComponent(
  function createPolyline(options, ctx) {
    const instance = new LeafletGeodesicline(options["positions"], options)
    return { instance, context: { ...ctx, overlayContainer: instance } }
  },
  function updatePolyline(layer, props, prevProps) {
    if (props["positions"] !== prevProps["positions"]) {
      layer.setLatLngs(props["positions"])
    }
  },
)

export default GeodesicLine