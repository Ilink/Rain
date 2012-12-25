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
			map.push(i,j,h);
		}
	}

	console.log(map);
	var faces = [];
	faceIter(map, xDim, yDim, function(a,b,c,d){
		faces.push(a,b,c,d);
	});
	console.log(faces.length, map.length);
	console.log(faces);

	// this transforms the map verts into a set of faces, all next to one another (in the array)
	// the output of this function is the format expected by createIndexes
	function createFaces(){

	}

	// assembles vertex indexes from the faces, using CCW order
	function createIndexes(){

	}

	function faceIter(verts, xDim, yDim, cb){
		var rowCount = 0;
		for(var i = 0; i < verts.length/3; i++){
			rowCount++;
			// if we're on the last row, we're done
			if(i >= verts.length - xDim-2) return;
			if(rowCount === xDim){
				console.log('row count reset at', rowCount);
				rowCount = 0;
				
			} else {
				cb(i, i+xDim, i+xDim+1, i+1);
				// cb(verts[i], verts[i+xDim], verts[i+xDim+1], verts[i+1]);
			}
		}
	}
}

