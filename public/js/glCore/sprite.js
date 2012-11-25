/*
Sprite
Uses texture and buffer
Can be used as an RTT thing. Just provide a texutre instead of a name. 
*/

function Sprite(source, verts, uSampler, aTextureCoord, aPosition){
	var self = this, texture, name, glTexture;
	texture = new Texture(source, uSampler, aTextureCoord);

	this.geo = makeGeoBuffer(verts, 3);

	this.draw = function(){
		texture.set();
		
		// seutp & draw the quad
		gl.bindBuffer(gl.ARRAY_BUFFER, self.geo.glBuffer);
		gl.vertexAttribPointer(aPosition, self.geo.itemSize, gl.FLOAT, false, 0, 0);
		gl.drawArrays(gl.TRIANGLE_STRIP, 0, self.geo.numItems);
	};
}