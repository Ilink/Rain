/*
Renderer
Default one - this handles spirtes and the background.
*/

function ParticlesRenderer(shaders, particleVerts){
    RendererBase.call(this, {gl: gl, shaders: shaders});

    var self = this;
    var mvMatrix = mat4.create();
    var vertColor;
    var position;
    var resolution = gl.getUniformLocation(self.shaderProgram, 'resolution');

    
    function setup_shaders() {
        position = gl.getAttribLocation(self.shaderProgram, "position");
        if(position > -1)
            gl.enableVertexAttribArray(position);
    }

    setup_shaders();
    var particles = new Particles(particleVerts, position);

    this.render = function(time, dim, pMatrix, pMatrixInv) {
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
        // gl.uniform2f(resolution, dim.width, dim.height);
        self.setDefaultUniforms(self.shaderProgram, pMatrix, mvMatrix, dim);
        particles.draw();
    };

    $(document).on('engineTick', function(e, time, dim, pMatrix, pMatrixInv){
        gl.useProgram(self.shaderProgram);
        self.render(time, dim, pMatrix, pMatrixInv);
    });
}

ParticlesRenderer.prototype = new RendererBase();
ParticlesRenderer.prototype.constructor = ParticlesRenderer;