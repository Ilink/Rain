/* 
I dont know, this is probably a singleton ish, so ill make the constructor generate everything
params:
	xDim
	yDim
	hMax: max height

	|
	|
y	|
	|
	|__________
		 x

+z is up
I think that is 'easy' to use with opengl...easy to change later

params will have more stuff as I figure out how to actually massage the perlin noise function
*/

function Terrain(params){
	var i, j, h, yDim = params.yDim, xDim = params.xDim;
	var noise = new SimplexNoise();
	var map = []; // flat because fuck 2d arrays
	for(j=0; j < yDim; j++){
		for(i=0; i < xDim; i++){
			h = noise.noise(i,j);
			map.push(j,h,i);
		}
	}

	// this transforms the map verts into a set of faces, all next to one another (in the array)
<<<<<<< HEAD
	// the output of this function is the format expected by createIndexes
	var faces = [];
	faceIter(map, xDim, yDim, function(a,b,c,d){
		faces.push(a,b,c,d);
	});
	// console.log(faces.length, map.length);
	console.log(faces);

	// face indices for drawing
	// assembles vertex indexes from the faces, using CCW order
	var faceIndexes = [];
	for(var i = 0; i < faces.length/3.0; i+=4){
		faceIndexes.push(i,i+1,i+2);
		faceIndexes.push(i,i+2,i+3);
	}

	function transformFaces(verts, xDim, yDim){
		var faces = [];
		var rowCount = 0;
		for(var i = 0; i < verts.length/3; i+=12){
			rowCount++;
			// if we're on the last row, we're done
			if(i >= verts.length - xDim-2) return;
			if(rowCount === xDim){
				rowCount = 0;				
			} else {
				faces.push(verts[i], verts[i+1],verts[i+2], 
						   verts[i+xDim], verts[i+xDim+3], verts[i+xDim+2], 
						   verts[i+xDim+3], verts[i+xDim+4], verts[i+xDim+5], 
						   verts[i+3], verts[i+4], verts[i+5]);
			}
		}
		return faces;
	}

	console.log(map);
	var faces = [];
	faces = transformFaces(map, xDim, yDim)
	console.log('faces length',faces.length, 'noise map length',map.length);
	console.log(faces);

	// face indices for drawing
	// assembles vertex indexes from the faces, using CCW order
	var faceIndexes = [];
	for(var i = 0; i < faces.length/3.0; i+=4){
		faceIndexes.push(i,i+1,i+2);
		faceIndexes.push(i,i+2,i+3);
	}

	this.faces = faces;
    this.vertsBuffer = makeBuffer(faces, 3)
	this.indexesBuffer = makeIndexBuffer(faceIndexes, 3)
	// this.normalsBuffer = makeGeoBuffer(normals, 3)
}

