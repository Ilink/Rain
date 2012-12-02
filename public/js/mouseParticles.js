function MouseParticles(verts, mouse){
	var allocator = new Allocator(verts);
	var sine = new SineWave(allocator);

	function trackMouse(){
		mouse.track(function(coords){
			// test moving the verts
			lineIter(verts, function(axIndex, ayIndex, azIndex, bxIndex, byIndex, bzIndex){
				verts[axIndex] = coords.x;
				verts[bxIndex] = coords.x + Math.random() / 2;
				verts[ayIndex] = coords.y;
				verts[byIndex] = coords.y + Math.random() / 3;
			});
			// for(var i= 0; i < verts.length; i++){
			// 	verts[i] = coords.x + Math.random()/10;
			// }
		}, 0);
	}

	this.start = function(){

	}

	this.stop = function(){

	}

	trackMouse();
}