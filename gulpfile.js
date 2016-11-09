var gulp = require('gulp'),
    less = require('gulp-less'),
    minify = require('gulp-minifier'),
    autoprefixer = require('gulp-autoprefixer'),
    path = require('path');

function _js(){
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

function _images(){
    gulp.src('source/image/*.*')
        .pipe(gulp.dest('statics/image'));
}

function _build(){
    _js();
    _css();
    _images();
}


gulp.task('default', function () {
    gulp.watch('./source/js/*.js',_js);
    gulp.watch('./source/less/*.less',_css);
    gulp.watch('./source/images/*.*', _images);
});

gulp.task('build', _build);