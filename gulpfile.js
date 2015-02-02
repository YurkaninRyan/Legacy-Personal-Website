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
        .pipe(gulp.dest('dist/css'));
});

gulp.task('js', function() {
  gulp.src(['src/js/wow.js'])
      .pipe(uglify())
      .pipe(gulp.dest('dist/js'));
});

gulp.task('html', function() {
  gulp.src(['src/html/*.html'])
      .pipe(replace('</body>', '<script src="http://localhost:35729/livereload.js"></script></body>'))
      .pipe(htmlmin({
          removeComments: true,
          collapseWhitespace: true,
          conservativeCollapse: true,
          caseSensitive: true,
          minifyJS: true,
          keepClosingSlash: true
      }))
      .pipe(gulp.dest('dist/html'));
});

gulp.task('assets', function() {
    gulp.src(['src/img/**/*'])
        .pipe(gulp.dest('dist/img'));
    gulp.src(['src/vendor/**/*'])
        .pipe(gulp.dest('dist/vendor'));
    gulp.src(['src/files/**/*'])
        .pipe(gulp.dest('dist/files'));
});


//Create a local web server.
gulp.task('webserver', function() {
    nodemon({
      script: 'index.js',
      ext: 'js',
      ignore: [
        'public/*',
      ],
      env: {
        PORT: '3000'
      }
    });
});

gulp.task('watch', ['webserver'], function() {
      livereload.listen();
      gulp.watch('src/less/*.less', ['less']).on('change', delay(livereload.changed, 500));
      gulp.watch('src/html/*.html', ['html']).on('change', delay(livereload.changed, 500));
      gulp.watch('src/js/*.js', ['js']).on('change', delay(livereload.changed, 500));
});

gulp.task('clean', function() {
    clean.sync(path.join(__dirname, 'dist'));
});

gulp.task('build', ['html', 'js', 'less', 'assets']);
gulp.task('prep', ['clean', 'build', 'watch']);
gulp.task('default', ['prep']);