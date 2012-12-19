function MouseParticles(renderer, verts, mouse){
	var allocator = new Allocator(verts, 240);
	

	function trackMouse(){
		mouse.track(function(coords, velocityVec){
			var block = allocator.get();
			if(block){
				var sine = new SineWave();
				sine.start(block, coords.x, coords.y, 5000, velocityVec);
			}
		}, 500);
	}

	this.start = function(){

	}

	this.stop = function(){

	}

	trackMouse();
}