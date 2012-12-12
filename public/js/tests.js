// Normals
///////////////////////////////////
var rect = geo_builder.rectangle_gradient;
rect = $.extend(rect, {});
rect[2] = 2;
rect[5] = 2;
rect[11] = 2;
// var faceNormals = calcFaceNormals(rect);
// console.log('face normals: ',faceNormals);


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