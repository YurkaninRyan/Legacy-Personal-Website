var gulp = require('gulp'),
    less = require('gulp-less'),
    nodemon = require('gulp-nodemon'),
    livereload = require('gulp-livereload'),
    util = require('gulp-util'),
    uglify = require('gulp-uglify'),
    minifyCSS = require('gulp-minify-css'),
    connect = require('gulp-connect');

//Take the less file, minify it, and put it in public/css as a css file.
gulp.task('less', function() {
    // Builds the CSS
    gulp.src(['public/less/styles.less'])
        .pipe(less().on('error',util.log))
        .pipe(minifyCSS())
        .pipe(gulp.dest('public/css'))
        .pipe(connect.reload());
});

//Create a local web server.
gulp.task('webserver', function() {
    connect.server({
      livereload: true
    });
});

gulp.task('watch', function() {
      gulp.watch('public/less/styles.less', ['less']);
});
          
gulp.task('default', ['less', 'webserver', 'watch']);