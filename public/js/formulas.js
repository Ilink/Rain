/*
starting coordinates
time until we stop
equation


think of the equation as manipulating points
later we can map those points out as actual lines
	-> or just keep them as points


*/

function SineWave(){
	var result = {};
	var startTime, totalTime;
	var x;

	function sin(x, yOffset){
		result.y = (Math.sin(x) + yOffset);
		result.x = x;
	}

	function moveParticles(block, coords){
		partialLineIter(block.start, block.end, function(axIndex, ayIndex, azIndex, bxIndex, byIndex, bzIndex){
			block.data[axIndex] = coords.x;
			block.data[bxIndex] = coords.x + Math.random() / 2;
			block.data[ayIndex] = coords.y;
			block.data[byIndex] = coords.y + Math.random() / 3;
		});
	}

	function tick(block, xOffset, yOffset, duration){
		window.requestAnimationFrame(function(){
			totalTime = new Date() - startTime;

			if(totalTime < duration){
				x += 0.001;
				sin(x, yOffset);
				moveParticles(block, result);
			} else {
				// stop
			}
			tick(block, xOffset, yOffset, duration);
		});
	}

	this.start = function(block, xOffset, yOffset, duration){
		startTime = new Date();
		x = xOffset;

		window.requestAnimationFrame(function(){
			tick(block, x, yOffset, duration);
		});
	}
}