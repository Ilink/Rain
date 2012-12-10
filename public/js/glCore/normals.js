function calcFaceNormals(verts){
	var vecA = vec3.create();
	var vecB = vec3.create();
	var vecC = vec3.create();
	var normal = vec3.create();
	var faces = [];

	/*
	i recommend looking at a picture of a triangle strip if this is confusing
	basically we have to treat the first as a full triangle and the rest as an extension of it

	first case is special
	then reverse next/prev on even/odd
	*/

	vecA.set([verts[0], verts[1], verts[2]]);
	vecB.set([verts[3], verts[4], verts[5]]);
	vecC.set([verts[6], verts[7], verts[8]]);
	vec3.cross(vecA, vecB, normal);
	console.log(vecA);
	console.log(vecB);
	console.log(normal);
	vec3.normalize(normal, normal);
	faces.push(normal);

	// this might need to be 6 or 9
	// loop is wrong, cases are right
	for(var i = 6; i < verts.length; i+=6){
		vecA.set([verts[i], verts[i+1], verts[i+2]]);
		vecB.set([verts[i-3], verts[i-2], verts[i-1]]);
		vecC.set([verts[i+3], verts[i+4], verts[i+5]]);

		console.log(vecA);
		console.log(vecB);

		vec3.cross(vecA, vecB, normal);
		vec3.normalize(normal, normal);
		console.log(normal);

		faces.push(normal);
		
		if(i+6 < verts.length){
			vecA.set([verts[i], verts[i+1], verts[i+2]]);
			vecB.set([verts[i+3], verts[i+4], verts[i+5]]);
			vecC.set([verts[i+6], verts[i+7], verts[i+8]]);

			console.log(vecA);
			console.log(vecB);
			
			vec3.cross(vecA, vecB, normal);
			console.log(normal);
			vec3.normalize(normal, normal);
			faces.push(normal);
		}
		
	}
	return faces;
}

function makeVertNormals(verts, faces){
	var vertNormals = {};
	for(var i = 0; i < faces.length; i++){
		
	}
}

function makeVertName(x,y,z){
	return x+"x"+y+"x"+z;
}

/*
each set of verts gets a face
when merging verts, merges that set of faces
*/


// This assumes triangle strip style drawing
// i dont care about the others (fans, mostly) for now
function calcVertexNormals(verts){

}