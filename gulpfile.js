const
    fs = require('fs'),
    path = require('path'),
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
    //服务器
    webserver = require('gulp-webserver'),
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
    imgPath = inputDir + '/image/*.*',
    port = 3000;

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
gulp.task('default', ['webserver'], function() {

    //监听主文件夹
    watch(inputDir + '/*/*.*', (file) => {
        clTP(file.event, file.history);
        let
            fileArr = path.dirname(file.history[0]).split(/\/|\\/),
            type = fileArr[fileArr.length - 1];

        if (file.event == 'change' || file.event == 'add') {
            type == 'js' ? _js(file.history) :
                type == 'less' ? _less(file.history) :
                type == 'image' ? _image(file.history) : '';

        } else if (file.event == 'unlink') {
            let
                staticPath = outputDir + '/' + type.replace(/less/, 'css') + '/' +
                (type != 'image' ? path.basename(file.history[0])
                    .replace(/\..+$/, '.' + type)
                    .replace(/\.less/, '.css') : path.basename(file.history[0])),

                mapsPath = outputDir + '/' + type.replace(/less/, 'css') + '/maps/' +
                (type != 'image' ? path.basename(file.history[0])
                    .replace(/\..+$/, '.' + type)
                    .replace(/\.less/, '.css') : path.basename(file.history[0])) + '.map';

            fs.existsSync(staticPath) && fs.unlinkSync(staticPath);
            fs.existsSync(mapsPath) && fs.unlinkSync(mapsPath);
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

gulp.task('webserver', () => {
    gulp.src('./')
        .pipe(webserver({
            directoryListing: true,
            open: true,
            port: port
        }));
});


/**
 * js自动化处理
 * @param {String|Array} file 文件地址
 */
function _js(file) {
    webpack(webpackConfig(_env, file), (err, stats) => {
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
 * @param {String|Array} file 文件地址
 * 1.css兼容处理
 * 2.压缩css
 *
 */
function _less(file) {
    gulp.src(file)
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
 * @param {String|Array} file 图片地址
 */
function _image(file) {
    gulp.src(file)
        .pipe(debug({ title: 'image =>' }))
        .pipe(gulp.dest(outputDir + '/image'));
}