function Camera(){
	var $document = $(document);
	var self = this;
	var upVector = vec3.create([0.0, 1.0, 0.0]);
	var eyePoint = vec3.create([1.0, 1.0, -1.0]);
	var lookAtPoint = vec3.create([1.0, 1.0, -2.0]);

	this.viewMatrix = mat4.lookAt(eyePoint, lookAtPoint, upVector);

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
		mouse: 1
	};

	var prevMousePos = {
		x: 0,
		y: 0
	};

	// note that this doesnt update the viewMatrix
	function rotate(deg, axis){
		var frontDirection = vec3.create();
		vec3.subtract(lookAtPoint, eyePoint, frontDirection);
		vec3.normalize(frontDirection);
		var q = quat4.create();
		quat4.fromAngleAxis(deg, axis, q);
		quat4.multiplyVec3(q, frontDirection);
		lookAtPoint = vec3.create(eyePoint);
		vec3.add(lookAtPoint, frontDirection);
	}

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
			self.xforms.yaw = (e.screenX - prevMousePos.x) * self.speed.mouse;
			self.xforms.pitch = (e.screenY - prevMousePos.y) * self.speed.mouse;

			var frontDirection = vec3.create();
			var strafeDirection = vec3.create();
			vec3.subtract(lookAtPoint, eyePoint, frontDirection);
			vec3.normalize(frontDirection);
			vec3.cross(frontDirection, upVector, strafeDirection);
			vec3.normalize(strafeDirection);
			
			rotate(-self.xforms.yaw / 360.0, upVector);
			rotate(-self.xforms.pitch / 360.0, strafeDirection);
			self.viewMatrix = mat4.lookAt(eyePoint, lookAtPoint, upVector);

			prevMousePos.x = e.screenX;
			prevMousePos.y = e.screenY;
		});
	};
}


