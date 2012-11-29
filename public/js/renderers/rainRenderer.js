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
    var blurSampler;
    var gradientCoords =  [
        0.0, 0.0,
        0.0, 1.0,
        1.0, 0.0,
        1.0, 1.0
    ];
    var laserShaderInputs = {};
    var rttShaderInputs = {};
    var rttSize = 1024;
    var gradientBuffer = makeBuffer(gradientCoords, 2);

    var fbo = new Fbo(rttSize);
    var rttProgram = buildShaderProgram(rttShaders);
    
    function setup_main_shader() {
        laserShaderInputs.position = gl.getAttribLocation(self.shaderProgram, "position");
        if(laserShaderInputs.position > -1)
            gl.enableVertexAttribArray(laserShaderInputs.position);

        laserShaderInputs.vertColor = gl.getAttribLocation(self.shaderProgram, "vertColor");
        if(laserShaderInputs.vertColor > -1)
            gl.enableVertexAttribArray(laserShaderInputs.vertColor);

        laserShaderInputs.blurSampler = gl.getUniformLocation(self.shaderProgram, "blurSampler");
        if(laserShaderInputs.blurSampler > -1)
            gl.enableVertexAttribArray(laserShaderInputs.blurSampler);
    }

    function setup_rtt_shader(){
        rttShaderInputs.position = gl.getAttribLocation(rttProgram, "position");
        if(rttShaderInputs.position > -1)
            gl.enableVertexAttribArray(rttShaderInputs.position);

        rttShaderInputs.textureCoord = gl.getAttribLocation(rttProgram, "aTextureCoord");
        if(rttShaderInputs.textureCoord > -1)
            gl.enableVertexAttribArray(rttShaderInputs.textureCoord);

        rttShaderInputs.sampler = gl.getUniformLocation(rttProgram, "uSampler");
        if(rttShaderInputs.sampler > -1)
            gl.enableVertexAttribArray(rttShaderInputs.sampler);

        rttShaderInputs.textureSize = gl.getUniformLocation(rttProgram, "textureSize");
    }

    function build(dim, pMatrix, pMatrixInv){
        $.each(self.geo, function(i, geo){
            mat4.identity(mvMatrix); // reset the position for each piece of geometry
            mat4.translate(mvMatrix, geo.trans);

            self.__setDefaultUniforms(self.shaderProgram, pMatrix, mvMatrix, dim);

            // Textures
            if(typeof geo.texture !== 'undefined'){
                geo.texture.set();
            }

            gl.bindBuffer(gl.ARRAY_BUFFER, geo.glBuffer);
            gl.vertexAttribPointer(laserShaderInputs.position, geo.itemSize, gl.FLOAT, false, 0, 0);

            gl.bindBuffer(gl.ARRAY_BUFFER, gradientBuffer.glBuffer);
            gl.vertexAttribPointer(laserShaderInputs.vertColor, gradientBuffer.itemSize, gl.FLOAT, false, 0, 0);

            gl.uniform1i(rttShaderInputs.textureSize, rttSize);

            gl.drawArrays(gl.TRIANGLE_STRIP, 0, geo.numItems);
        });
    }

    setup_main_shader();
    setup_rtt_shader();
    var rtt = new Sprite(fbo.glTexture, geo_builder.fullScreenQuad, rttShaderInputs.sampler, rttShaderInputs.textureCoord, rttShaderInputs.position);
    var blurResult = new Texture(fbo.glTexture, laserShaderInputs.blurSampler, vertColor);

    this.render = function(time, dim, pMatrix, pMatrixInv) {
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
        
        fbo.activate();
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        build(dim, pMatrix, pMatrixInv);
        fbo.deactivate();
        gl.useProgram(rttProgram);
        rtt.draw();
        gl.useProgram(self.shaderProgram);
        // build(dim, pMatrix, pMatrixInv);
    };
}

RainRenderer.prototype = new RendererBase();
RainRenderer.prototype.constructor = RainRenderer;