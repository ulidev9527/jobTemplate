const
    fs = require('fs'),

    //源代码目录    
    sourceDir = './source',
    //输出目录
    outDir = './statics',
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
    //压缩原路径
    sourcemaps = require('gulp-sourcemaps'),
    //防止报错跳出
    plumber = require('gulp-plumber'),
    //debug
    debug = require('gulp-debug'),
    //文件监听
    watch = require('gulp-watch'),
    //颜色终端
    color = require('colors-cli'),
    //js、css地址列表
    fileList = {
        js: [],
        css: []
    };

function clTP(event, file, dir) {
    let
        cEvent = color.green_bt,
        cFile = color.green;
    console.log('【' + new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString() + '】' +
        cEvent(event + ': ') + cFile(file));
    dir ? clTP(event + ' dir', dir) : '';
}

gulp.task('default', function() {
    watch(sourceDir + '/js/*.js', (file) => {
        /**
         * file: history,cwd,base,stat,_contents,_isViny1,event
         */

        clTP(file.event, file.history);

        if (file.event == 'change' || file.event == 'add') {
            _jsBabel(file.history);
        }
    });
    watch(sourceDir + '/less/*.less', (file) => {
        clTP(file.event, file.history);

        if (file.event == 'change' || file.event == 'add') {
            _less(file.history);
        }
    });

    watch(sourceDir + '/image/*.*', (file) => {
        clTP(file.event, file.history);

        if (file.event == 'change' || file.event == 'add') {
            _image(file.history);
        }
    })

    gulp.src(sourceDir + '/image/*.*')
        .pipe(debug({ title: 'image =>' }))
        .pipe(gulp.dest(outDir + '/image'));
    gulp.src(sourceDir + '/less/*.less')
        .pipe(plumber())
        .pipe(debug({ title: 'less =>' }))
        .pipe(less())
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
        .pipe(gulp.dest(outDir + '/css'));
}); 

function _image(glob) {
    gulp.src(glob)
        .pipe(debug({ title: 'image =>' }))
        .pipe(gulp.dest(outDir + '/image'));
}

function _jsBabel(glob) {
    gulp.src(glob)
        .pipe(plumber())
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(debug({ title: 'jsBabel =>' }))
        .pipe(plumber.stop())
        .pipe(gulp.dest(outDir + '/js'));
}

function _less(glob) {
    gulp.src(glob)
        .pipe(plumber())
        .pipe(debug({ title: 'less =>' }))
        .pipe(less())
        .pipe(autoprefixer())
        .pipe(plumber.stop())
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
        .pipe(gulp.dest(outDir + '/css'));
}

function _cssAutoprefixer(glob) {
    gulp.src(glob)
        .pipe(plumber())
        .pipe(debug({ title: 'cssAutoprefixer =>' }))
        .pipe(autoprefixer())
        .pipe(plumber.stop())
        .pipe(gulp.dest(outDir + '/css'));
}