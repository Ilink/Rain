// Normals
///////////////////////////////////

var a = vec3.create([1,0,0]);
var b = vec3.create([0,1,0]);
var angleBetween = getAngle(a,b);
console.log("angle between", angleBetween);

var rect = geo_builder.rectangle_gradient;
var rect = geoPresets.rectangle;
rect = $.extend(rect, {});
rect.verts[2] = 2;
rect.verts[5] = 25;
rect.verts[11] = 50;
var faceNormals = calcFaceNormals(rect.indexes, rect.verts);
console.log('face normals: ', faceNormals);


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
    console.log(chunk);
}
// console.log(allocator.get());