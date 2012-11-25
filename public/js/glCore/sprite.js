/*
Sprite
Uses texture and buffer
Can be used as an RTT thing. Just provide a texutre instead of a name. 
*/

function Sprite(source, verts, uSampler, aTextureCoord, aPosition){
	var self = this, texture, name;
	if(typeof source !== 'string'){
		texture = name;
	} else {
		name = source;
		texture = new Texture(name, uSampler, aTextureCoord);
	}

	this.glGeoBuffer = makeGeoBuffer(verts, 3);
	
	function setUv(){

	}

	this.draw = function(){
		gl.bindBuffer(gl.ARRAY_BUFFER, self.geo.glBuffer);
		gl.vertexAttribPointer(aPosition, geo.itemSize, gl.FLOAT, false, 0, 0);
		gl.drawArrays(gl.TRIANGLE_STRIP, 0, geo.numItems);
	};
}