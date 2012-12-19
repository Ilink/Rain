<script id="sprite_fs" type="x-shader/fragment">
    precision mediump float;

    varying vec2 vTextureCoord;
    varying vec3 positionOut;
    uniform sampler2D uSampler;
    uniform float textureSize;

    void main(void) {
        float z = gl_FragCoord.z / gl_FragCoord.w;
        float zFactor = z * 2.0;

        // vec4 sample0,
        //   sample1,
        //   sample2,
        //   sample3;

        // float step = 0.5 / 100.0;
        // sample0 = texture2D(uSampler,
        //  vec2(vTextureCoord.x - step,
        //      vTextureCoord.y - step));
        // sample1 = texture2D(uSampler,
        //  vec2(vTextureCoord.x + step,
        //      vTextureCoord.y + step));
        // sample2 = texture2D(uSampler,
        //  vec2(vTextureCoord.x + step,
        //      vTextureCoord.y - step));
        // sample3 = texture2D(uSampler,
        //  vec2(vTextureCoord.x - step,
        //      vTextureCoord.y + step));
        // gl_FragColor = (sample0 + sample1 + sample2 + sample3) / 4.0;

        // can we scale blur size based upon size in terms of clip coords?
        vec4 sum = vec4(0.0);
        // float blurSize = 0.005;
        // float blurSize = 1.0 / (1024.0 / zFactor); // texture size
        float blurSize = 1.0 / (1024.0 / zFactor); // texture size
        sum += texture2D(uSampler, vTextureCoord - 4.0 * blurSize) * 0.05;
        sum += texture2D(uSampler, vTextureCoord - 3.0 * blurSize) * 0.09;
        sum += texture2D(uSampler, vTextureCoord - 2.0 * blurSize) * 0.12;
        sum += texture2D(uSampler, vTextureCoord - 1.0 * blurSize) * 0.15;
        sum += texture2D(uSampler, vTextureCoord                 ) * 0.16;
        sum += texture2D(uSampler, vTextureCoord + 1.0 * blurSize) * 0.15;
        sum += texture2D(uSampler, vTextureCoord + 2.0 * blurSize) * 0.12;
        sum += texture2D(uSampler, vTextureCoord + 3.0 * blurSize) * 0.09;
        sum += texture2D(uSampler, vTextureCoord + 4.0 * blurSize) * 0.05;

        // if(sum[0] < 1.0) {
        //     sum[0] = 0.0;
        //     sum[1] = 0.0;
        //     sum[2] = 0.0;
        // }
        gl_FragColor = sum;
        // gl_FragColor = texture2D(uSampler, vTextureCoord);
    }
</script>



