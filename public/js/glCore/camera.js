function Camera(){
	var $document = $(document);
	var self = this;
	var upVector = vec3.create([0.0, 1.0, 0.0]);
	var eyePoint = vec3.create([-10.0, 1.0, -1.0]);
	var lookAtPoint = vec3.create([-10.0, 1.0, -10.0]);
	var initialClick = {};

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
		z: 0.75,
		mouse: 0.01
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

	// front direction is just the direction the camera is facing
	function forwardBack(z){
		var frontDirection = vec3.create();
		vec3.subtract(lookAtPoint, eyePoint, frontDirection);
		vec3.normalize(frontDirection);
		vec3.scale(frontDirection, z);
		vec3.add(eyePoint, frontDirection);
		vec3.add(lookAtPoint, frontDirection);
		self.viewMatrix = mat4.lookAt(eyePoint, lookAtPoint, upVector);
	}

	// old
	// function otherRotate(){
	// 	var trans = vec3.create(xforms.x, xforms.y, xforms.z),
	// 	    // camRot = mat3.create(),
	// 	    camRot = vec3.normalize(vec3.create([-xforms.yaw, -xforms.pitch, -1.0])),
	// 	    pos = vec3.create();

	// 	mat4.rotate(mvMatrix, degToRad(xforms.pitch), [1, 0, 0]);
	// 	mat4.rotate(mvMatrix, degToRad(xforms.yaw), [0, 1, 0]);
	// 	// mat4.toMat3(mvMatrix, camRot);

	// 	// mat3.multiplyVec3(camRot, [1,1,1], pos);
	// 	// vec3.normalize(pos);
	// 	vec3.add(camRot, [xforms.x, xforms.y, xforms.z]);

	// 	mat4.translate(mvMatrix, vec3.scale(camRot,10));
	// }

	this.bindControls = function(){
		jwerty.key('up/w', function(){
			self.xforms.z += 1;
			forwardBack(1);
		});

		jwerty.key('down/s', function(){
			self.xforms.z -= 1;
			forwardBack(-1);
		});

		jwerty.key('left/a', function(){
			self.xforms.x += self.speed.x;
		});

		jwerty.key('right/d', function(){
			self.xforms.x -= self.speed.x;
			
		});

		$(document).on('draginit', function(e){
			initialClick.x = e.offsetX;
			initialClick.y = e.offsetY;
			initialClick.yaw = self.xforms.yaw;
			initialClick.pitch = self.xforms.pitch;

			prevMousePos.x = e.screenX;
			prevMousePos.y = e.screenY;
		});

		$document.drag(function(e){
			var magX = e.screenX - initialClick.x;
			var magY = e.screenY - initialClick.y;

			self.xforms.yaw = e.screenX - prevMousePos.x;
			self.xforms.pitch = e.screenY - prevMousePos.y;
			
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


