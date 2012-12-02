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
	var velocity;
	var initialPosition = {};

	function sin(x){
		result.y = (Math.sin(5 * (initialPosition.x - x)) + initialPosition.y);
		// result.y = initialPosition.y;
		result.x = x;
	}

	/*
	the particles need a length
	a position (we got that)
	a direction vector
	*/
	function moveParticles(block, coords, velocityVec){
		velocity = vec3.length(velocityVec);
		partialLineIter(block.start, block.end, function(axIndex, ayIndex, azIndex, bxIndex, byIndex, bzIndex){
			block.data[axIndex] = coords.x;
			block.data[bxIndex] = coords.x + 0.1;
			block.data[ayIndex] = coords.y;
			block.data[byIndex] = coords.y + 0.1;
		});
	}

	function setInitialPosition(block){
		partialLineIter(block.start, block.end, function(axIndex, ayIndex, azIndex, bxIndex, byIndex, bzIndex){
			block.data[axIndex] = initialPosition.x + Math.random() / 10;
			block.data[bxIndex] = block.data[axIndex] + Math.random() / 10;
			block.data[ayIndex] = initialPosition.y + Math.random() / 10;
			block.data[byIndex] = block.data[byIndex] + Math.random() / 10;
		});
	}

	function tick(block, xOffset, yOffset, duration, velocityVec){

		window.requestAnimationFrame(function(){
			totalTime = new Date() - startTime;

			if(totalTime < duration){
				x += 0.005;
				sin(x, yOffset);
				moveParticles(block, result, velocityVec);
			} else {
				/* 
				currently this is a problem?
				the free might take place too quickly
				or it is using the latest, not the last
				*/
				block.free();
			}
			tick(block, xOffset, yOffset, duration, velocityVec);
		});
	}

	this.start = function(block, xOffset, yOffset, duration, velocityVec){
		startTime = new Date();
		x = xOffset;
		initialPosition.x = x;
		initialPosition.y = yOffset;
		setInitialPosition(block);

		window.requestAnimationFrame(function(){
			tick(block, x, yOffset, duration, velocityVec);
		});
	}
}