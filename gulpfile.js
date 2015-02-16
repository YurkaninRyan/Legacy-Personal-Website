var gulp = require('gulp'),
    less = require('gulp-less'),
    replace = require('gulp-replace'),
    path = require('path'),
    nodemon = require('gulp-nodemon'),
    livereload = require('gulp-livereload'),
    util = require('gulp-util'),
    uglify = require('gulp-uglify'),
    minifyCSS = require('gulp-minify-css'),
    clean = require('rimraf');
    connect = require('gulp-connect'),
    htmlmin = require('gulp-htmlmin');

var delay = function(fn, time) {
    return function() {
        setTimeout(fn, time);
    };
};

//Take the less file, minify it, and put it in public/css as a css file.
gulp.task('less', function() {
    // Builds the CSS
    gulp.src(['src/less/*.less'])
        .pipe(less().on('error',util.log))
        .pipe(minifyCSS({
            advanced: true
        }))
        .pipe(gulp.dest('css'));
});

gulp.task('js', function() {
  gulp.src(['src/js/wow.js'])
      .pipe(uglify())
      .pipe(gulp.dest('js'));
});

gulp.task('html', function() {
  gulp.src(['src/html/*.html'])
      .pipe(htmlmin({
          removeComments: true,
          collapseWhitespace: true,
          conservativeCollapse: true,
          caseSensitive: true,
          minifyJS: true,
          keepClosingSlash: true
      }))
      .pipe(gulp.dest('./'));
});

gulp.task('assets', function() {
    gulp.src(['src/img/**/*'])
        .pipe(gulp.dest('img'));
    gulp.src(['src/vendor/**/*'])
        .pipe(gulp.dest('vendor'));
});


gulp.task('clean', function() {
    clean.sync(path.join(__dirname, 'dist'));
});

gulp.task('build', ['html', 'js', 'less', 'assets']);
gulp.task('prep', ['clean', 'build']);
gulp.task('default', ['prep']);