$(document).ready(function(){

    var shader_loader = new Shader_loader();
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

        engine.start();
        // engine.stop();
    });
});