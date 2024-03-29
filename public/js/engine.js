/*
Engine

The engine handles the boring stuff.
Handles time, basic opengl stuff. Gets the context.
Does the render loop. 
*/


function Engine(canvas){

    var parameters = {  start_time  : new Date().getTime(), 
                        time        : 0, 
                        screenWidth : 0, 
                        screenHeight: 0 };
    var screenHeight, screenWidth;
    var shaderProgram;
    var pMatrix = mat4.create();
    var pMatrixInv = mat4.create();
    var geometry = [];
    var position;
    var boundaries = {};
    var gl;
    var topleft = [-1,1,-1,1]; // clip space
    var botright = [1,-1,-1,1]; // clip space
    var boundaries;
    canvas = canvas[0];

    var camera = new Camera();
    camera.bindControls();

    function resize_viewport( canvas ) {
        canvas.width = $(window).width()-4;
        canvas.height = $(window).height()-4;

        screenWidth = canvas.width;
        screenHeight = canvas.height;

        gl.viewport( 0, 0, canvas.width, canvas.height );
        mat4.perspective(45, (canvas.width) / canvas.height, 0.1, 100.0, pMatrix);
        mat4.inverse(pMatrix, pMatrixInv);
    }

    function initGL(canvas) {
        try {
            gl = WebGLDebugUtils.makeDebugContext(canvas.getContext("experimental-webgl"));
            // gl = canvas.getContext("experimental-webgl");
        } catch (e) {
        }
        if (!gl) {
            console.log("Could not initialise WebGL, sorry :-(");
        }
    }

    initGL(canvas); // get context

    resize_viewport(canvas);
    $(window).on('resize', function(){
        resize_viewport(canvas);
    });

    var timeline = new Timeline(function(){
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        
        $(document).trigger('engineTick', [parameters.time, 
                {width: screenWidth, height: screenHeight}, 
                pMatrix, pMatrixInv, camera.viewMatrix]);
    });

    this.start = function(){
        gl.clearColor(1.0, 1.0, 1.0, 0.0);
        // gl.clearColor(0.0,0.0, 0.0, 1.0);
        // gl.disable(gl.DEPTH_TEST);
        gl.enable(gl.BLEND);
        gl.enable(gl.DEPTH_TEST);           // Enable depth testing
        // gl.depthFunc(gl.LEQUAL);            // Near things obscure far things

        timeline.start();
    };

    this.stop = function(){
        timeline.stop();
    };

    this.get_gl = function(){
        return gl;
    };

    this.get_boundaries = function(z){
        if(typeof z !== 'undefined'){
            // this is all wrong! dont bother
            var tmat = mat4.create();
            mat4.identity(tmat);
            mat4.translate(tmat, [0,0,z], tmat);
            var trans_result = mat4.create();
            mat4.multiply(pMatrixInv, tmat, trans_result);

            var result = vec4.create();
            mat4.multiply(trans_result, topleft, result);
            boundaries.topleft = result;
        } else {
            var result = vec3.create();
            mat4.multiplyVec3(pMatrixInv, topleft, result);
            boundaries.topleft = result;
            
            result = vec3.create();
            mat4.multiplyVec3(pMatrixInv, botright, result);
            boundaries.botright = result;
        }
        
        return boundaries;
    }
}