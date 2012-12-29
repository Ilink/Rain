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
};

RendererBase.prototype.addGeo = function(verts, mat, textureName){
    var self = this;
    var geo = makeGeoBuffer(verts, 3);
    geo.trans = mat;
    
    if(typeof textureName !== 'undefined'){
        geo.texture = new Texture(textureName, self.uSampler, self.aTextureCoord);
    }
    this.geo.push(geo);
    return geo;
};

// this should be on the camera, not here.
RendererBase.prototype.setFromCamera = function(mvMatrix, xforms){
    var trans = vec3.create(xforms.x, xforms.y, xforms.z),
        // camRot = mat3.create(),
        camRot = vec3.normalize(vec3.create([-xforms.yaw, -xforms.pitch, -1.0])),
        pos = vec3.create();

    mat4.rotate(mvMatrix, degToRad(xforms.pitch), [1, 0, 0]);
    mat4.rotate(mvMatrix, degToRad(xforms.yaw), [0, 1, 0]);
    // mat4.toMat3(mvMatrix, camRot);

    // mat3.multiplyVec3(camRot, [1,1,1], pos);
    // vec3.normalize(pos);
    vec3.add(camRot, [xforms.x, xforms.y, xforms.z]);

    mat4.translate(mvMatrix, vec3.scale(camRot,10));
};

RendererBase.prototype.toViewSpace = RendererBase.prototype.setFromCamera; // alias