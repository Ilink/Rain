<html>

<head>
<title>Learning WebGL &mdash; lesson 14</title>
<meta http-equiv="content-type" content="text/html; charset=ISO-8859-1">

<script type="text/javascript" src="glMatrix-0.9.5.min.js"></script>
<script type="text/javascript" src="webgl-utils.js"></script>

<script id="per-fragment-lighting-fs" type="x-shader/x-fragment">
    precision mediump float;

    varying vec2 vTextureCoord;
    varying vec3 vTransformedNormal;
    varying vec4 vPosition;

    uniform float uMaterialShininess;

    uniform bool uShowSpecularHighlights;
    uniform bool uUseLighting;
    uniform bool uUseTextures;

    uniform vec3 uAmbientColor;

    uniform vec3 uPointLightingLocation;
    uniform vec3 uPointLightingSpecularColor;
    uniform vec3 uPointLightingDiffuseColor;

    uniform sampler2D uSampler;


    void main(void) {
        vec3 lightWeighting;
        if (!uUseLighting) {
            lightWeighting = vec3(1.0, 1.0, 1.0);
        } else {
            vec3 lightDirection = normalize(uPointLightingLocation - vPosition.xyz);
            vec3 normal = normalize(vTransformedNormal);

            float specularLightWeighting = 0.0;
            if (uShowSpecularHighlights) {
                vec3 eyeDirection = normalize(-vPosition.xyz);
                vec3 reflectionDirection = reflect(-lightDirection, normal);

                specularLightWeighting = pow(max(dot(reflectionDirection, eyeDirection), 0.0), uMaterialShininess);
            }

            float diffuseLightWeighting = max(dot(normal, lightDirection), 0.0);
            lightWeighting = uAmbientColor
                + uPointLightingSpecularColor * specularLightWeighting
                + uPointLightingDiffuseColor * diffuseLightWeighting;
        }

        vec4 fragmentColor;
        if (uUseTextures) {
            fragmentColor = texture2D(uSampler, vec2(vTextureCoord.s, vTextureCoord.t));
        } else {
            fragmentColor = vec4(1.0, 1.0, 1.0, 1.0);
        }
        gl_FragColor = vec4(fragmentColor.rgb * lightWeighting, fragmentColor.a);
    }
</script>

<script id="per-fragment-lighting-vs" type="x-shader/x-vertex">
    attribute vec3 aVertexPosition;
    attribute vec3 aVertexNormal;
    attribute vec2 aTextureCoord;

    uniform mat4 uMVMatrix;
    uniform mat4 uPMatrix;
    uniform mat3 uNMatrix;

    varying vec2 vTextureCoord;
    varying vec3 vTransformedNormal;
    varying vec4 vPosition;


    void main(void) {
        vPosition = uMVMatrix * vec4(aVertexPosition, 1.0);
        gl_Position = uPMatrix * vPosition;
        vTextureCoord = aTextureCoord;
        vTransformedNormal = uNMatrix * aVertexNormal;
    }
</script>


