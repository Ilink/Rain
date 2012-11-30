/*
I think this is a little different because I wont have a transformation matrix
that i am using. ??
*/

function Particles(verts, positionAttrib){
	var self = this;

	function makeBuffer(verts){
		var buffer = {};
		var glBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, glBuffer);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(verts), gl.DYNAMIC_DRAW);
		buffer.numItems = verts.length / 3;
		buffer.glBuffer = glBuffer;
		return buffer;
	}

	var glVerts = new Float32Array(verts);
	

	this.buffer = makeBuffer(verts);

	this.draw = function(){
		gl.lineWidth(2);
		gl.bindBuffer(gl.ARRAY_BUFFER, self.buffer.glBuffer);
		gl.vertexAttribPointer(positionAttrib, 3, gl.FLOAT, false, 0, 0);
		gl.drawArrays(gl.LINES, 0, this.buffer.numItems);
		// gl.drawArrays(gl.TRIANGLES, 0, 3);
	}
}