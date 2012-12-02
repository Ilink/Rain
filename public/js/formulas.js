/*
starting coordinates
time until we stop
equation


think of the equation as manipulating points
later we can map those points out as actual lines
	-> or just keep them as points


*/

function SineWave(allocator){
	var result = {};
	var startTime, totalTime;
	var x;

	var pool = allocator.get();
	var numParticles = pool.end - pool.start;

	function eq(x, yOffset){
		result.y = Math.sin(x) + yOffset;
		result.x = x;
	}

	function moveParticles(coord){
		for(var i = pool.start; i < pool.end; i++){
			pool.data[i] = coord.x;
		}
	}

	this.start = function(xOffset, yOffset, duration){
		startTime = new Date();
		var x = xOffset;
		window.requestAnimationFrame(function(){
			totalTime = new Date() - startTime;
			if(totalTime < duration){
				x += 0.01;
				eq(x, yOffset);
				moveParticle(result);
			} else {
				// stop
			}
		});
	}
}