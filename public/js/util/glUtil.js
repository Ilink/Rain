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
};

var geoPresets = {
    rectangle: {
        /*
        4  3
        1  2
        */
        verts: [
            0.0, 0.0, 0.0,
            1.0, 0.0, 0.0,
            1.0, 1.0, 0.0,
            0.0, 1.0, 0.0
        ],
        indexes: [
            0, 1, 2,
            0, 2, 3
        ]
    }, 
    box: function(width, height, depth){
        var verts = [
            // Front face
            0.0, 0.0,  depth,
            width, 0.0,  depth,
            width,  height,  depth,
            0.0,  height,  depth,
            
            // Back face
            0.0, 0.0, 0.0,
            0.0,  height, 0.0,
            width,  height, 0.0,
            width, 0.0, 0.0,

            // Top face
            0.0, height, 0.0,
            0.0, height,  depth,
            width, height,  depth,
            width, height, 0.0,

            // Bottom face
            0.0, 0.0, 0.0,
            width, 0.0, 0.0,
            width, 0.0,  depth,
            0.0, 0.0,  depth,

            // Right face
            width, 0.0, 0.0,
            width, height, 0.0,
            width, height,  depth,
            width, 0.0,  depth,

            // Left face
            0.0, 0.0, 0.0,
            0.0, 0.0,  depth,
            0.0,  height,  depth,
            0.0,  height, 0.0,
        ];
        var verts = [
            // Front face
            -1.0, -1.0,  1.0,
             1.0, -1.0,  1.0,
             1.0,  1.0,  1.0,
            -1.0,  1.0,  1.0,
            
            // Back face
            -1.0, -1.0, -1.0,
            -1.0,  1.0, -1.0,
             1.0,  1.0, -1.0,
             1.0, -1.0, -1.0,
            
            // Top face
            -1.0,  1.0, -1.0,
            -1.0,  1.0,  1.0,
             1.0,  1.0,  1.0,
             1.0,  1.0, -1.0,
            
            // Bottom face
            -1.0, -1.0, -1.0,
             1.0, -1.0, -1.0,
             1.0, -1.0,  1.0,
            -1.0, -1.0,  1.0,
            
            // Right face
             1.0, -1.0, -1.0,
             1.0,  1.0, -1.0,
             1.0,  1.0,  1.0,
             1.0, -1.0,  1.0,
            
            // Left face
            -1.0, -1.0, -1.0,
            -1.0, -1.0,  1.0,
            -1.0,  1.0,  1.0,
            -1.0,  1.0, -1.0
        ];
        
        var indexes = [
            0,1,2,      0,2,3,      // front
            4,5,6,      4,6,7,      // back
            8,9,10,     8,10,11,    // top
            12,13,14,   12,14,15,   // bottom
            16,17,18,   16,18,19,   // right
            20,21,22,   20,22,23    // left
        ];

        var normals = [
            // Front
            0.0,  0.0,  1.0,
            0.0,  0.0,  1.0,
            0.0,  0.0,  1.0,
            0.0,  0.0,  1.0,

            // Back
            0.0,  0.0, -1.0,
            0.0,  0.0, -1.0,
            0.0,  0.0, -1.0,
            0.0,  0.0, -1.0,

            // Top
            0.0,  1.0,  0.0,
            0.0,  1.0,  0.0,
            0.0,  1.0,  0.0,
            0.0,  1.0,  0.0,

            // Bottom
            0.0, -1.0,  0.0,
            0.0, -1.0,  0.0,
            0.0, -1.0,  0.0,
            0.0, -1.0,  0.0,

            // Right
            1.0,  0.0,  0.0,
            1.0,  0.0,  0.0,
            1.0,  0.0,  0.0,
            1.0,  0.0,  0.0,

            // Left
            -1.0,  0.0,  0.0,
            -1.0,  0.0,  0.0,
            -1.0,  0.0,  0.0,
            -1.0,  0.0,  0.0
        ];
        return {
            verts: verts,
            indexes: indexes,
            vertsBuffer: makeGeoBuffer(verts, 3),
            indexesBuffer: makeIndexBuffer(indexes, 3),
            normalsBuffer: makeGeoBuffer(normals, 3),
            normals: normals
        }
    }
};

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