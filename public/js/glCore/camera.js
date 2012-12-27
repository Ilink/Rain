function Camera(){
	var $document = $(document);
	var self = this;

	this.xforms = {
		pitch: 0.0,
		yaw: 0.0,
		x: 0.0,
		y: 0.0,
		z: 0.0
	};

	this.speed = {
		x: 1,
		y: 1,
		z: 1,
		mouse: 0.01
	};

	var prevMousePos = {
		x: 0,
		y: 0
	};

	this.bindControls = function(){
		jwerty.key('up/w', function(){
			self.xforms.z += self.speed.z;
		});

		jwerty.key('down/s', function(){
			self.xforms.z -= self.speed.z;
		});

		jwerty.key('left/a', function(){
			self.xforms.x += self.speed.x;
		});

		jwerty.key('right/d', function(){
			self.xforms.x -= self.speed.x;
		});

		$document.mousemove(function(e){
			self.xforms.yaw += (e.screenX - prevMousePos.x) * self.speed.mouse;
			self.xforms.pitch += (e.screenY - prevMousePos.y) * self.speed.mouse;
			
			prevMousePos.x = e.screenX;
			prevMousePos.y = e.screenY;
		});
	};
}