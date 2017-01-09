const
    gulp = require('gulp'),
    //less文件处理
    less = require('gulp-less'),
    //压缩
    minify = require('gulp-minifier'),
    //css自动兼容处理
    autoprefixer = require('gulp-autoprefixer'),
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
    watch = require('gulp-watch');



//js处理 未压缩
function _js() {
    gulp.src('source/js/*.js')
        .pipe(debug({ title: 'js:' }))
        .pipe(plumber())
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(concat('main.js'))
        .pipe(plumber.stop())
        .pipe(gulp.dest('statics/js'));
}

//js处理 已压缩
function _jsMinify() {
    gulp.src('source/js/*.js')
        .pipe(debug({ title: 'jsMinify:'}))
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(minify({
            minify: true,
            collapseWhitespace: true,
            conservativeCollapse: true,
            minifyJS: true,
            getKeptComment: function (content, filePath) {
                var m = content.match(/\/\*![\s\S]*?\*\//img);
                return m && m.join('\n') + '\n' || '';
            }
        }))
        .pipe(concat('main.js'))
        .pipe(sourcemaps.write('../maps'))
        .pipe(plumber.stop())
        .pipe(gulp.dest('statics/js'));
}

//css处理 已压缩
function _css() {
    gulp.src('source/less/*.less')
        .pipe(debug({ title: 'less:' }))
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(autoprefixer())
        .pipe(minify({
            minify: true,
            collapseWhitespace: true,
            conservativeCollapse: true,
            minifyCSS: true,
            getKeptComment: function (content, filePath) {
                var m = content.match(/\/\*![\s\S]*?\*\//img);
                return m && m.join('\n') + '\n' || '';
            }
        }))
        .pipe(sourcemaps.write('../maps'))
        .pipe(plumber.stop())
        .pipe(gulp.dest('statics/css'));
}

//打包:js压缩、css压缩
function _build() {
    _jsMinify();
    _css();
}


gulp.task('default', function () {
    watch('./source/js/*.js', _js);
    watch('./source/less/*.less', _css);
});

gulp.task('build', _build);
gulp.task('js', _js);
gulp.task('jsMinify', _jsMinify);
gulp.task('css', _css);