<script id="rain_fs" type="x-shader/fragment"> 

	/*
	This blends the result of the blur shader in with the laser shader.
	There could be a separate shader for this, but whatever. Ill do that later.
	*/

	precision mediump float;
	uniform vec2 resolution;
	varying vec2 vertColorOut;  // these happen to also be texture coordinates!
	uniform sampler2D uSampler; 
	const float fog_density = 0.05;

	void main( void ) {
		vec2 position = vertColorOut.xy;
		float red = position.y;
		float green = position.y;
		float blue = position.y;
		float alpha = sin(3.0*position.y);

		vec4 sample = texture2D(uSampler, vec2(vertColorOut.s, vertColorOut.t));
		sample[3] = alpha;

		// Fog
		const float LOG2 = 20.442695;
		// Is the W coord related to the transform part?
		float z = gl_FragCoord.z / gl_FragCoord.w;

		// -fogdensity^2 * z^2 * log(2) => why?
		float fogFactor = exp2( -fog_density * 
						   fog_density * 
						   z * 
						   z * 
						   LOG2 );
		fogFactor = clamp(fogFactor, 0.0, 1.0);

		vec4 fog_color = vec4(1,1,1,1.0);
		vec2 _position = -1.0 + gl_FragCoord.xy / resolution.xy;
		red = abs( sin( _position.y * _position.y / 5.0 ) );
		green = abs( sin( _position.y * _position.y / 4.0 ) );
		blue = abs( sin( _position.y * _position.y / 3.0 ) );

		vec4 final_color;
		// final_color.rgba = vec4(red, gree, blue, 1.0);
		// final_color.rgba = vec4(0.0, 0.3, 1.0, 1.0);
		final_color.rgba = vec4(0.3, 0.3, 0.5, 0.8);

		// gl_FragColor = mix(fog_color, final_color, fogFactor );
		vec4 fogMix = mix(fog_color, sample, fogFactor);
		gl_FragColor = mix(fog_color, final_color, 0.5 );
		gl_FragColor = final_color;
	}

</script>