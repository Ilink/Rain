/*
Sprite
Uses texture and buffer
Can be used as an RTT thing. Just provide a texutre instead of a name. 
*/

function Sprite(source){
	var self = this, texture, name;
	if(typeof source !== 'string'){
		texture = name;
	} else {
		name = source;
		// texture = new Texture();
	}

	this.draw = function(){

	};

	this.glUVBuffer;
	this.glGeoBUffer;

}