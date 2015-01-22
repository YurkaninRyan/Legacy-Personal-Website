var gulp = require('gulp'),
    less = require('gulp-less'),
    nodemon = require('gulp-nodemon'),
    livereload = require('gulp-livereload'),
    util = require('gulp-util'),
    uglify = require('gulp-uglify'),
    minifyCSS = require('gulp-minify-css');

gulp.task('less', function() {
    // Builds the CSS
    gulp.src(['public/less/styles.less'])
        .pipe(less().on('error',util.log))
        //.pipe(minifyCSS())
        .pipe(gulp.dest('public/css'));
});