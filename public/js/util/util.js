function multiply_elements(mat, val){
	$.each(mat, function(i, v){
		mat[i] *= val;
	});
}

function getReflection(input, normal){
	var projection = vec3.dot(normal, input);
	var doubled = projection*2;
	var top = vec3.scale(normal, doubled);
	return vec3.subtract(top, input);
}

function buildArray(size){
	var arr = [];
	for(var i = 0; i < size; i++){
		arr.push(null);
	}
	return arr;
}

function degToRad(deg){
	return deg * Math.PI / 180;
}