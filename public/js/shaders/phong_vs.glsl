<script id="phong_vs" type="x-shader/vertex"> 
	precision mediump float;
	// attribute vec2 vertColor;

	uniform mat4 uMVMatrix;
	uniform mat4 uPMatrix;
	uniform mat3 normalMatrix;

	//todo: use the uniforms instead of hardcoded values
	// uniform vec3 uAmbientColor;
	// uniform vec3 uLightingDirection;
	// uniform vec3 uDirectionalColor;

	attribute vec3 vertexNormal;
	varying vec4 vPosition;
	attribute vec3 position;
	varying vec3 vNormal;

	// attribute vec3 aVertexPosition;

	varying vec3 vLightWeighting;
	varying vec3 vLightDirection;

	void main(void) {
		vPosition = uMVMatrix * vec4(position, 1.0);
		gl_Position = uPMatrix * vPosition;
		
		//todo: use the uniforms instead of these hardcoded values
		vec3 ambientLight = vec3(0.85, 0.5, 0.5);
		vec3 directionalLightColor = vec3(0.5, 0.5, 0.75);
		vec3 directionalVector = vec3(0.85, 0.8, 0.75);
		vLightDirection = directionalVector;
		
		vec3 transformedNormal = normalMatrix * vertexNormal;
		vNormal = transformedNormal;
		
		// we clamp to 0 because it doesn't make sense to have a negative value for the amount of light
		float directional = max(dot(transformedNormal.xyz, directionalVector), 0.0); // this is zero, the normals must be wrong
		// if(directional == 0.0) directional = 1.0;
		vLightWeighting = ambientLight + directional;
		// vLightWeighting = ambientLight + (directionalLightColor * directional);
	}

</script>