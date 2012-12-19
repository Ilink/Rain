function Mouse(){
	var self = this;
	var mouseReady = true;
	var $document = $(document);
	var coords = {};
	var currentPosition = {x:0, y:0, z:0}, prevPosition = {x:0, y:0, z:0};
	var velocityVec = vec3.create();

	function setVelocityVector(pointA, pointB){
		velocityVec.set([pointB.x - pointA.x, pointB.y - pointA.y, 0]);
	}

	this.track = function(callback, duration){
		$(document).mousemove(function(e){
			if(mouseReady){
				mouseReady = false;
				var timer = window.setTimeout(function(){
					currentPosition.x = e.pageX;
					currentPosition.y = e.pageY;
					self.normalizeCoords(currentPosition);
					setVelocityVector(currentPosition, prevPosition);
					callback.call(this, currentPosition, velocityVec);

					mouseReady = true;
					prevPosition.x = currentPosition.x;
					prevPosition.y = currentPosition.y;
				}, duration);
			}
		});
	}

	this.normalizeCoords = function(coords){
		var width = $document.width();
		var height = $document.height();
		coords.x = coords.x / width * 2 - 1;
		coords.y = (coords.y / height * 2 - 1) * -1;
	}
}