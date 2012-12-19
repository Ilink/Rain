<script id="phong_fs" type="x-shader/vertex"> 
 	precision mediump float;

    varying vec3 vLightWeighting;

    void main(void) {
        vec3 color = vec3(0.5, 0.2, 0.1);
        gl_FragColor = vec4(color*vLightWeighting, 1.0);
    }

</script>
