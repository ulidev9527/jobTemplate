var
    gulp = require('gulp'),
    //less文件处理
    less = require('gulp-less'),
    //压缩
    minify = require('gulp-minifier'),
    //css自动兼容处理
    autoprefixer = require('gulp-autoprefixer'),
    //文件合并
    concat = require('gulp-concat'),
    path = require('path');

function _js(){
     gulp.src('source/js/*.js')
        .pipe(concat('main.js')) 
        .pipe(gulp.dest('statics/js'));
}

function _jsMinify() { 
     gulp.src('source/js/*.js')
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
        .pipe(gulp.dest('statics/js'));
}

function _css(){
    gulp.src('source/less/*.less')
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
        .pipe(gulp.dest('statics/css'));
}

function _build(){
    _jsMinify();
    _css();
}


gulp.task('default', function () {
    gulp.watch('./source/js/*.js',_js);
    gulp.watch('./source/less/*.less',_css);
});

gulp.task('build', _build);
gulp.task('js', _js);
gulp.task('jsMinify', _jsMinify);
gulp.task('css', _css);