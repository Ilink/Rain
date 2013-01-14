function Quadtree(cellSize, verts, faces, width, height, x, y){
	var center = {}; // used in getCenter operations, so we dont have to make a new one each time
	this.root = {
		width: width,
		height: height,
		x: x,
		y: y
	};
	var maxPerNode = cellSize;
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

	// width and height are correct
	// x and y are wrong
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
			x: node.x + node.width / 2,
			y: node.y
		};
		node.se = {
			width: node.width / 2,
			height: node.height / 2,
			x: node.x + node.width / 2,
			y: node.y + node.height / 2
		};
		node.sw = {
			width: node.width / 2,
			height: node.height / 2,
			x: node.x,
			y: node.y + node.height / 2
		};

		return node;
	}

	function moveContents(node){
		var x,y,z, contents = node.contents.slice();
		// console.log("moving: ", contents);
		
		for(var i = 0; i < contents.length; i+=3){
			x = contents[i];
			y = contents[i+1];
			z = contents[i+2];
			insertIntoChildren(node, x, y, z);
		}
		node.contents = [];
	}

	function insertIntoChildren(node, x, y, z){
		// if(insert(node.nw, x,y,z)) {
		// 		return true;
		// }
		// if(insert(node.ne, x,y,z)){
	    // 		return true;
		// }
		// if(insert(node.se, x,y,z)){ 
		// 		return true;
		// }
		// if(insert(node.sw, x,y,z)){ 
		// 		return true;
		// }

		if(inBounds(node.nw, x,y,z)){
			insert(node.nw, x,y,z);
			return true;
		}

		if(inBounds(node.ne, x,y,z)){
			insert(node.ne, x,y,z);
			return true;
		}

		if(inBounds(node.se, x,y,z)){
			insert(node.se, x,y,z);
			return true;
		}

		if(inBounds(node.sw, x,y,z)){
			insert(node.sw, x,y,z);
			return true;
		}

		// console.error("cannot insert into any child of: ", node, x, y, z);
		return false;
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

	function inBounds(node, x, y, z){
		// debugging purposes
		var ltYmax = y <= node.height+node.y;
		var gtYmin = y >= node.y;
		var ltXmax = x <= node.width+node.x;
		var gtXmin = x >= node.x;

		// console.log('inside max y?', ltYmax, 'within min y?', gtYmin, 'inside max x?', ltXmax, 'within min x?', gtXmin);

		var ret = x <= node.width + node.x && x >= node.x && y <= node.height+node.y && y >= node.y;
		return ret;
	}

	function sphereFits(node, radius, x,y,z){
		var xFits = radius < node.width/2;
		var yFits = radius < node.height/2;
		var boundFits = inBounds(node, x,y,z);
		return xFits && yFits && boundFits;
	}

	function insert(node, x, y, z){
		if(inBounds(node, x, y, z)){
			if(node.nw === undefined){ // try to traverse lower first
				if(node.contents === undefined){
					node.contents = [];
				}
				if(node.contents.length < maxPerNode){
					// console.log('successful insertion attempt', x,y,z);
					node.contents.push(x,y,z);
					return true;
				} else {
					node = subdivide(node);
					if(node.contents !== undefined || node.contents.length > 0) {
						// we need to relocate the contents to one of these children, because we have a more specific location now
						moveContents(node);
					}
					// console.log('insert into new subdivision');
					insertIntoChildren(node, x, y, z);
				}
			} else {
				// console.log('insert into old subdivision');
				insertIntoChildren(node, x, y, z);
			}
		} else {
			return false;
		}

	}

	this.build = function(){
		triIndexIter(verts, faces, function(i, a0, a1, a2, b0, b1, b2, c0, c1, c2){
			getCenter(center, a0, a1, a2, b0, b1, b2, c0, c1, c2);
			// console.log('triangle ', i, center.x, center.y, center.z);
			insert(self.root, center.x, center.y, center.z);
		});
	}

	this.traverse = function(node){
		if(node === undefined) {
			node = self.root;
			if(node.contents !== undefined && node.contents.length > 0){
				console.log("root contents: ", node.contents);
			}
		}
		
		if(node.nw !== undefined){
			if(node.nw.contents !== undefined && node.nw.contents.length > 0){
				console.log("nw contents: ", node.nw.contents);
			}
			self.traverse(node.nw);
		}

		if(node.ne !== undefined){
			if(node.ne.contents !== undefined && node.ne.contents.length > 0){
				console.log("ne contents: ", node.ne.contents);
			}
			self.traverse(node.ne);
		}

		if(node.se !== undefined){
			if(node.se.contents !== undefined && node.se.contents.length > 0){
				console.log("se contents: ", node.se.contents);
			}
			self.traverse(node.se);
		}

		if(node.sw !== undefined){
			if(node.sw.contents !== undefined && node.sw.contents.length > 0){
				console.log("sw contents: ", node.sw.contents);
			}
			self.traverse(node.sw);
		}
	};

	this.collect = function(node, collection){
		var args = Array.prototype.slice.call(arguments);
		if(args.length < 2) {
			var node = self.root;
			var collection = args[0];
		}

		if(node.contents !== undefined){
			$.each(node.contents, function(i,v){
				collection.push(v);
			});
		}
		
		if(node.nw !== undefined){
			self.collect(node.nw, collection);
			self.collect(node.ne, collection);
			self.collect(node.se, collection);
			self.collect(node.sw, collection);
		}
	}

	function _sphereTraverse(node, radius, results, x,y,z){
		var fit = false;
		if(node.nw === undefined){
			return node.contents;
		} else {
			if(sphereFits(node.nw, radius, x,y,z)){
				fit = true;
				_sphereTraverse(node.nw, radius,results, x,y,z);
			}
			if(!fit && sphereFits(node.ne, radius, results, x,y,z)){
				fit = true;
				_sphereTraverse(node.ne, radius, results, x,y,z);
			}
			if(!fit && sphereFits(node.se, radius, results, x,y,z)){
				fit = true;
				_sphereTraverse(node.se, radius,results, x,y,z);
			}
			if(!fit && sphereFits(node.sw, radius,results, x,y,z)){
				fit = true;
				_sphereTraverse(node.sw, radius, results, x,y,z);
			}
			if(!fit){
				self.collect(node, results);
				return results;
			}
		}
		return results;
	}

	// xyz is the center point
	this.sphereTraverse = function(radius, x,y,z){
		var results = [];
		return _sphereTraverse(self.root, radius, results, x,y,z);
	};
}