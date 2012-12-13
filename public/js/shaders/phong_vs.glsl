<script id="phong_vs" type="x-shader/vertex"> 
 	precision mediump float;
	attribute vec3 position;
	attribute vec2 vertColor;

	uniform mat4 uMVMatrix;
	uniform mat4 uPMatrix;

	varying vec2 vertColorOut; // these happen to also be texture coordinates!

	void main(void) {
	    gl_Position = uPMatrix * uMVMatrix * vec4(position, 1.0);
	    vertColorOut = vertColor;
	}

</script>