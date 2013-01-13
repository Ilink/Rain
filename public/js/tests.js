// Normals
///////////////////////////////////

var a = vec3.create([1,0,0]);
var b = vec3.create([0,1,0]);
var angleBetween = getAngle(a,b);
// console.log("angle between", angleBetween);

var rect = geoPresets.rectangle;
rect = $.extend(rect, {});
console.log('using rect:', rect);
// rect.verts[2] = 2;
rect.verts[3] = 0.5;
rect.verts[4] = 0.5;
rect.verts[5] = -50;

// rect.verts[5] = 25;
// rect.verts[11] = 50;
// var faceNormals = calcFaceNormals(rect.indexes, rect.verts);
// console.log('face normals: ', faceNormals);


// Reflection vector tests
///////////////////////////////////
var input = vec3.create([2, 2, 0]);
vec3.normalize(input, input);
var normal = vec3.create([0, 3, 0]);
vec3.normalize(normal, normal);
// console.log(getReflection(input, normal));


// Allocator tests
//////////////////////////////////
var pool = [];
var size = 10;
var chunkSize = 2;
for(var i = 0; i < size; i++){
    pool.push(i);
}
var allocator = new Allocator(pool, chunkSize);
for(var i = 0; i < size / chunkSize; i++){
    var chunk = allocator.get();
    if(i % 2 === 0) chunk.free();
    // console.log(chunk);
}
// console.log(allocator.get());

// Noise
var noise = new SimplexNoise();
var noiseMap = noise.noise3d(10,0,1);
// console.log(noiseMap);

// Terrain
// var terrain = new Terrain({yDim: 2, xDim: 4});

// qt tests
//////////////////////////////////
var verts = [
	1, 1, 1,
	2, 2, 2,
	3, 3, 3,
	4, 4, 4,

	10, 10, 10,
	11, 12, 12,
	12, 3, 3,
	4, 4, 4
]

var faces = [
	0, 1, 2,
	0, 2, 3
]

function makeTestVertsFaces(numVerts, numQuads){
	var i, verts = [], faces = [], rand;

	for(i=0; i < numVerts * 3; i+=3){
		rand = i/3 + Math.random();
		verts.push(rand, rand+0.1, rand+0.2);
	}

	for(i=0; i < numQuads*4; i+=4){
		faces.push(i, i+1, i+2);
		faces.push(i, i+2, i+3);
	}
	

	return {
		verts: verts,
		faces: faces
	}
}

var testStuff = makeTestVertsFaces(8, 2);
console.log(testStuff.verts, testStuff.verts.length/3);
var qt = new Quadtree(1, testStuff.verts, testStuff.faces, 10, 10, 0, 0);
// qt.build();
// qt.traverse();
// console.log(qt);

// Sphere sphere intersections
//////////////////////////////////

console.log("0,0,0 and 1,1,1, radii = 2 :", sphereSphere(2, 2, 0,0,0, 1,1,1));
console.log("0,0,0 and 3,3,3, radii = 2 :", sphereSphere(2, 2, 0,0,0, 3,3,3));