<script type="text/javascript">

    var gl;

    function initGL(canvas) {
        try {
            gl = canvas.getContext("experimental-webgl");
            gl.viewportWidth = canvas.width;
            gl.viewportHeight = canvas.height;
        } catch (e) {
        }
        if (!gl) {
            alert("Could not initialise WebGL, sorry :-(");
        }
    }


    function getShader(gl, id) {
        var shaderScript = document.getElementById(id);
        if (!shaderScript) {
            return null;
        }

        var str = "";
        var k = shaderScript.firstChild;
        while (k) {
            if (k.nodeType == 3) {
                str += k.textContent;
            }
            k = k.nextSibling;
        }

        var shader;
        if (shaderScript.type == "x-shader/x-fragment") {
            shader = gl.createShader(gl.FRAGMENT_SHADER);
        } else if (shaderScript.type == "x-shader/x-vertex") {
            shader = gl.createShader(gl.VERTEX_SHADER);
        } else {
            return null;
        }

        gl.shaderSource(shader, str);
        gl.compileShader(shader);

        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            alert(gl.getShaderInfoLog(shader));
            return null;
        }

        return shader;
    }


    var shaderProgram;

    function initShaders() {
        var fragmentShader = getShader(gl, "per-fragment-lighting-fs");
        var vertexShader = getShader(gl, "per-fragment-lighting-vs");

        shaderProgram = gl.createProgram();
        gl.attachShader(shaderProgram, vertexShader);
        gl.attachShader(shaderProgram, fragmentShader);
        gl.linkProgram(shaderProgram);

        if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
            alert("Could not initialise shaders");
        }

        gl.useProgram(shaderProgram);

        shaderProgram.vertexPositionAttribute = gl.getAttribLocation(shaderProgram, "aVertexPosition");
        gl.enableVertexAttribArray(shaderProgram.vertexPositionAttribute);

        shaderProgram.vertexNormalAttribute = gl.getAttribLocation(shaderProgram, "aVertexNormal");
        gl.enableVertexAttribArray(shaderProgram.vertexNormalAttribute);

        shaderProgram.textureCoordAttribute = gl.getAttribLocation(shaderProgram, "aTextureCoord");
        gl.enableVertexAttribArray(shaderProgram.textureCoordAttribute);

        shaderProgram.pMatrixUniform = gl.getUniformLocation(shaderProgram, "uPMatrix");
        shaderProgram.mvMatrixUniform = gl.getUniformLocation(shaderProgram, "uMVMatrix");
        shaderProgram.nMatrixUniform = gl.getUniformLocation(shaderProgram, "uNMatrix");
        shaderProgram.samplerUniform = gl.getUniformLocation(shaderProgram, "uSampler");
        shaderProgram.materialShininessUniform = gl.getUniformLocation(shaderProgram, "uMaterialShininess");
        shaderProgram.showSpecularHighlightsUniform = gl.getUniformLocation(shaderProgram, "uShowSpecularHighlights");
        shaderProgram.useTexturesUniform = gl.getUniformLocation(shaderProgram, "uUseTextures");
        shaderProgram.useLightingUniform = gl.getUniformLocation(shaderProgram, "uUseLighting");
        shaderProgram.ambientColorUniform = gl.getUniformLocation(shaderProgram, "uAmbientColor");
        shaderProgram.pointLightingLocationUniform = gl.getUniformLocation(shaderProgram, "uPointLightingLocation");
        shaderProgram.pointLightingSpecularColorUniform = gl.getUniformLocation(shaderProgram, "uPointLightingSpecularColor");
        shaderProgram.pointLightingDiffuseColorUniform = gl.getUniformLocation(shaderProgram, "uPointLightingDiffuseColor");
    }


    function handleLoadedTexture(texture) {
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, texture.image);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);
        gl.generateMipmap(gl.TEXTURE_2D);

        gl.bindTexture(gl.TEXTURE_2D, null);
    }


    var earthTexture;
    var galvanizedTexture;

    function initTextures() {
        earthTexture = gl.createTexture();
        earthTexture.image = new Image();
        earthTexture.image.onload = function () {
            handleLoadedTexture(earthTexture)
        }
        earthTexture.image.src = "earth.jpg";

        galvanizedTexture = gl.createTexture();
        galvanizedTexture.image = new Image();
        galvanizedTexture.image.onload = function () {
            handleLoadedTexture(galvanizedTexture)
        }
        galvanizedTexture.image.src = "arroway.de_metal+structure+06_d100_flat.jpg";
    }


    var mvMatrix = mat4.create();
    var mvMatrixStack = [];
    var pMatrix = mat4.create();

    function mvPushMatrix() {
        var copy = mat4.create();
        mat4.set(mvMatrix, copy);
        mvMatrixStack.push(copy);
    }

    function mvPopMatrix() {
        if (mvMatrixStack.length == 0) {
            throw "Invalid popMatrix!";
        }
        mvMatrix = mvMatrixStack.pop();
    }

    function setMatrixUniforms() {
        gl.uniformMatrix4fv(shaderProgram.pMatrixUniform, false, pMatrix);
        gl.uniformMatrix4fv(shaderProgram.mvMatrixUniform, false, mvMatrix);

        var normalMatrix = mat3.create();
        mat4.toInverseMat3(mvMatrix, normalMatrix);
        mat3.transpose(normalMatrix);
        gl.uniformMatrix3fv(shaderProgram.nMatrixUniform, false, normalMatrix);
    }

    function degToRad(degrees) {
        return degrees * Math.PI / 180;
    }


    var teapotVertexPositionBuffer;
    var teapotVertexNormalBuffer;
    var teapotVertexTextureCoordBuffer;
    var teapotVertexIndexBuffer;

    function handleLoadedTeapot(teapotData) {
        teapotVertexNormalBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, teapotVertexNormalBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(teapotData.vertexNormals), gl.STATIC_DRAW);
        teapotVertexNormalBuffer.itemSize = 3;
        teapotVertexNormalBuffer.numItems = teapotData.vertexNormals.length / 3;

        teapotVertexTextureCoordBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, teapotVertexTextureCoordBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(teapotData.vertexTextureCoords), gl.STATIC_DRAW);
        teapotVertexTextureCoordBuffer.itemSize = 2;
        teapotVertexTextureCoordBuffer.numItems = teapotData.vertexTextureCoords.length / 2;

        teapotVertexPositionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, teapotVertexPositionBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(teapotData.vertexPositions), gl.STATIC_DRAW);
        teapotVertexPositionBuffer.itemSize = 3;
        teapotVertexPositionBuffer.numItems = teapotData.vertexPositions.length / 3;

        teapotVertexIndexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, teapotVertexIndexBuffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(teapotData.indices), gl.STATIC_DRAW);
        teapotVertexIndexBuffer.itemSize = 1;
        teapotVertexIndexBuffer.numItems = teapotData.indices.length;

        document.getElementById("loadingtext").textContent = "";
    }


    function loadTeapot() {
        var request = new XMLHttpRequest();
        request.open("GET", "Teapot.json");
        request.onreadystatechange = function () {
            if (request.readyState == 4) {
                handleLoadedTeapot(JSON.parse(request.responseText));
            }
        }
        request.send();
    }


    var teapotAngle = 180;


    function drawScene() {
        gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        if (teapotVertexPositionBuffer == null || teapotVertexNormalBuffer == null || teapotVertexTextureCoordBuffer == null || teapotVertexIndexBuffer == null) {
            return;
        }

        mat4.perspective(45, gl.viewportWidth / gl.viewportHeight, 0.1, 100.0, pMatrix);

        var specularHighlights = document.getElementById("specular").checked;
        gl.uniform1i(shaderProgram.showSpecularHighlightsUniform, specularHighlights);

        var lighting = document.getElementById("lighting").checked;
        gl.uniform1i(shaderProgram.useLightingUniform, lighting);
        if (lighting) {
            gl.uniform3f(
                shaderProgram.ambientColorUniform,
                parseFloat(document.getElementById("ambientR").value),
                parseFloat(document.getElementById("ambientG").value),
                parseFloat(document.getElementById("ambientB").value)
            );

            gl.uniform3f(
                shaderProgram.pointLightingLocationUniform,
                parseFloat(document.getElementById("lightPositionX").value),
                parseFloat(document.getElementById("lightPositionY").value),
                parseFloat(document.getElementById("lightPositionZ").value)
            );

            gl.uniform3f(
                shaderProgram.pointLightingSpecularColorUniform,
                parseFloat(document.getElementById("specularR").value),
                parseFloat(document.getElementById("specularG").value),
                parseFloat(document.getElementById("specularB").value)
            );

            gl.uniform3f(
                shaderProgram.pointLightingDiffuseColorUniform,
                parseFloat(document.getElementById("diffuseR").value),
                parseFloat(document.getElementById("diffuseG").value),
                parseFloat(document.getElementById("diffuseB").value)
            );
        }

        var texture = document.getElementById("texture").value;
        gl.uniform1i(shaderProgram.useTexturesUniform, texture != "none");

        mat4.identity(mvMatrix);

        mat4.translate(mvMatrix, [0, 0, -40]);
        mat4.rotate(mvMatrix, degToRad(23.4), [1, 0, -1]);
        mat4.rotate(mvMatrix, degToRad(teapotAngle), [0, 1, 0]);

        gl.activeTexture(gl.TEXTURE0);
        if (texture == "earth") {
            gl.bindTexture(gl.TEXTURE_2D, earthTexture);
        } else if (texture == "galvanized") {
            gl.bindTexture(gl.TEXTURE_2D, galvanizedTexture);
        }
        gl.uniform1i(shaderProgram.samplerUniform, 0);

        gl.uniform1f(shaderProgram.materialShininessUniform, parseFloat(document.getElementById("shininess").value));

        gl.bindBuffer(gl.ARRAY_BUFFER, teapotVertexPositionBuffer);
        gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, teapotVertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);

        gl.bindBuffer(gl.ARRAY_BUFFER, teapotVertexTextureCoordBuffer);
        gl.vertexAttribPointer(shaderProgram.textureCoordAttribute, teapotVertexTextureCoordBuffer.itemSize, gl.FLOAT, false, 0, 0);

        gl.bindBuffer(gl.ARRAY_BUFFER, teapotVertexNormalBuffer);
        gl.vertexAttribPointer(shaderProgram.vertexNormalAttribute, teapotVertexNormalBuffer.itemSize, gl.FLOAT, false, 0, 0);

        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, teapotVertexIndexBuffer);
        setMatrixUniforms();
        gl.drawElements(gl.TRIANGLES, teapotVertexIndexBuffer.numItems, gl.UNSIGNED_SHORT, 0);
    }


    var lastTime = 0;

    function animate() {
        var timeNow = new Date().getTime();
        if (lastTime != 0) {
            var elapsed = timeNow - lastTime;

            teapotAngle += 0.05 * elapsed;
        }
        lastTime = timeNow;
    }


    function tick() {
        requestAnimFrame(tick);
        drawScene();
        animate();
    }


    function webGLStart() {
        var canvas = document.getElementById("lesson14-canvas");
        initGL(canvas);
        initShaders();
        initTextures();
        loadTeapot();

        gl.clearColor(0.0, 0.0, 0.0, 1.0);
        gl.enable(gl.DEPTH_TEST);

        tick();
    }

