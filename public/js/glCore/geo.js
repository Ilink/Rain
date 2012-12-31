var geoPresets = {
    rectangle: {
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
    rect2d: function(width, height){
        return [
            0.0,    0.0,        0.0,
            0.0,    height,     0.0,
            width,  0.0,        0.0,
            width,  height,     0.0
        ];
    },
    fullScreenQuad: [
        -1,   -1,     0.0, // bot left
        -1,    1,     0.0, // top left
        1,    -1,     0.0, // bot right
        1,     1,     0.0  // top right
    ],
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

        // var normals = calcFaceNormals(indexes, verts);

        return {
            verts: verts,
            indexes: indexes,
            vertsBuffer: makeGeoBuffer(verts, 3),
            indexesBuffer: makeIndexBuffer(indexes, 3),
            normalsBuffer: makeGeoBuffer(normals, 3),
            normals: normals
        }
    },
    // thanks to some help from 
    // http://stackoverflow.com/questions/7946770/calculating-a-sphere-in-opengl
    // however, this is utterly broken and totally wrong...
    sphere: function(radius, rings, sectors){
        var pi2 = Math.PI*2;
        var R = 1/rings-1;
        var S = 1/sectors-1;
        var verts = [], normals = [];
        var x, y, z;

        for(var r = 0; r < rings; r++){
            for(var s = 0; s < sectors; s++){
                y = radius * Math.sin( -pi2 + Math.PI * r * R );
                x = radius * Math.cos(pi2 * s * S) * Math.sin( Math.PI * r * R );
                z = radius * Math.sin(pi2 * s * S) * Math.sin( Math.PI * r * R );

                normals.push(x,y,z);
                verts.push(x,y,z);
            }
        }
        return verts;
    }
};

function Box(width, height, depth){
    // if only one param is passed, it becomes a cube
    if(typeof height === 'undefined' && typeof depth === 'undefined'){
        var height = width;
        var depth = width;
    }
    
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

    var indexes = [
        0,1,2,      0,2,3,      // front
        4,5,6,      4,6,7,      // back
        8,9,10,     8,10,11,    // top
        12,13,14,   12,14,15,   // bottom
        16,17,18,   16,18,19,   // right
        20,21,22,   20,22,23    // left
    ];

    var normals = calcFaceNormals(indexes, verts);
    var normalsBuffer = makeGeoBuffer(normals, 3);
    var indexesBuffer = makeIndexBuffer(indexes, 3);
    var vertsBuffer = makeGeoBuffer(verts, 3);
    var numTris = 36;
        
    this.draw = function(normalUni, positionAttr){
        gl.bindBuffer(gl.ARRAY_BUFFER, normalsBuffer.glBuffer);
        gl.vertexAttribPointer(normalUni, 3, gl.FLOAT, false, 0, 0);

        gl.bindBuffer(gl.ARRAY_BUFFER, vertsBuffer.glBuffer);
        gl.vertexAttribPointer(positionAttr, 3, gl.FLOAT, false, 0, 0);

        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexesBuffer.glBuffer);
        gl.drawElements(gl.TRIANGLES, numTris, gl.UNSIGNED_SHORT, 0);
    };
}