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


    	highp vec3 ambientLight = vec3(0.6, 0.6, 0.6);
		highp vec3 directionalLightColor = vec3(0.5, 0.5, 0.75);
		highp vec3 directionalVector = vec3(0.85, 0.8, 0.75);
		 
		// highp vec4 transformedNormal = normalMatrix * vec4(vertexNormal, 1.0);
		highp vec3 transformedNormal = normalMatrix * vertexNormal;
		 
		highp float directional = max(dot(transformedNormal.xyz, directionalVector), 0.0);
		vLightWeighting = ambientLight + (directionalLightColor * directional);





	    // vec3 transformedNormal = normalMatrix * vertexNormal;
     //    float directionalLightWeighting = max(dot(transformedNormal, vec3(0,1,0)), 0.0);
     //    // vLightWeighting = vec3(25,50,0) + directionalLightWeighting;
     //    vLightWeighting = vec3(directionalLightWeighting, directionalLightWeighting, directionalLightWeighting);
	}

</script>



// attribute highp vec3 aVertexNormal;
// attribute highp vec3 aVertexPosition;
// attribute highp vec2 aTextureCoord;

// uniform highp mat4 uNormalMatrix;
// uniform highp mat4 uMVMatrix;
// uniform highp mat4 uPMatrix;

// varying highp vec2 vTextureCoord;
// varying highp vec3 vLighting;

// void main(void) {
// 	gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);
// 	vTextureCoord = aTextureCoord;
	 
// 	// Apply lighting effect
	 
// 	highp vec3 ambientLight = vec3(0.6, 0.6, 0.6);
// 	highp vec3 directionalLightColor = vec3(0.5, 0.5, 0.75);
// 	highp vec3 directionalVector = vec3(0.85, 0.8, 0.75);
	 
// 	highp vec4 transformedNormal = uNormalMatrix * vec4(aVertexNormal, 1.0);
	 
// 	highp float directional = max(dot(transformedNormal.xyz, directionalVector), 0.0);
// 	vLighting = ambientLight + (directionalLightColor * directional);
// }