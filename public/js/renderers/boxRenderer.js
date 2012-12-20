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
    var rotAngle = 0.01;
    var currentRot = 0.0;
    
    function setup_shaders() {
        position = gl.getAttribLocation(self.shaderProgram, "position");
        gl.enableVertexAttribArray(position);

        // textureCoordAttribute = gl.getAttribLocation(self.shaderProgram, "aTextureCoord");
        // gl.enableVertexAttribArray(textureCoordAttribute);

        normalMatrixU = gl.getUniformLocation(self.shaderProgram, "normalMatrix");

        vertexNormal = gl.getAttribLocation(self.shaderProgram, "vertexNormal");
        gl.enableVertexAttribArray(vertexNormal);
    }

    var cube = geoPresets.box(10,10,1);
    console.log(cube.indexesBuffer.glBuffer, cube.normalsBuffer.glBuffer, cube.vertsBuffer.glBuffer);
    
    setup_shaders();

    function build(dim, pMatrix, pMatrixInv){
        mat4.identity(mvMatrix);
        mat4.translate(mvMatrix, [0,0,-6], mvMatrix);
        currentRot += rotAngle;
        mat4.rotate(mvMatrix, currentRot, [0,1,0], mvMatrix);
        self.__setDefaultUniforms(self.shaderProgram, pMatrix, mvMatrix, dim);

        /*
        i really dont understand this part.
        Inverts the upper 3 of the transform matrix.
        Upper 3 would discard the offset part
        i think transpose would reverse the direction of the transformations
        
        i guess the intention is to get the scale/rotation transforms
        and apply those to the normal. BUT WHY?!
        whyyyyyyy
        and why invert it in the first place
        
        mysteries:
            => inversion
            => transposition
        makes sense, kind of
            => disregarding the offset part of the transform matrix

        what is the geometric intepretation of an inversion?
        maybe the transposition makes sense after the inversion    



        we cant just use the transofrmation matrix directly becuase it would change the length and/or rotation of the normal
        we must have unit-length normals
        http://www.lighthouse3d.com/tutorials/glsl-tutorial/the-normal-matrix/
        */
        mat4.toInverseMat3(mvMatrix, normalMatrix);
        mat3.transpose(normalMatrix);
        gl.uniformMatrix3fv(normalMatrixU, false, normalMatrix);

        // this breaks on...windows...
        // something is off? it doesn't register properly or something
        gl.bindBuffer(gl.ARRAY_BUFFER, cube.normalsBuffer.glBuffer);
        gl.vertexAttribPointer(vertexNormal, 3, gl.FLOAT, false, 0, 0);

        gl.bindBuffer(gl.ARRAY_BUFFER, cube.vertsBuffer.glBuffer);
        gl.vertexAttribPointer(position, 3, gl.FLOAT, false, 0, 0);

        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, cube.indexesBuffer.glBuffer);
        // Draw from previously bound indexes into bound vertexes
        gl.drawElements(gl.TRIANGLES, 36, gl.UNSIGNED_SHORT, 0);
    }

    

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