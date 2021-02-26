import boundingData from './boundingData.json'

// BoundingProperties contains the outer dimensions of the country that we are limiting by.
// This is pretty quick and dirty, will probably pull it into a util file at some point.

class BoundingProperties {
    constructor(props){
        this.mapData = boundingData
        this.boundSegments = this.getBoundingSegments()
    }

    // Calculate the segments in our country bounding box.  
    getBoundingSegments () {
        var lastPoint = this.mapData[this.mapData.length - 1]
        var segments = []
        for(var index in this.mapData) {
            var point = this.mapData[index]
            var newSegment = {
                pointA: lastPoint,
                pointB: point
            }
            if(point[0] - lastPoint[0] === 0.0){
                console.log("Hey lets not divide by zero here yeah?")
                // Shouldn't be an issue, since we're picking custom points.  Just a dev log.
            }

            // Calculate the slope and intersect for each segment
            newSegment.m = (point[1] - lastPoint[1]) / (point[0] - lastPoint[0])
            newSegment.b = point[1] - newSegment.m * point[0]

            segments.push(newSegment)
            lastPoint = point
        }
        return segments

    }

    // Extend the field lines from the stadium until they intersect with our bounding box
    // Currently reinserts the field between endpoints, the curvature of the map is causing issues.
    findLineTermination(line, slope, inter0, inter1){
        var newLine = Array.from(line)
        for(var index in this.boundSegments){
            var segment = this.boundSegments[index]
            var x = (inter0 - segment.b) / (segment.m - slope)
            var y = slope * x + inter0

            // If the location where the two lines intersect is between the endpoints of the segment, save it into our newline
            if(((segment.pointA[0] <= x && x <= segment.pointB[0]) || (segment.pointB[0] <= x && x <= segment.pointA[0])) &&
                ((segment.pointA[1] <= y && y <= segment.pointB[1]) || (segment.pointB[1] <= y && y <= segment.pointA[1]))){
                newLine.push([x,y])

                //Also calculate for the other sideline.
                x = (inter1 - segment.b) / (segment.m - slope)
                y = slope * x + inter1
                newLine.push([x,y])

                //Reinsert field, helps with accuracy
                newLine.push(newLine[0])
                newLine.push(newLine[1])
            }
        }
        return newLine
    }
}

export default BoundingProperties;
