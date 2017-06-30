const
    fs = require('fs'),
    //主入库 
    gulp = require('gulp'),
    //less文件处理
    less = require('gulp-less'),
    //兼容
    autoprefixer = require('gulp-autoprefixer'),
    //压缩
    minify = require('gulp-minifier'),
    //文件合并
    concat = require('gulp-concat'),
    //es6
    babel = require('gulp-babel'),
    //防止报错跳出
    plumber = require('gulp-plumber'),
    //debug
    debug = require('gulp-debug'),
    //文件监听
    watch = require('gulp-watch'),
    //颜色终端
    color = require('colors-cli'),
    //webpack
    webpack = require('gulp-webpack'),
    //源码地图
    sourcemaps = require('gulp-sourcemaps'),
    //输入文件夹
    inputDir = './source',
    //输出文件夹 
    outputDir = './static';

/**
 * 控制台输出
 * @param {string} event 事件
 * @param {string} file 文件位置
 * @param {string} dir 输出目录
 */
function clTP(event, file, dir) {
    let
        cEvent = color.green_bt,
        cFile = color.green;
    console.log('【' + new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString() + '】' +
        cEvent(event + ': ') + cFile(file));
    dir ? clTP(event + ' dir', dir) : '';
}

//默认任务
gulp.task('default', function() {
    //监听js
    watch(inputDir + '/js/*.js', (file) => {
        clTP(file.event, file.history);
        if (file.event == 'change' || file.event == 'add') {
            _js(file.history);
        } else if (file.event == 'unlink') {
            let pathArr = file.history[0].split('\\');
            fs.unlinkSync(outputDir + '/js/' + pathArr[pathArr.length - 1]);
        }
    });

    //监听less
    watch(inputDir + '/less/*.less', (file) => {
        clTP(file.event, file.history);
        if (file.event == 'change' || file.event == 'add') {
            _less(file.history);
        } else if (file.event == 'unlink') {
            let pathArr = file.history[0].split('\\');
            fs.unlinkSync(outputDir + '/css/' + pathArr[pathArr.length - 1].split('.')[0] + '.css');
        }
    });

    //监听image文件夹
    watch(inputDir + '/image/*.*', (file) => {
        clTP(file.event, file.history);

        if (file.event == 'change' || file.event == 'add') {
            _image(file.history);
        } else if (file.event == 'unlink') {
            let pathArr = file.history[0].split('\\');
            fs.unlinkSync(outputDir + '/image/' + pathArr[pathArr.length - 1]);
        }
    });

    //监听js/module文件夹
    watch(inputDir + '/js/module/*.js', (file) => {
        _run(inputDir + '/js', _js);
    });
    //监听less/module文件夹
    watch(inputDir + '/less/module/*.less', (file) => {
        _run(inputDir + '/less', _less);
    });

    _run(inputDir + '/image', _image);
    _run(inputDir + '/less', _less);
    _run(inputDir + '/js', _js);
});



/**
 * js自动化处理
 * @param {string} glob 文件地址
 * 1.es6转换成es5
 * 2.压缩js
 *
 */
function _js(glob) {
    let
        name = glob[0].split('\\');
    name = name[name.length - 1];

    gulp.src(glob)
        .pipe(plumber())
        .pipe(webpack({
            output: {
                filename: name
            }
        }))
        // es6 - es5
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(debug({ title: 'jsBabel =>' }))
        // 压缩
        .pipe(minify({
            minify: true,
            collapseWhitespace: true,
            conservativeCollapse: true,
            minifyJS: true,
            getKeptComment: function(content, filePath) {
                var m = content.match(/\/\*![\s\S]*?\*\//img);
                return m && m.join('\n') + '\n' || '';
            }
        }))
        .pipe(debug({ title: 'minify =>' }))
        .pipe(plumber.stop())
        .pipe(gulp.dest(outputDir + '/js'));
}

/**
 * less自动化处理
 * @param {string} glob 文件地址
 * 1.css兼容处理
 * 2.压缩css
 *
 */
function _less(glob) {
    gulp.src(glob)
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(debug({ title: 'less =>' }))
        //less转css
        .pipe(less())
        //兼容处理
        .pipe(autoprefixer())
        //压缩
        .pipe(minify({
            minify: true,
            collapseWhitespace: true,
            conservativeCollapse: true,
            minifyCSS: true,
            getKeptComment: function(content, filePath) {
                var m = content.match(/\/\*![\s\S]*?\*\//img);
                return m && m.join('\n') + '\n' || '';
            }
        }))
        .pipe(sourcemaps.write('/maps'))
        .pipe(plumber.stop())
        .pipe(gulp.dest(outputDir + '/css'));
}

//图片处理
function _image(glob) {
    gulp.src(glob)
        .pipe(debug({ title: 'image =>' }))
        .pipe(gulp.dest(outputDir + '/image'));
}

/**
 * 
 * @param {*string} filePath 文件夹地址
 * @param {*string} fn 回调  fn('**\**\**.**')
 */
function _run(filePath, fn) {
    fs.readdir(filePath, (e, f) => {
        if (e) {
            console.log(e);
        } else {
            f.forEach((fi, i) => {
                fs.stat(filePath + '/' + fi, (e, d) => {
                    clTP('display', fi);
                    e ? console.log(e) :
                        d.isFile() ?
                        fn([(filePath + '/' + fi)
                            .replace(/\\\\/g, '\\')
                            .replace(/\//g, '\\')
                            .replace(/\\/g, '\\')
                        ]) :
                        clTP('error', fi + ' is dir');
                });
            });
        }
    });
}