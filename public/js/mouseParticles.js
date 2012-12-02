function MouseParticles(verts, mouse){
	var allocator = new Allocator(verts, 240);
	var sine = new SineWave(allocator);

	function trackMouse(){
		mouse.track(function(coords){
			sine.start(coords.x, coords.y, 5000);

			// test moving the verts
			// lineIter(verts.length, function(axIndex, ayIndex, azIndex, bxIndex, byIndex, bzIndex){
			// 	verts[axIndex] = coords.x;
			// 	verts[bxIndex] = coords.x + Math.random() / 2;
			// 	verts[ayIndex] = coords.y;
			// 	verts[byIndex] = coords.y + Math.random() / 3;
			// });
		}, 500);
	}

	this.start = function(){

	}

	this.stop = function(){

	}

	trackMouse();
}