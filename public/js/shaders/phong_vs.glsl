<script id="phong_vs" type="x-shader/vertex"> 
 	precision mediump float;
	attribute vec3 position;
	// attribute vec2 vertColor;

	uniform mat4 uMVMatrix;
	uniform mat4 uPMatrix;

    // attribute vec3 aVertexPosition;
    attribute vec3 vertexNormal;
    uniform mat3 normalMatrix;
    // uniform vec3 uAmbientColor;
    // uniform vec3 uLightingDirection;
    // uniform vec3 uDirectionalColor;

    varying vec3 vLightWeighting;

	void main(void) {
	    gl_Position = uPMatrix * uMVMatrix * vec4(position, 1.0);
	    vec3 transformedNormal = normalMatrix * vertexNormal;
        float directionalLightWeighting = max(dot(transformedNormal, vec3(0,1,0)), 0.0);
        vLightWeighting = vec3(255,50,0) + directionalLightWeighting;
	}

</script>