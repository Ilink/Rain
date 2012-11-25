<script id="sprite_fs" type="x-shader/fragment">
	precision mediump float;

	varying vec2 vTextureCoord;
	uniform sampler2D uSampler;

	void main(void) {
	    // gl_FragColor = texture2D(uSampler, vec2(vTextureCoord.s, vTextureCoord.t));

	    vec4 sample0,
	    	 sample1,
	   		 sample2,
	    	 sample3;

	    float step = 0.5 / 100.0;
	    sample0 = texture2D(uSampler,
	    	vec2(vTextureCoord.x - step,
	    		vTextureCoord.y - step));
	    sample1 = texture2D(uSampler,
	    	vec2(vTextureCoord.x + step,
	    		vTextureCoord.y + step));
	    sample2 = texture2D(uSampler,
	    	vec2(vTextureCoord.x + step,
	    		vTextureCoord.y - step));
	    sample3 = texture2D(uSampler,
	    	vec2(vTextureCoord.x - step,
	    		vTextureCoord.y + step));
	    gl_FragColor = (sample0 + sample1 + sample2 + sample3) / 4.0; 
	}
</script>