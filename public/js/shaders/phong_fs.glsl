<script id="phong_fs" type="x-shader/vertex"> 
 	precision mediump float;

    // varying vec2 vTextureCoord;
    varying vec3 vLightWeighting;

    // uniform sampler2D uSampler;

    void main(void) {
        // vec4 textureColor = texture2D(uSampler, vec2(vTextureCoord.s, vTextureCoord.t));
        gl_FragColor = vec4(vLightWeighting, 1.0);
        // gl_FragColor = vec4(0.5,0.0,0.1, 1.0);
    }

</script>
