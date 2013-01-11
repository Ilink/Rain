function Quadtree(verts, faces, width, height, x, y){
	// var verts = _verts.slice();
	// var faces = _faces.slice();
	var center = {}; // used in getCenter operations
	this.root = {
		width: width,
		height: height,
		x: x,
		y: y
	};
	var maxPerNode = 1;
	maxPerNode *= 3; // size of a point
	var self = this;

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
		node.nw = {
			width: node.width / 2,
			height: node.height / 2,
			x: node.x,
			y: node.y
		};
		node.ne = {
			width: node.width / 2,
			height: node.height / 2,
			x: node.width / 2,
			y: node.y
		};
		node.se = {
			width: node.width / 2,
			height: node.height / 2,
			x: node.width / 2,
			y: node.y
		};
		node.sw = {
			width: node.width / 2,
			height: node.height / 2,
			x: node.x,
			y: node.y / 2
		};
		// we need to relocate the contents to one of these children, because we have a more specific location now
		moveContents(node);
	}

	function moveContents(node){
		var x,y,z, contents = node.contents.slice();
		node.contents = undefined;
		for(var i = 0; i < contents; i+=3){
			x = contents[i];
			y = contents[i+1];
			z = contents[i+2];
			insert(node, x, y, z);
		}
	}

	function insertIntoChildren(node, x, y, z){
		var inserted = false;
		if(insert(node.nw, x,y,z)) inserted = true;
		if(!inserted && insert(node.ne, x,y,z)) inserted = true;
		if(!inserted && insert(node.se, x,y,z)) inserted = true;
		if(!inserted && insert(node.sw, x,y,z)) inserted = true;
		if(!inserted) console.error("cannot insert into any child of: ", node);
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

		center.x = x;
		center.y = y;
		center.z = z;
	}

	function insert(node, x, y, z){
		if(x <= width+node.x && x >= node.x && y <= height+node.y && y >= node.y){
			if(node.nw === undefined){ 
				if(node.contents === undefined){
					node.contents = [];
				}
				if(node.contents.length < maxPerNode){
					node.contents.push(x,y,z);
					return true;
				} else {
					subdivide(node);
					insertIntoChildren(node, x, y, z);
				}
			} else { // try to traverse lower first
				insertIntoChildren(node, x, y, z);
			}
		} else {
			return false;
		}

	}

	this.build = function(){
		triIndexIter(verts, faces, function(i, a0, a1, a2, b0, b1, b2, c0, c1, c2){
			console.log('triangle ', i);
			getCenter(center, a0, a1, a2, b0, b1, b2, c0, c1, c2);
			insert(self.root, center.x, center.y, center.z);
		});
	}	
}