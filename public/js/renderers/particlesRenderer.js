/*
Renderer
Default one - this handles spirtes and the background.
*/

function ParticlesRenderer(shaders){
    RendererBase.call(this, {gl: gl, shaders: shaders});

    var self = this;
    var mvMatrix = mat4.create();
    var vertColor;
    var position;
    var resolution = gl.getUniformLocation(self.shaderProgram, 'resolution');

    var particles = new Particles([1,2,3,3,4,5]);
    
    function setup_shaders() {
        position = gl.getAttribLocation(self.shaderProgram, "position");
        if(position > -1)
            gl.enableVertexAttribArray(position);
    }

    function build(dim, pMatrix, pMatrixInv){
        gl.uniform2f(resolution, dim.width, dim.height);
        particles.draw();
    }

    setup_shaders();

    this.render = function(time, dim, pMatrix, pMatrixInv) {
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
        build(dim, pMatrix, pMatrixInv);
    };
}

BgRenderer.prototype = new RendererBase();
BgRenderer.prototype.constructor = BgRenderer;