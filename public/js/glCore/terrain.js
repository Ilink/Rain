/* 
I dont know, this is probably a singleton ish, so ill make the constructor generate everything
params:
    xDim
    yDim
    hMax: max height

    |
    |
y   |
    |
    |__________
         x

+z is up
I think that is 'easy' to use with opengl...easy to change later

params will have more stuff as I figure out how to actually massage the perlin noise function
*/

function Terrain(params){
    var self = this;
    var i, j, h, yDim = params.yDim, xDim = params.xDim;
    var noise = new SimplexNoise();
    var heightMap = [];
    for(j=0; j < yDim; j++){
        for(i=0; i < xDim; i++){
            h = Math.abs(noise.noise(i,j));
            heightMap.push(j,h*2,i/2);
        }
    }

    function tesselate(verts, xDim, yDim){
        var faces = [];
        var width = xDim * 3;
        var height = yDim * 3;
        var rowCount = 0;
        for(var i = 0; i < verts.length/3; i+=3){
            rowCount++;
            // if we're on the last row, we're done
            if(i >= verts.length - width-3) return faces;
            // i think this part is causing issues
            if(rowCount === xDim){
                rowCount = 0;
            } else {
                faces.push(verts[i], verts[i+1],verts[i+2], 
                           verts[i+width], verts[i+width+1], verts[i+width+2], 
                           verts[i+width+3], verts[i+width+4], verts[i+width+5], 
                           verts[i+3], verts[i+4], verts[i+5]);
            }
        }
        return faces;
    }

    var faces = tesselate(heightMap, xDim, yDim);
    var numTris = faces.length/3;

    // face indexes for drawing
    // assembles vertex indexes from the faces, using CCW order
    var faceIndexes = [];
    for(var i = 0; i < faces.length/3; i+=4){
        faceIndexes.push(i,i+1,i+2);
        faceIndexes.push(i,i+2,i+3);
    }

    this.faces = faces;
    this.indexes = faceIndexes;
    this.vertsBuffer = makeBuffer(faces, 3);
    this.indexesBuffer = makeIndexBuffer(faceIndexes, 3);
    this.normals = calcFaceNormals(faceIndexes, faces);
    this.normalsBuffer = makeGeoBuffer(this.normals, 3);

    this.draw = function(normalUni, positionAttr){
        gl.bindBuffer(gl.ARRAY_BUFFER, self.normalsBuffer.glBuffer);
        gl.vertexAttribPointer(normalUni, 3, gl.FLOAT, false, 0, 0);

        gl.bindBuffer(gl.ARRAY_BUFFER, self.vertsBuffer.glBuffer);
        gl.vertexAttribPointer(positionAttr, 3, gl.FLOAT, false, 0, 0);

        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, self.indexesBuffer.glBuffer);
        gl.drawElements(gl.TRIANGLES, numTris, gl.UNSIGNED_SHORT, 0);
    };

}