</script>


<style type="text/css">
    #loadingtext {
        position:absolute;
        top:250px;
        left:150px;
        font-size:2em;
        color: white;
    }
</style>


</head>


<body onload="webGLStart();">
    <a href="http://learningwebgl.com/blog/?p=1658">&lt;&lt; Back to Lesson 14</a><br />

    <canvas id="lesson14-canvas" style="border: none;" width="500" height="500"></canvas>

    <div id="loadingtext">Loading world...</div>
    <br/>

    <input type="checkbox" id="specular" checked /> Show specular highlight<br/>
    <input type="checkbox" id="lighting" checked /> Use lighting<br/>

    Texture:
    <select id="texture">
        <option value="none">None</option>
        <option selected value="galvanized">Galvanized</option>
        <option value="earth">Earth</option>
    </select>
    <br/>


    <h2>Material:</h2>

    <table style="border: 0; padding: 10px;">
        <tr>
            <td><b>Shininess:</b>
            <td><input type="text" id="shininess" value="32.0" />
        </tr>
    </table>


    <h2>Point light:</h2>

    <table style="border: 0; padding: 10px;">
        <tr>
            <td><b>Location:</b>
            <td>X: <input type="text" id="lightPositionX" value="-10.0" />
            <td>Y: <input type="text" id="lightPositionY" value="4.0" />
            <td>Z: <input type="text" id="lightPositionZ" value="-20.0" />
        </tr>
        <tr>
            <td><b>Specular colour:</b>
            <td>R: <input type="text" id="specularR" value="0.8" />
            <td>G: <input type="text" id="specularG" value="0.8" />
            <td>B: <input type="text" id="specularB" value="0.8" />
        </tr>
        <tr>
            <td><b>Diffuse colour:</b>
            <td>R: <input type="text" id="diffuseR" value="0.8" />
            <td>G: <input type="text" id="diffuseG" value="0.8" />
            <td>B: <input type="text" id="diffuseB" value="0.8" />
        </tr>
    </table>


    <h2>Ambient light:</h2>

    <table style="border: 0; padding: 10px;">
        <tr>
            <td><b>Colour:</b>
            <td>R: <input type="text" id="ambientR" value="0.2" />
            <td>G: <input type="text" id="ambientG" value="0.2" />
            <td>B: <input type="text" id="ambientB" value="0.2" />
        </tr>
    </table>
    <br/>

    Galvanized texture courtesy of <a href="http://www.arroway-textures.com/">Arroway Textures</a>.<br/>
    Earth texture courtesy of <a href="http://www.esa.int/esaEO/SEMGSY2IU7E_index_0.html">the European Space Agency/Envisat</a>.<br/><br/>

    <a href="http://learningwebgl.com/blog/?p=1658">&lt;&lt; Back to Lesson 14</a><br />

    <!-- Google Analytics stuff, please ignore - nothing to do with WebGL :-) -->
    <script type="text/javascript">
        var gaJsHost = (("https:" == document.location.protocol) ? "https://ssl." : "http://www.");
        document.write(unescape("%3Cscript src='" + gaJsHost + "google-analytics.com/ga.js' type='text/javascript'%3E%3C/script%3E"));
    </script>
    <script type="text/javascript">
        try {
            var pageTracker = _gat._getTracker("UA-2240015-5");
            pageTracker._trackPageview();
        } catch(err) {
        }
    </script>

</body>

</html>
