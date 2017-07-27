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
    //防止报错跳出
    plumber = require('gulp-plumber'),
    //debug
    debug = require('gulp-debug'),
    //文件监听
    watch = require('gulp-watch'),
    //颜色终端
    color = require('colors-cli'),
    //webpack
    webpack = require('webpack'),
    //webpack config
    webpackConfig = require('./webpack.config.js'),
    //文件路径操作
    glob = require('glob'),
    //输入文件夹
    inputDir = __dirname + '/source',
    //输出文件夹 
    outputDir = __dirname + '/static',
    jsPath = inputDir + '/js/*.js',
    jsModulePath = inputDir + '/js/module/**/*.*',
    lessPath = inputDir + '/less/*.less',
    lessModulePath = inputDir + '/less/module/**/*.*',
    imgPath = inputDir + '/image/*.*';

let
//   
    _env = false;


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

    console.log('\n\n【' + new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString() + '】' +
        cEvent(event + ': ') + cFile(file));
    dir ? clTP(event + ' dir', dir) : '';
}

//默认任务
gulp.task('default', function() {
    //监听js
    watch(jsPath, (file) => {
        console.log(file.history);
        clTP(file.event, file.history);
        if (file.event == 'change' || file.event == 'add') {
            _js(file.history);
        } else if (file.event == 'unlink') {
            let pathArr = file.history[0].split('\\');
            fs.unlinkSync(outputDir + '/js/' + pathArr[pathArr.length - 1]);
        }
    });

    //监听less
    watch(lessPath, (file) => {
        clTP(file.event, file.history);
        if (file.event == 'change' || file.event == 'add') {
            _less(file.history);
        } else if (file.event == 'unlink') {
            let pathArr = file.history[0].split('\\');
            fs.unlinkSync(outputDir + '/css/' + pathArr[pathArr.length - 1].split('.')[0] + '.css');
        }
    });

    //监听image文件夹
    watch(imgPath, (file) => {
        clTP(file.event, file.history);
        if (file.event == 'change' || file.event == 'add') {
            _image(file.history);
        } else if (file.event == 'unlink') {
            let pathArr = file.history[0].split('\\');
            fs.unlinkSync(outputDir + '/image/' + pathArr[pathArr.length - 1]);
        }
    });

    //监听js/module文件夹
    watch(jsModulePath, (file) => {
        _js(glob.sync(jsPath));
    });
    //监听less/module文件夹
    watch(lessModulePath, (file) => {
        _less(glob.sync(lessPath));
    });

    //启动后进行首次处理
    _image(glob.sync(imgPath));
    _less(glob.sync(lessPath));
    _js(glob.sync(jsPath));
});



/**
 * js自动化处理
 * @param {String|Array} path 文件地址
 */
function _js(path) {
    webpack(webpackConfig(_env, path), (err, stats) => {
        if (err) {
            console.error(err.stack || err);
            if (err.details) {
                console.error(err.details);
            }
            return;
        }
        console.log(stats.toString({
            chunks: false, // 使构建过程更静默无输出
            colors: true // 在控制台展示颜色
        }));
    });
}

/**
 * less自动化处理
 * @param {String|Array} path 文件地址
 * 1.css兼容处理
 * 2.压缩css
 *
 */
function _less(path) {
    gulp.src(path)
        .pipe(plumber())
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
        .pipe(plumber.stop())
        .pipe(gulp.dest(outputDir + '/css'));
}

/**
 * 图片处理
 * 考虑到性能问题，暂时没有添加图片压缩功能，这里只是一个复制图片
 * @param {String|Array} path 图片地址
 */
function _image(path) {
    gulp.src(path)
        .pipe(debug({ title: 'image =>' }))
        .pipe(gulp.dest(outputDir + '/image'));
}