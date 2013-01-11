function Quadtree(_verts, _faces, width, height, centerX, centerY){
	// var verts = _verts.slice();
	// var faces = _faces.slice();
	var center = {}; // used in getCenter operations
	var root = {
		width: width,
		height: height,
		centerX: x,
		centerY: y
	};
	var maxPerNode = 1;

	/*
	var node = {
		nw: {node}
		ne: {node}
		se: {node}
		sw: {node}
		contents: [points go here],
		AABB boundary
	}
	*/

	function subdivide(node){
		moveContents(node);
		node.nw = {};
		node.ne = {};
		node.se = {};
		node.sw = {};
		// do stuff with boundaries too
	}

	function moveContents(node){
		/*
		iterate through node contents via vertex iter
			try to insert into each child:
				if(insert(node.nw, x,y,z)) return true;
				if(insert(node.ne, x,y,z)) return true;
				if(insert(node.se, x,y,z)) return true;
				if(insert(node.sw, x,y,z)) return true;
		*/
	}

	function getCenter(center, a0, a1, a2, b0, b1, b2, c0, c1, c2){
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

		return [x,y,z];
	}

	function insert(node, x, y, z){
		if(x <= width+node.centerX && x >= node.centerX && y <= height+node.centerY && y >= node.centerY){
			if(node.contents.length < maxPerNode){
				node.contents.push(x,y,z);
				return true;
			} else if(node.nw === undefined){ // no children, we can subdivide this node for more
				subdivide(node);
				if(insert(node.nw, x,y,z)) return true;
				if(insert(node.ne, x,y,z)) return true;
				if(insert(node.se, x,y,z)) return true;
				if(insert(node.sw, x,y,z)) return true;
			}
		}
		return false;

		/*
		if(xyz is within node boundaries)
			if(contents not full)
				insert
				return true
			else if(node.nw === undefined)
				subdivide
			if(insert(node.nw, x,y,z)) return true;
			if(insert(node.ne, x,y,z)) return true;
			if(insert(node.se, x,y,z)) return true;
			if(insert(node.sw, x,y,z)) return true;
		*/
	}

	this.build = function(){
		triIndexIter(verts, faces, function(a0, a1, a2, b0, b1, b2, c0, c1, c2){
			getCenter(center, a0, a1, a2, b0, b1, b2, c0, c1, c2);
			insert(node, center.x, center.y, center.z);
		});
	}	
}