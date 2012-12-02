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

    function build(dim, pMatrix, pMatrixInv){
        // gl.uniform2f(resolution, dim.width, dim.height);
        self.__setDefaultUniforms(self.shaderProgram, pMatrix, mvMatrix, dim);
        particles.draw();
    }

    setup_shaders();
    var particles = new Particles(particleVerts, position);

    var formulas = [
        {
            eq: function(){

            }
        }
    ];

    function applyTmats(){

    }

    this.render = function(time, dim, pMatrix, pMatrixInv) {
        // gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
        build(dim, pMatrix, pMatrixInv);
    };
}

ParticlesRenderer.prototype = new RendererBase();
ParticlesRenderer.prototype.constructor = ParticlesRenderer;