function calcFaceNormals(verts){
	var vec1 = vec3.create();
	var vec2 = vec3.create();
	var vec3 = vec3.create();
	var normal = vec3.create();
	var faces = [];

	/*
	i recommend looking at a picture of a triangle strip if this is confusing
	basically we have to treat the first as a full triangle and the rest as an extension of it

	first case is special
	then reverse next/prev on even/odd
	*/

	vec1.set(verts[i], verts[i+1], verts[i+2]);
	vec2.set(verts[i+3], verts[i+4], verts[i+5]);
	vec3.set(verts[i+6], verts[i+7], verts[i+8]);
	vec3.cross(vec1, vec2, normal);
	vec3.normalize(normal, normal);
	faces.push(normal);

	// this might need to be 6 or 9
	// loop is wrong, cases are right
	for(var i = 8; i < verts.length; i+=6){
		// if(i % 2){
		// 	vec1.set(verts[i], verts[i+1], verts[i+2]);
		// 	vec2.set(verts[i-3], verts[i-2], verts[i-1]);
		// 	vec3.set(verts[i+3], verts[i+4], verts[i+5]);	
		// } else {
		// 	vec1.set(verts[i], verts[i+1], verts[i+2]);
		// 	vec2.set(verts[i+3], verts[i+4], verts[i+5]);
		// 	vec3.set(verts[i+6], verts[i+7], verts[i+8]);
		// }

		vec1.set(verts[i], verts[i+1], verts[i+2]);
		vec2.set(verts[i-3], verts[i-2], verts[i-1]);
		vec3.set(verts[i+3], verts[i+4], verts[i+5]);
		
		vec1.set(verts[i], verts[i+1], verts[i+2]);
		vec2.set(verts[i+3], verts[i+4], verts[i+5]);
		vec3.set(verts[i+6], verts[i+7], verts[i+8]);
	
		vec3.cross(vec1, vec2, normal);
		vec3.normalize(normal, normal);
		faces.push(normal);
	}
	return faces;
}

/*
each set of verts gets a face
when merging verts, merges that set of faces
*/


// This assumes triangle strip style drawing
// i dont care about the others (fans, mostly) for now
function calcVertexNormals(verts){

}