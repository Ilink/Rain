/*
Renderer
Default one - this handles spirtes and the background.
*/

function BgRenderer(gl, shaders){
    RendererBase.call(this, {gl: gl, shaders: shaders});

    var self = this;
    var mvMatrix = mat4.create();
    var textureCoordAttribute;
    var vertColor;
    var position;
    var gradient_coords =  [
        0.0, 0.0,
        0.0, 1.0,
        1.0, 0.0,
        1.0, 1.0
    ];
    var resolution = gl.getUniformLocation(self.shaderProgram, 'resolution');

    function setup_shaders() {
        position = gl.getAttribLocation(self.shaderProgram, "position");
        if(position > -1)
            gl.enableVertexAttribArray(position);
    }

    function build(dim, pMatrix, pMatrixInv){
        $.each(self.geo, function(i, geo){
            gl.uniform2f(resolution, dim.width, dim.height);
            
            gradientBuffer.set();
            gl.bindBuffer(gl.ARRAY_BUFFER, geo.glBuffer);
            gl.vertexAttribPointer(position, geo.itemSize, gl.FLOAT, false, 0, 0);
            gl.drawArrays(gl.TRIANGLE_STRIP, 0, geo.numItems);
        });
    }

    var gradientBuffer = new Buffer(gl, gradient_coords, 2, position);
    setup_shaders();

    this.render = function(time, dim, pMatrix, pMatrixInv) {
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
        build(dim, pMatrix, pMatrixInv);
    };
}

BgRenderer.prototype = new RendererBase();
BgRenderer.prototype.constructor = BgRenderer;