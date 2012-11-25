/*
Texture

If the 'source' attribute is not a string, we assume it is a webgl texture.
*/

function Texture(source, sampler, uvAttr){
    var self = this;

    function handleLoadedTexture(texture) {
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, texture.image);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);
        gl.generateMipmap(gl.TEXTURE_2D);
        gl.bindTexture(gl.TEXTURE_2D, null);
    }

    function initGlTexture(filename){
        self.glTexture = gl.createTexture();
        self.glTexture.image = new Image();
        self.glTexture.image.onload = function() {
            handleLoadedTexture(self.glTexture)
        }

        self.glTexture.image.src = filename;
    }

    this.coords = [
        0.0, 0.0,
        0.0, 1.0,
        1.0, 0.0,
        1.0, 1.0
    ];
    this.uvBuffer = makeBuffer(self.coords, 2);
    this.glTexture;
    if(typeof source === 'string'){
        initGlTexture(source);
    } else {
        self.glTexture = source;
    }

    this.set = function(){
        // set texture coordinates
        gl.bindBuffer(gl.ARRAY_BUFFER, self.uvBuffer.glBuffer);
        gl.vertexAttribPointer(uvAttr, self.uvBuffer.itemSize, gl.FLOAT, false, 0, 0);

        // set texture
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, self.glTexture);
        gl.uniform1i(sampler, 0);
    };
}