/*
Render-to-texture

Takes a texture that is created for/by a framebuffer.
Generates a mipmap for the texture.
Displays the texture on a fullscreen quad
*/

function Rtt(texture, sampler, attr){
	var self = this;
	// var quad = new Geo(gl, geoPresets.fullScreenQuad);
	// var quad = new Buffer(gl, geoPresets.fullScreenQuad, 3, attr);
	var quadBuffer = makeGeoBuffer(geoPresets.fullScreenQuad, 3);

	var UVcoords = [
	    0.0, 0.0,
	    0.0, 1.0,
	    1.0, 0.0,
	    1.0, 1.0
	];

	// generate mipmaps
	function setup(){
		gl.activeTexture(gl.TEXTURE0);
		gl.bindTexture(gl.TEXTURE_2D, texture);
		gl.generateMipmap(gl.TEXTURE_2D);
		gl.bindTexture(gl.TEXTURE_2D, null);
	}

	setup();

	function initBuffer(verts){
	    var texture_coord_buffer = gl.createBuffer();
	    gl.bindBuffer(gl.ARRAY_BUFFER, texture_coord_buffer);
	    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(verts), gl.STATIC_DRAW);
	    texture_coord_buffer.itemSize = 2;
	    texture_coord_buffer.numItems = 4;
	    return texture_coord_buffer;
	}

	this.glUVBuffer = initBuffer(UVcoords);
	this.glTexture = gl.createTexture();
	
	this.draw = function(){
		gl.activeTexture(gl.TEXTURE0);
		gl.bindTexture(gl.TEXTURE_2D, texture);
		gl.uniform1i(sampler, 0);

		gl.bindBuffer(gl.ARRAY_BUFFER, self.glUVBuffer);
		gl.vertexAttribPointer(attr, self.glUVBuffer.itemSize, gl.FLOAT, false, 0, 0);

		// draw
		gl.bindBuffer(gl.ARRAY_BUFFER, quadBuffer);
		gl.vertexAttribPointer(attr, quadBuffer.itemSize, gl.FLOAT, false, 0, 0);
		gl.drawArrays(gl.TRIANGLE_STRIP, 0, quadBuffer.numItems);
	}
}