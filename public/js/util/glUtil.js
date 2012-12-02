function initGeoBuffer(gl, verts){
	var buffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(verts), gl.STATIC_DRAW);
	buffer.itemSize = 3;
	buffer.numItems = verts.length/3;
	return buffer;	
}

var geo_builder = {
	/*
	Verts:
	2  4
	1  3
	*/
    rectangle: function(width, height){
        return [
            0.0,    0.0,        0.0,
            0.0,    height,     0.0,
            width,  0.0,        0.0,
            width,  height,     0.0
        ];
    },
    rectangle_gradient: [
    	0.0, 0.0, 0.0,
    	0.0, 1.0, 0.0,
    	1.0, 0.0, 0.0,
    	1.0, 1.0, 0.0
    ],
    fullScreenQuad: [
        -1,   -1,     0.0, // bot left
        -1,    1,     0.0, // top left
        1,    -1,     0.0, // bot right
        1,     1,     0.0  // top right
    ]
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