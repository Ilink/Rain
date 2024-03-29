$(document).ready(function(){

    // Matrix multiplcation test
    var persp = mat4.create();
    mat4.perspective(45, $('canvas').width() / $('canvas').height(), 0.1, 100.0, persp);
    var test_pos = [1,2,3,1];
    var result = vec4.create();
    // mat4.multiplyVec3(persp,test_pos, result);
    mat4.multiply(persp,test_pos, result);

    console.log(result);


    var shader_loader = new Shader_loader();
    // shader_loader.load(['rain_vs', 'rain_fs']);
    shader_loader.load(['sprite_vs', 'sprite_fs', 'rain_vs', 'rain_fs', 
        'background_fs', 'background_vs', 'laser_fs', 'laser_vs', 'blur_fs', 'blur_vs',
        'rttShaderFs', 'rttShaderVs', 'particles_vs', 'particles_fs']);

    $(document).on('shaders_loaded', function(e, shaders){
        var engine = new Engine($('canvas'));
        var tmat;

        var squid_shaders = {
            vs: shaders['sprite_vs.glsl'].text(),
            fs: shaders['sprite_fs.glsl'].text()
        };
        var rain_shaders = {
            vs: shaders['laser_vs.glsl'].text(),
            fs: shaders['laser_fs.glsl'].text()
        };
        var rtt_shaders = {
            vs: shaders['rttShaderVs.glsl'].text(),
            fs: shaders['rttShaderFs.glsl'].text()
        };
        var background_shaders = {
            vs: shaders['background_vs.glsl'].text(),
            fs: shaders['background_fs.glsl'].text()
        };
        var blur_shaders = {
            vs: shaders['blur_vs.glsl'].text(),
            fs: shaders['blur_fs.glsl'].text()
        };
        var particle_shaders = {
            vs: shaders['particles_vs.glsl'].text(),
            fs: shaders['particles_fs.glsl'].text()
        };

        // global
        window.gl = engine.get_gl();
        
        var boundaries = engine.get_boundaries();
        var boundaries_far = engine.get_boundaries(-10);

        function makeParticles(num){
            var size = num * 6; // each particle is a line, so it has 6 position coordinates
                                          // aX, aY, aZ & bX, bY, bZ
            var particlePositions = [];
            for(var i = 0; i < num; i++){
                // particlePositions.push(Math.random()*100, Math.random()*100, -1*Math.random()*3);
                particlePositions.push(Math.random()*2 -1, Math.random()*2 -1, Math.random(),
                    Math.random()*2 -1, Math.random()*2 -1, Math.random());
            }
            return particlePositions;
        }

        var particleVerts = makeParticles(1000);
        var particlesRenderer = new ParticlesRenderer(particle_shaders, particleVerts);
        engine.add_renderer(particlesRenderer);
        var mouse = new Mouse();
        var mouseParticles = new MouseParticles(particlesRenderer, particleVerts, mouse);










        // var background_renderer = new BgRenderer(gl, background_shaders);
        // // The shader for this does not use the perpsective matrix, so we just need clip space coords
        // var background_rect = [
        //     -1,   -1,     0.0, // bot left
        //     -1,    1,     0.0, // top left
        //     1,    -1,     0.0, // bot right
        //     1,     1,     0.0  // top right
        // ];
        // background_renderer.addGeo(background_rect, [0,0,-40]);
        // // engine.add_renderer(background_renderer);

        // var squid_renderer = new SpriteRenderer(gl, squid_shaders);
        // engine.add_renderer(squid_renderer);
        // tmat = [-1.5, -2.0, -7.0];
        // var squid_sprite = squid_renderer.addGeo(
        //     geoPresets.rectangle(1.0, 1.0), 
        //     tmat, 
        //     'squid_large.png'
        // );

        // Rain ------------------------------------------------------------/

        // var rainRenderer = new RainRenderer(gl, rain_shaders, rtt_shaders);
        // // engine.add_renderer(rainRenderer);

        // /*
        // Give me a range from edge to edge of the screen
        // I am estimating the edge now, when my monitor is fullscreen
        // -4 < x < 4

        // Also, 1.5 is the top of the screen, hooray
        // */
        // var x_max = 100;
        // var x_min = 0;
        // var z_min = -5.0;
        // var z_max = -1;
        // var top = 1.5;
        // var z;
        // var geo_arr = [];

        // // If the user resizes their screen, the rain wont move beacause this is only calculated once
        // for(var i = x_min; i <= x_max; i++){
        //     var x = fit_bound(i, x_min, x_max, -4, 4);
        //     var z_rand = Math.random();
        //     z = fit_bound(z_rand, 0, 1, z_min, z_max);
            
        //     tmat = [x, boundaries.topleft[1], z];
        //     // var _geo = rainRenderer.add_geo(geoPresets.rectangle(0.008, 0.09), tmat);
        //     var _geo = rainRenderer.addGeo(geoPresets.rectangle(0.02, 0.8), tmat);

        //     _geo.vel = Math.random()/150.0 + 0.0001;
        //     geo_arr.push(_geo);
        // }

        // var timeline = new Timeline(function(dt){

        //     for(var i = 0; i < geo_arr.length; i++){
        //         // geo_arr[i].trans[1] = -0.5;

        //         if(geo_arr[i].trans[1] < -4){
        //             geo_arr[i].trans[1] = boundaries.topleft[1]+1; // move them back to the top
        //         } else
        //             geo_arr[i].trans[1] -= geo_arr[i].vel * dt;
        //     }
        // });
        // timeline.start();

        engine.start();
        // engine.stop();
    });
});