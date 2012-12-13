$(document).ready(function(){

    var shader_loader = new Shader_loader();
    shader_loader.load(['phong_fs', 'phong_vs']);

    $(document).on('shaders_loaded', function(e, shaders){
        var engine = new Engine($('canvas'));
        var tmat;

        var phongShader = {
            vs: shaders['phong_vs.glsl'].text(),
            fs: shaders['phong_fs.glsl'].text()
        };

        // global
        window.gl = engine.get_gl();
        
        var boundaries = engine.get_boundaries();
        var boundaries_far = engine.get_boundaries(-10);

        var boxRenderer = new BoxRenderer(phongShader);
        engine.add_renderer(boxRenderer);

        engine.start();
    });
});