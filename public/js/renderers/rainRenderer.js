/*
Renderer
Default one - this handles spirtes and the background.
*/

function RainRenderer(gl, shaders, rttShaders){
    RendererBase.call(this, {gl: gl, shaders: shaders});

    var self = this;
    var mvMatrix = mat4.create();
    var textureCoordAttribute;
    var vertColor;
    var position;
    var rttUSampler;
    var rttATextureCoord;
    var rttAPosition;
    var gradient_coords =  [
        0.0, 0.0,
        0.0, 1.0,
        1.0, 0.0,
        1.0, 1.0
    ];
    var fbo = new Fbo(256);
    var rttProgram = buildShaderProgram(rttShaders);
    
    function setup_main_shader() {
        position = gl.getAttribLocation(self.shaderProgram, "position");
        if(position > -1)
            gl.enableVertexAttribArray(position);

        textureCoordAttribute = gl.getAttribLocation(self.shaderProgram, "aTextureCoord");
        if(textureCoordAttribute > -1)
            gl.enableVertexAttribArray(textureCoordAttribute);

        vertColor = gl.getAttribLocation(self.shaderProgram, "vertColor");
        if(vertColor > -1)
            gl.enableVertexAttribArray(vertColor);
    }

    function setup_rtt_shader(){
        rttAPosition = gl.getAttribLocation(rttProgram, "position");
        if(rttAPosition > -1)
            gl.enableVertexAttribArray(rttAPosition);

        rttATextureCoord = gl.getAttribLocation(rttProgram, "aTextureCoord");
        if(rttATextureCoord > -1)
            gl.enableVertexAttribArray(rttATextureCoord);

        rttUSampler = gl.getUniformLocation(rttProgram, "uSampler");
        if(rttUSampler > -1)
            gl.enableVertexAttribArray(rttUSampler);
    }

    // this stays per-renderer
    function build(dim, pMatrix, pMatrixInv){
        fbo.activate();
        $.each(self.geo, function(i, geo){
            mat4.identity(mvMatrix); // reset the position for each piece of geometry
            mat4.translate(mvMatrix, geo.trans);
            mat4.rotate(mvMatrix, 40, [0,0,1], mvMatrix);

            self.__setDefaultUniforms(self.shaderProgram, pMatrix, mvMatrix, dim);

            // Textures
            if(typeof geo.texture !== 'undefined'){
                geo.texture.set();
            }

            gl.bindBuffer(gl.ARRAY_BUFFER, geo.glBuffer);
            gl.vertexAttribPointer(position, geo.itemSize, gl.FLOAT, false, 0, 0);
            gl.drawArrays(gl.TRIANGLE_STRIP, 0, geo.numItems);
        });
        fbo.deactivate();
        gl.useProgram(rttProgram);
        rtt.draw();
    }

    setup_main_shader();
    setup_rtt_shader();
    // var rtt = new Rtt(fbo.glTexture, rttSampler, position);
    var rtt = new Sprite(fbo.glTexture, geo_builder.fullScreenQuad, rttUSampler, rttATextureCoord, rttAPosition);

    this.render = function(time, dim, pMatrix, pMatrixInv) {
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
        build(dim, pMatrix, pMatrixInv);
    };
}

RainRenderer.prototype = new RendererBase();
RainRenderer.prototype.constructor = RainRenderer;