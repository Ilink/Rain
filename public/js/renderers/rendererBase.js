/*
Renderer Base
Provides some default uniforms and attributes.

Make sure you 'call' this constructor here, or nothing will work!
*/

function RendererBase(args){
    if(typeof args !== 'undefined'){
        console.log(args)
        this.gl = args.gl || window.gl;
        this.shaderProgram = buildShaderProgram(args.shaders);
        console.log(this.shaderProgram);
        this.geo = [];
        this.resolution = this.gl.getUniformLocation(this.shaderProgram, 'resolution');
        this.uPMatrix = this.gl.getUniformLocation(this.shaderProgram, 'uPMatrix');
        this.uMVMatrix = this.gl.getUniformLocation(this.shaderProgram, 'uMVMatrix');
        this.uSampler = this.gl.getUniformLocation(this.shaderProgram, 'uSampler');
        this.aTextureCoord = this.gl.getAttribLocation(self.shaderProgram, "aTextureCoord");
        console.log(this.uSampler);
    }
}

// todo refctor, doing it this way is really slow
// should store the values of the uniform locations, not fetch them here
RendererBase.prototype.setDefaultUniforms = function(program, pMatrix, mvMatrix, dim){
    this.gl.uniform2f(this.resolution, dim.width, dim.height);
    this.gl.uniformMatrix4fv(this.uPMatrix, false, pMatrix);
    this.gl.uniformMatrix4fv(this.uMVMatrix, false, mvMatrix);
    this.gl.uniform1i(this.uSampler, 1);
}

RendererBase.prototype.addGeo = function(verts, mat, textureName){
    var self = this;
    var geo = makeGeoBuffer(verts, 3);
    geo.trans = mat;
    
    if(typeof textureName !== 'undefined'){
        geo.texture = new Texture(textureName, self.uSampler, self.aTextureCoord);
    }
    this.geo.push(geo);
    return geo;
}