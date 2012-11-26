<script id="rain_fs" type="x-shader/fragment"> 

	/*
	This blends the result of the blur shader in with the laser shader.
	There could be a separate shader for this, but whatever. Ill do that later.
	*/

	precision mediump float;
	uniform vec2 resolution;
	varying vec2 vertColorOut;  // these happen to also be texture coordinates!
	uniform sampler2D uSampler; 

	void main( void ) {
		vec2 position = vertColorOut.xy;
		float red = position.y;
		float green = position.y;
		float blue = position.y;
		float alpha = sin(3.0*position.y);

		vec4 sample = texture2D(uSampler, vec2(vertColorOut.s, vertColorOut.t));
		sample[3] = alpha;
		gl_FragColor = sample;
	}

</script>