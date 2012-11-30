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

    
    function setup_shaders() {
        position = gl.getAttribLocation(self.shaderProgram, "position");
        if(position > -1)
            gl.enableVertexAttribArray(position);
    }

    function build(dim, pMatrix, pMatrixInv){
        // gl.uniform2f(resolution, dim.width, dim.height);
        self.__setDefaultUniforms(self.shaderProgram, pMatrix, mvMatrix, dim);
        gl.vertexAttribPointer(position, 3.0, gl.FLOAT, false, 0, 0);
        particles.draw();
    }

    setup_shaders();
    var particles = new Particles(makeParticles(1000), position);

    function makeParticles(num){
        var particlePositions = [];
        for(var i = 0; i < num; i++){
            // particlePositions.push(Math.random()*100, Math.random()*100, -1*Math.random()*3);
            particlePositions.push(Math.random()*2 -1, Math.random()*2 -1, Math.random());
        }
        return particlePositions;
    }

    this.render = function(time, dim, pMatrix, pMatrixInv) {
        // gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
        build(dim, pMatrix, pMatrixInv);
    };
}

ParticlesRenderer.prototype = new RendererBase();
ParticlesRenderer.prototype.constructor = ParticlesRenderer;