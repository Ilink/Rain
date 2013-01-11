function Quadtree(verts, faces){

	function getCenter(a0, a1, a2, b0, b1, b2, c0, c1, c2){
		// average
		var x = (a0 + b0 + c0) / 3;
		var y = (a0 + b0 + c0) / 3;
		var z = (a0 + b0 + c0) / 3;

		// centroid
		var midA0 = (a0 + b0) / 2;
		var midA1 = (a1 + b1) / 2;
		var midA2 = (a2 + b2) / 2;

		var x = (midA0 + c0) / 2;
		var y = (midA1 + c1) / 2;
		var z = (midA2 + c2) / 2;
	}

	function insert(a0, a1, a2, b0, b1, b2, c0, c1, c2){

	}

	this.build = function(){
		triIndexIter(verts, faces, function(a0, a1, a2, b0, b1, b2, c0, c1, c2){
			insert(a0, a1, a2, b0, b1, b2, c0, c1, c2);
		});
	}
}