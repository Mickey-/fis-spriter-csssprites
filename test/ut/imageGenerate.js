var assert = require('chai').assert
    , expect = require('chai').expect
    , fs = require('fs')
    , fis = require('fis')
    , gen = require('../../libs/imageGenerate.js')
    , __root = __dirname + '/imageGenerate/'

PROJECT_ROOT = __root;
//init env
fis.project.setProjectRoot(__root);
fis.compile.setup();
fis.config.set('pack', {
    'aio.css': [
        "**.css"
    ]
});


//tests
var css = {
    '/aio.css': {
        path: __root + 'expect/aio.css'
    }
}
fis.release({
    spriter: require('../../'),
    pack: true
}, function (ret) {
    fis.util.map(css, function(k, info) {
        var expect_f = fis.file.wrap(info.path);
        expect(ret.pkg[k].getContent()).to.is.equal(expect_f.getContent());
    });
});