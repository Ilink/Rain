<script id="phong_fs" type="x-shader/vertex"> 
 	precision mediump float;

    // varying vec2 vTextureCoord;
    varying vec3 vLightWeighting;

    // uniform sampler2D uSampler;

    void main(void) {
        // vec4 textureColor = texture2D(uSampler, vec2(vTextureCoord.s, vTextureCoord.t));
        // gl_FragColor = vec4(vLightWeighting, 1.0);
        vec3 color = vec3(0.5, 0.1, 0.1);
        gl_FragColor = vec4(0.5*vLightWeighting, 1.0);
        // vec4(color,1.0);
    }

</script>
