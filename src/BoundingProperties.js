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
        var greaterEndpointSegment, greaterEndpoint
        var lesserEndpointSegment, lesserEndpoint
        var segment, x, y

        for(var index in this.boundSegments){
            segment = this.boundSegments[index]
            x = (inter0 - segment.b) / (segment.m - slope)
            y = slope * x + inter0

            // If the location where the two lines intersect is between the endpoints of the segment, we found an intersection
            if(((segment.pointA[0] <= x && x <= segment.pointB[0]) || (segment.pointB[0] <= x && x <= segment.pointA[0])) &&
                ((segment.pointA[1] <= y && y <= segment.pointB[1]) || (segment.pointB[1] <= y && y <= segment.pointA[1]))){

                // Saving the closest intersection in each direction
                if(y > line[0][1]){
                    if(greaterEndpoint == null || y < greaterEndpoint[1]){
                        greaterEndpointSegment = segment
                        greaterEndpoint = [x,y]
                    }
                }else{
                    if(lesserEndpoint == null || y > lesserEndpoint[1]){
                        lesserEndpointSegment = segment
                        lesserEndpoint = [x,y]
                    }
                }
            }
        }
        var newLine = [lesserEndpoint, line[0], greaterEndpoint]
        //calculate other sideline
        x = (inter1 - greaterEndpointSegment.b) / (greaterEndpointSegment.m - slope)
        y = slope * x + inter1
        newLine.push([x,y])

        newLine.push(line[1])

        x = (inter1 - lesserEndpointSegment.b) / (lesserEndpointSegment.m - slope)
        y = slope * x + inter1
        newLine.push([x,y])
        // Todo - calculate more points inbetween the termination and source.  

        return newLine
    }
}

export default BoundingProperties;
