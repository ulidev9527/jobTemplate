var
    gulp = require('gulp'),
    watch = require('gulp-watch'),
    vinyl = require('vinyl'),
    minifyJS =require('gulp-jsmin'),
    fs = require('fs');

var
    jsPath = 'source/**/*.js';

// gulp.task('js', function () {
//     gulp.src('./source/**/*.js')
//         .pipe(gulp.dest('statics'));
// })

gulp.task('default', function () {
    return gulp.src(jsPath)
        .pipe(watch(jsPath))
        .pipe(minifyJS())
        .pipe(gulp.dest('statics'));
}); 