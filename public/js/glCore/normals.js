function getVert(verts, i){
	return [verts[i], verts[i+1], verts[i+2]];
}

function calcFaceNormals(vertIndexes, verts){
	var vecA = vec3.create();
	var vecB = vec3.create();
	var vecC = vec3.create();
	var normal = vec3.create();
	var faces = [];
	var vertA, vertB;

	vertIter(vertIndexes, function(a, b, c){
		vertA = getVert(verts, a);
		vecA.set([vertA[0], vertA[1], vertA[2]]);
		vertB = getVert(verts, b);
		vecB.set([vertB[0], vertB[1], vertB[2]]);

		vec3.cross(vecA, vecB, normal);
		vec3.normalize(normal, normal);
		faces.push(normal);
	});
}

// deprecateddddddddd
// going to use indexed triangles instead
function _old_calcFaceNormals(verts){
	var vecA = vec3.create();
	var vecB = vec3.create();
	var vecC = vec3.create();
	var normal = vec3.create();
	var faces = [];

	/*
	i recommend looking at a picture of a triangle strip
	This is for clockwise winding. Not sure if that's right? Should I be using ccw?

	lets switch this whole thing to use indexed triangles instead
	*/

	for(var i = 6; i < verts.length; i+=6){

		if(i+6 < verts.length){
			vecA.set([verts[i], verts[i+1], verts[i+2]]);
			vecB.set([verts[i+3], verts[i+4], verts[i+5]]);
			vecC.set([verts[i+6], verts[i+7], verts[i+8]]);

			vec3.cross(vecA, vecB, normal);
			vec3.normalize(normal, normal);
			faces.push(normal);
		} else throw "not enough verts";

		vecA.set([verts[i], verts[i+1], verts[i+2]]);
		vecB.set([verts[i-3], verts[i-2], verts[i-1]]);
		vecC.set([verts[i+3], verts[i+4], verts[i+5]]);

		vec3.cross(vecA, vecB, normal);
		vec3.normalize(normal, normal);

		faces.push(normal);
	}
	return faces;
}

function makeVertNormals(verts, faces){
	var vertNormals = {};
	for(var i = 0; i < faces.length; i++){
		
	}
}

function getNeighborFaces(i, faces){

}

function makeVertName(x,y,z){
	return x+"x"+y+"x"+z;
}

function vertIter(verts, cb){
	for(var i = 0; i < verts.length; i+=3){
		cb.call(this, verts[i], verts[i+1], verts[i+2]);
	}
}

function getNumVerts(verts){
	return verts.length / 3;
}

function isBoundary(verts, i){
	if(i >= verts.length || 
	i === 0 ||
	i === 3){
		return true;
	} else {
		var currentX = verts[i];
		var prevX = verts[i-3];
		var nextX = verts[i+3];
		if(prevX > currentX) return true;
		if(nextX < currentX) return true;
		return false;
	}
}

function createMergedVerts(){
	var merged = {}, key;
	vertIter(verts, function(x,y,z){
		key = makeVertName(x,y,z);
		if(typeof merged[key] === 'undefined'){
			merged[key] = {
				faces: {}
			};
			// merged[key].faces[]
			// var currentFaces = getFaces(i);
		}
	});
}

// i is a vertex index 
function getFaces(faces, i){
	if(i % 2){
		// return {faces[i]: true, faces[i-1]: true, faces[i-2]: true};
	} else {
		// return {faces[i-1]: true, faces[i-2]: true};
	}
}

/*
iterate over vertexes
	set the hash name of the vert, given its location makeVertName(x, y, z)
	add or append the neighboring faces
		should be able to find neighbor faces from vertex index
	weight by edge with other faces
	add to normal value?
*/

/*
|\|\|\|
vert 0 => face 0
vert 1 => face 0, 1
vert 2 => face 0, 1, 2
vert 3 => face 1, 2
vert 4 => face 2, 3, 4
vert 5 => face 3, 4

I think the first two are edge cases because they are the first two verts. 
The last two may have the same?

even vert i: face i, i-1, i-2
odd vert i: face i-1, i-2

last edge
last vert (top): last face
last vert (bot): last face, last face-1

first edge
first vert (bottom): first face
first vert (top): first face, first face+1

that definition is flawed for bigger sets of data
it's more like a face with no neighbors
*/

/*
simplify the above:
just contribute one face per vertex, then merge in normalization
*/


// This assumes triangle strip style drawing
// i dont care about the others (fans, mostly) for now
function calcVertexNormals(verts){

}