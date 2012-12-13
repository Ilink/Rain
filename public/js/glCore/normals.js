function getVert(verts, i){
	var i = i*3;
	return [verts[i], verts[i+1], verts[i+2]];
}

function calcFaceNormals(vertIndexes, verts){
	var vecA = vec3.create();
	var vecB = vec3.create();
	var vecC = vec3.create();
	var edgeA = vec3.create();
	var edgeB = vec3.create();
	var weightedNormalA = vec3.create(), weightedNormalB = vec3.create(), weightedNormalC = vec3.create();
	var faces = [];
	var vertSet = buildArray(verts.length / 3);
	var vertA, vertB;

	// iterator goes over a set of vertex indexes that will form a triangle
	vertIter(vertIndexes, function(faceIndex, a, b, c){
		var normal = vec3.create();
		vertA = getVert(verts, a);
		vecA.set([vertA[0], vertA[1], vertA[2]]);
		vertB = getVert(verts, b);
		vecB.set([vertB[0], vertB[1], vertB[2]]);
		vertC = getVert(verts, c);
		vecC.set([vertC[0], vertC[1], vertC[2]]);

		// Make the edge vectors
		vec3.subtract(vecB, vecA, edgeA);
		vec3.subtract(vecC, vecA, edgeB);

		vec3.cross(edgeB, edgeA, normal);
		faces.push(normal);
		vec3.normalize(normal);

		// calculateWeightedNormal(vertA, vertB, vertC, normal, weightedNormalA);
		// vec3.normalize(weightedNormalA, weightedNormalA);
		assignVertProperties(vertSet, a, faceIndex, normal);

		// calculateWeightedNormal(vertB, vertA, vertC, normal, weightedNormalB);
		// vec3.normalize(weightedNormalB, weightedNormalB);
		assignVertProperties(vertSet, b, faceIndex, normal);

		// calculateWeightedNormal(vertC, vertB, vertA, normal, weightedNormalC);
		// vec3.normalize(weightedNormalC, weightedNormalC);
		assignVertProperties(vertSet, c, faceIndex, normal);

	});

	calculateSimpleNormalAvg(vertSet);

	return {
		faces: faces,
		vertProperties: vertSet
	};
}

/*
The idea here is that we weight the normal contribution from the face by the
angle between the vertex and that face. 
There are two other verts that always contribute to the normal. We use the angle between
our current vertex and those other two vertexes. 
  1
 / \
0---2
So if the angle was really high, we want to use the normal less.  
Additionally, there are many different faces shared per vertex. We average those as well.
	=> sum shared normals / num faces
*/
function calculateWeightedNormal(targetVert, vertA, vertB, normal, destinationVec){
	var angleA, angleB, avgAngle;
	angleA = getAngle(targetVert, vertA);
	angleB = getAngle(targetVert, vertB);
	avgAngle = (angleA + angleB) / 2.0;
	avgAngle = 1.0 / avgAngle;
	if(avgAngle < 0) avgAngle = 0;
	vec3.scale(normal, avgAngle, destinationVec);
}

/*
Averages a vertex normal amongst its shared faces's normals
Simpler than using MWA or something else.
Ill move on to something else when this isn't cutting it
*/
function calculateSimpleNormalAvg(vertSet){
	$.each(vertSet, function(i, vert){
		var total = vec3.create();
		vert.normal = vec3.create();
		$.each(vert.normals, function(i, normal){
			vec3.add(normal, total, total);
		});
		// note this is component-wise division
		vec3.scale(total, 1.0/vert.normals.length, vert.normal);
	});
}

/*
this could be sped up to avoid extra square roots
http://stackoverflow.com/questions/9200723/efficient-way-to-get-the-angle-between-two-vectors-in-a-single-plane

this one has one less square root, i think
float xz = x*x + z*z, y11 = y1*y1, y12 = y1*y2, y22 = y2*y2;

float cosangle = (xz + y12) / sqrt((xz + y11) * (xz + y22));
float angle = acos(cosangle);
*/
function getAngle(a, b){
	if(vec3.equal(a,b)) return 0.0;
	var dot, magA, magB;
	dot = vec3.dot(a, b);
	magA = vec3.length(a);
	magB = vec3.length(b);
	return Math.acos(dot / (magA * magB));
}

function assignVertProperties(vertSet, vertIndex, faceIndex, normal){
	if(vertSet[vertIndex] === null){
		vertSet[vertIndex] = {
			faces: {},
			normals: [normal]
		}
		vertSet[vertIndex].faces[faceIndex] = true;
	} else {
		var currentVert = vertSet[vertIndex];
		if(typeof currentVert.faces[faceIndex] === 'undefined'){
			currentVert.faces[faceIndex] = true;
			currentVert.normals.push(normal);
		}
	}
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

function getNeighborFaces(i, faces){

}

function makeVertName(x,y,z){
	return x+"x"+y+"x"+z;
}

function vertIter(verts, cb){
	for(var i = 0; i < verts.length; i+=3){
		cb.call(this, i/3, verts[i], verts[i+1], verts[i+2]);
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