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

//js插件处理 已压缩
function _jsPluginMinify() {
    gulp.src('source/js/plugin/*.js')
        .pipe(debug({ title: 'jsMinify:' }))
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
            getKeptComment: function(content, filePath) {
                var m = content.match(/\/\*![\s\S]*?\*\//img);
                return m && m.join('\n') + '\n' || '';
            }
        }))
        .pipe(concat('plugin.js'))
        .pipe(sourcemaps.write('../maps'))
        .pipe(plumber.stop())
        .pipe(gulp.dest('statics/js'));
}


//js处理 未压缩
function _js() {
    gulp.src('source/js/*.js')
        .pipe(debug({ title: 'js:' }))
        .pipe(plumber())
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(plumber.stop())
        .pipe(gulp.dest('statics/js'));
}


//js处理 已压缩
function _jsMinify() {
    gulp.src('source/js/*.js')
        .pipe(debug({ title: 'jsMinify:' }))
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
            getKeptComment: function(content, filePath) {
                var m = content.match(/\/\*![\s\S]*?\*\//img);
                return m && m.join('\n') + '\n' || '';
            }
        }))
        .pipe(sourcemaps.write('../maps'))
        .pipe(plumber.stop())
        .pipe(gulp.dest('statics/js'));
}

//css插件处理 已压缩
function _cssPlugin() {
    gulp.src('source/less/plugin/*.less')
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
            getKeptComment: function(content, filePath) {
                var m = content.match(/\/\*![\s\S]*?\*\//img);
                return m && m.join('\n') + '\n' || '';
            }
        }))
        .pipe(concat('plugin.css'))
        .pipe(sourcemaps.write('../maps'))
        .pipe(plumber.stop())
        .pipe(gulp.dest('statics/css'));
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
            getKeptComment: function(content, filePath) {
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
    _jsPluginMinify();
    _jsMinify();
    _cssPlugin();
    _css();
    gulp.src('statics/css/*.css')
        .pipe(gulp.dest('build/statics/css'));
    gulp.src('statics/js/*.js')
        .pipe(gulp.dest('build/statics/js'));
    gulp.src('file/*.*')
        .pipe(gulp.dest('build/file'));
    gulp.src('*.html')
        .pipe(gulp.dest('build/'));
}


gulp.task('default', function () {
    _jsPluginMinify();
    _js();
    _cssPlugin();
    _css();
    watch('./source/js/plugin/*.js', _jsPluginMinify);
    watch('./source/js/*.js', _js);
    watch('./source/js/plugin/*.js', _cssPlugin);
    watch('./source/less/*.less', _css);
});

gulp.task('build', _build);
gulp.task('js', _js);
gulp.task('jsMinify', _jsMinify);
gulp.task('css', _css);