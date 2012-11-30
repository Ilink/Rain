<script id="particles_vs" type="x-shader/vertex">
	attribute vec3 position;
	uniform mat4 uMVMatrix; // combined modelview projection matrix
	uniform mat4 uPMatrix; // project

	void main(void) {
	    // gl_Position = uPMatrix * uMVMatrix * vec4(position, 1.0);
	    gl_Position = vec4(position, 1.0);
	}
</script>