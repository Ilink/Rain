function calcFaceNormals(verts){
	var vec1 = vec3.create();
	var vec2 = vec3.create();
	var vec3 = vec3.create();
	var normal = vec3.create();

	for(var i = 0; i < verts.length; i+=3){ // i think its +6...devil is in the off by 3 errors too, apparently
		if(i % 2){
			// i recommend looking at a picture of a triangle strip if this is confusing
			// basically we have to treat the first as a full triangle and the rest as an extension of it
			// or do we treat them differently based upon even and odd?

			/*
			first case is special
			then reverse next/prev on even/odd
			*/
			vec1.set(verts[i], verts[i+1], verts[i+2]);
			vec2.set(verts[i-3], verts[i-2], verts[i-1]);
			vec3.set(verts[i+3], verts[i+4], verts[i+5]);	
		} else {
			vec1.set(verts[i], verts[i+1], verts[i+2]);
			vec2.set(verts[i+3], verts[i+4], verts[i+5]);
			vec3.set(verts[i+6], verts[i+7], verts[i+8]);
		}
	}
}


// This assumes triangle strip style drawing
// i dont care about the others (fans, mostly) for now
function calcVertexNormals(verts){

}