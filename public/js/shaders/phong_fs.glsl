<script id="phong_fs" type="x-shader/vertex"> 
 	precision mediump float;
	attribute vec3 position;
	attribute vec2 vertColor;

	uniform mat4 uMVMatrix;
	uniform mat4 uPMatrix;

	varying vec2 vertColorOut; // these happen to also be texture coordinates!

	void main(void) {
	    vec3 transformedNormal = uNMatrix * aVertexNormal;
		float directionalLightWeighting = max(dot(transformedNormal, uLightingDirection), 0.0);
		vLightWeighting = uAmbientColor + uDirectionalColor * directionalLightWeighting;
	}

</script>
