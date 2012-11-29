/*
I think this is a little different because I wont have a transformation matrix
that i am using. ??
*/

function Particles(verts){
	var self = this;

	function makeBuffer(verts){
		var buffer = {};
		var glBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, glBuffer);
		// gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(verts), gl.DYNAMIC_DRAW);
		buffer.numItems = verts.length;
		buffer.glBuffer = glBuffer;
		return buffer;
	}

	var glVerts = new Float32Array(verts);
	

	this.buffer = makeBuffer(verts);

	this.draw = function(){
		gl.lineWidth(2);
		gl.bindBuffer(gl.ARRAY_BUFFER, self.buffer.glBuffer);
		gl.bufferData(gl.ARRAY_BUFFER, glVerts, gl.DYNAMIC_DRAW);

		// gl.vertexAttribPointer(aPosition, self.geo.itemSize, gl.FLOAT, false, 0, 0);
		// gl.drawArrays(gl.TRIANGLE_STRIP, 0, self.geo.numItems);
		gl.drawArrays(gl.LINES, 0, self.buffer.numItems-1);
	}
}