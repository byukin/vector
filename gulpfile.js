var gulp = require('gulp'),
    styl = require('gulp-stylus'),
    jade = require('gulp-jade'),
    autoprefixer = require('gulp-autoprefixer'),
    shorthand = require('gulp-shorthand'),
    webserver = require('gulp-webserver'),
    base64 = require('gulp-css-base64'),
    livereload = require('gulp-livereload'),
	cssmin = require('gulp-cssmin'),
	rename = require('gulp-rename');


gulp.task('webserver', ['watch'], function() {
  gulp.src('./')
    .pipe(webserver({
      livereload: true,
      directoryListing: true,
      open: true
    }));
});


gulp.task('styl', function () {
    gulp.src('./src/style.styl')
        .pipe(styl())
        .on('error', console.log)
        .pipe(gulp.dest('css'))
        .pipe(livereload());
});


gulp.task('shorthand', function () {
    gulp.src('./css/style.css')
        .pipe(shorthand())
        .on('error', console.log)
        .pipe(gulp.dest('css'))
        .pipe(livereload());
});

gulp.task('cssmin', function () {
    gulp.src('./css/style.css')
        .pipe(cssmin())
		.on('error', console.log)
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('css'));
});



gulp.task('jade', function () {
    gulp.src('./src/index.jade')
        .pipe(jade({
              pretty: true
            }))
        .on('error', console.log)
        .pipe(gulp.dest(''))
        .pipe(livereload());
});

gulp.task('autoprefixer', function () {
    gulp.src('./css/style.css')
         .pipe(autoprefixer({
            browsers: ['last 10 versions'],
            cascade: false
        }))
        .on('error', console.log)
        .pipe(gulp.dest('css'))
        .pipe(livereload());
});

gulp.task('base64', function () {
    gulp.src('./css/style.css')
         .pipe(base64({
            baseDir: "./img",
            extensionsAllowed: ['.gif', '.png']
        }))
        .on('error', console.log)
        .pipe(gulp.dest('css'))
        .pipe(livereload());
});

gulp.task('htmlbeautify', function() {
  var options = {
    indentSize: 2
  };
  gulp.src('./*.html')
    .pipe(htmlbeautify(options))
    .pipe(gulp.dest('./'))
});



gulp.task('watch', function(){
    livereload.listen();
    gulp.watch('./src/*.jade',['jade']);
    gulp.watch('./src/*.styl',['styl']);
    gulp.watch('./css/*.css',['autoprefixer']);
	gulp.watch('./css/style.css',['cssmin']);
});

gulp.task('gitinit', function(){
  git.init(function (err) {
    if (err) throw err;
  });
});
gulp.task('addremote', function(){
  git.addRemote('origin', 'https://github.com/BogdanYukin/vector.git', function (err) {
    if (err) throw err;
  });
});
gulp.task('clone', function(){
  git.clone('https://github.com/BogdanYukin/vector.git', function (err) {
    if (err) throw err;
  });
});
