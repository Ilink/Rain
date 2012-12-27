function Camera(){
	var $document = $(document);
	this.xforms = {
		pitch: 0.0,
		yaw: 0.0,
		x: 0.0,
		y: 0.0,
		z: 0.0
	}

	this.bindControls = function(){
		jwerty.key('up/w', function(){
		});
		jwerty.key('down/s', function(){
		});
		jwerty.key('left/a', function(){
		});
		jwerty.key('right/d', function(){
		});
	}
}