function Mouse(){
	var self = this;
	var mouseReady = true;
	var $document = $(document);
	var coords = {};

	this.track = function(callback, duration){
		$(document).mousemove(function(e){
			if(mouseReady){
				mouseReady = false;
				var timer = window.setTimeout(function(){
					coords.x = e.pageX;
					coords.y = e.pageY;
					self.normalizeCoords(coords);
					callback.call(this, coords);
					mouseReady = true;
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