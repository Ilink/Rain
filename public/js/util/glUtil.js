function initGeoBuffer(gl, verts){
	var buffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(verts), gl.STATIC_DRAW);
	buffer.itemSize = 3;
	buffer.numItems = verts.length/3;
	return buffer;	
}

function makeIndexBuffer(verts){
    var buffer = {};
    var glBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, glBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(verts), gl.STATIC_DRAW);
    buffer.itemSize = 3;
    buffer.numItems = verts.length / 3;
    buffer.glBuffer = glBuffer;
    return buffer;
}

function makeGeoBuffer(verts, itemSize){
    var buffer = {};
    var glBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, glBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(verts), gl.STATIC_DRAW);
    buffer.itemSize = itemSize;
    buffer.numItems = verts.length / 3;
    buffer.glBuffer = glBuffer;
    return buffer;
}

var makeBuffer = makeGeoBuffer; // alias

function lineIter(length, callback){
    for(var i = 0; i < length; i+=6){
        callback.call(this, i, i+1, i+2, i+3, i+4, i+5);
    }
}

function partialLineIter(start, end, callback){
    for(var i = start; i < end; i+=6){
       callback.call(this, i, i+1, i+2, i+3, i+4, i+5);
    }   
}