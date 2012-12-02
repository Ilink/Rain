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

	function sin(x, yOffset){
		result.y = (Math.sin(x) + yOffset);
		result.x = x;
	}

	function moveParticles(coords){
		// console.log(coords);
		lineIter(pool.data.length, function(axIndex, ayIndex, azIndex, bxIndex, byIndex, bzIndex){
			pool.data[axIndex] = coords.x;
			pool.data[bxIndex] = coords.x + Math.random() / 2;
			pool.data[ayIndex] = coords.y;
			pool.data[byIndex] = coords.y + Math.random() / 3;
		});

		// partialLineIter(pool.start, pool.end, 
		// 	function(axIndex, ayIndex, azIndex, bxIndex, byIndex, bzIndex){
		// 		pool[axIndex] = coord.x;
		// 		pool[bxIndex] = coord.x + Math.random() / 2;
		// 		pool[ayIndex] = coord.y;
		// 		pool[byIndex] = coord.y + Math.random() / 3;
		// 	});
	}

	function tick(xOffset, yOffset, duration){
		window.requestAnimationFrame(function(){
			totalTime = new Date() - startTime;

			if(totalTime < duration){
				x += 0.001;
				sin(x, yOffset);
				// console.log('start');
				moveParticles(result);
			} else {
				// console.log('stop');
			}
			tick(xOffset, yOffset, duration);
		});
	}

	this.start = function(xOffset, yOffset, duration){
		startTime = new Date();
		x = xOffset;

		window.requestAnimationFrame(function(){
			tick(x, yOffset, duration);
		});
	}
}