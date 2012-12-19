<script id="rain_vs" type="x-shader/vertex"> 
 
	attribute vec3 position;
	attribute vec2 aTextureCoord;
	varying vec2 vTextureCoord;
	varying vec3 positionOut;

	void main(void) {
	    gl_Position = vec4(position, 1.0);
	    vTextureCoord = aTextureCoord;
	    positionOut = position;
	}

</script>