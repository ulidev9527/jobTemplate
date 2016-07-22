var gulp = require('gulp'),
    less = require('gulp-less'),
    minify = require('gulp-minifier'),
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
    gulp.src('source/images/*.*')
        .pipe(gulp.dest('statics/images'));
}

function _build(){
    _js();
    _css();
    _images();
}


gulp.task('default', function () {
    gulp.watch('./source',_build);
});

gulp.task('build', _build);