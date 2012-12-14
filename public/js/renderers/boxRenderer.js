/*
Box Renderer
*/

function BoxRenderer(shaders, textures){
    RendererBase.call(this, {shaders: shaders});

    var self = this;
    var mvMatrix = mat4.create();
    var textureCoordAttribute;
    var vertColor;
    var position;
    var normalMatrix = mat3.create();
    
    function setup_shaders() {
        position = gl.getAttribLocation(self.shaderProgram, "position");
        if(position > -1)
            gl.enableVertexAttribArray(position);

        textureCoordAttribute = gl.getAttribLocation(self.shaderProgram, "aTextureCoord");
        if(textureCoordAttribute > -1)
            gl.enableVertexAttribArray(textureCoordAttribute);

        normalMatrixU = gl.getUniformLocation(self.shaderProgram, "normalMatrix");

        vertexNormal = gl.getUniformLocation(self.shaderProgram, "vertexNormal");
        if(vertexNormal > -1)
            gl.enableVertexAttribArray(vertexNormal);
    }

    var cube = geoPresets.box(1,1,1);
    console.log(cube.indexesBuffer.glBuffer, cube.normalsBuffer.glBuffer, cube.vertsBuffer.glBuffer);
    function build(dim, pMatrix, pMatrixInv){
        self.__setDefaultUniforms(self.shaderProgram, pMatrix, mvMatrix, dim);
        gl.uniformMatrix4fv(normalMatrixU, false, normalMatrix);

        // I think this reverses the direction of the of the vector, which is more suitable for lighting equations
        mat4.toInverseMat3(mvMatrix, normalMatrix);
        mat3.transpose(normalMatrix);
        gl.uniformMatrix3fv(normalMatrixU, false, normalMatrix);

        gl.bindBuffer(gl.ARRAY_BUFFER, cube.normalsBuffer.glBuffer);
        gl.vertexAttribPointer(vertexNormal, 3, gl.FLOAT, false, 0, 0);

        gl.bindBuffer(gl.ARRAY_BUFFER, cube.vertsBuffer.glBuffer);
        gl.vertexAttribPointer(position, 3, gl.FLOAT, false, 0, 0);

        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, cube.indexesBuffer.glBuffer);
        // Draw from previously bound indexes into bound vertexes
        gl.drawElements(gl.TRIANGLES, 36, gl.UNSIGNED_SHORT, 0);
    }

    setup_shaders();

    this.render = function(time, dim, pMatrix, pMatrixInv) {
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
        build(dim, pMatrix, pMatrixInv);
    };

    $(document).on('engineTick', function(e, time, dim, pMatrix, pMatrixInv){
        gl.useProgram(self.shaderProgram);
        self.render(time, dim, pMatrix, pMatrixInv);
    });
}

BoxRenderer.prototype = new RendererBase();
BoxRenderer.prototype.constructor = BoxRenderer;