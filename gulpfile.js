var gulp = require('gulp'),
    stylus = require('gulp-stylus'),
    jade = require('gulp-jade'),
    autoprefixer = require('gulp-autoprefixer'),
    shorthand = require('gulp-shorthand'),
    webserver = require('gulp-webserver'),
    base64 = require('gulp-css-base64'),
    livereload = require('gulp-livereload'),
	cssmin = require('gulp-cssmin'),
	rename = require('gulp-rename');

var path = {
    master: { //куда складывать готовые после сборки файлы
        html: 'master/',
        js: 'master/js/',
        css: 'master/style/css/',
        img: 'master/style/img/',
        fonts: 'master/style/fonts/'
    },
    src: { //Пути откуда брать исходники
        html: 'src/*.jade',
        js: 'src/js/main.js',
        css: 'src/style/css/style.styl',
        img: 'src/img/**/*.*', //Синтаксис img/**/*.* означает - взять все файлы всех расширений из папки и из вложенных каталогов
        fonts: 'src/fonts/**/*.*'
    },

};


gulp.task('webserver', ['watch'], function() {
  gulp.src('./')
    .pipe(webserver({
      livereload: true,
      directoryListing: true,
      open: true
    }));
});


gulp.task('stylus', function () {
    gulp.src(path.src.css)
        .pipe(stylus())
        .on('error', console.log)
        .pipe(gulp.dest(path.master.css))
        .pipe(livereload());
});

gulp.task('shorthand', function () {
    gulp.src(path.master.css)
        .pipe(shorthand())
        .on('error', console.log)
        .pipe(gulp.dest(path.master.css))
        .pipe(livereload());
});

gulp.task('cssmin', function () {
    gulp.src(path.master.css)
        .pipe(cssmin())
		.on('error', console.log)
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(path.master.css));
});

gulp.task('jade', function () {
    gulp.src(path.src.html)
        .pipe(jade({
              pretty: '\t'
            }))
        .on('error', console.log)
        .pipe(gulp.dest(path.master.html))
        .pipe(livereload());
});

gulp.task('autoprefixer', function () {
    gulp.src(path.master.css)
         .pipe(autoprefixer({
            browsers: ['last 10 versions'],
            cascade: false
        }))
        .on('error', console.log)
        .pipe(gulp.dest(path.master.css))
        .pipe(livereload());
});

gulp.task('base64', function () {
    gulp.src(path.master.css)
         .pipe(base64({
            baseDir: path.master.img,
            extensionsAllowed: ['.gif', '.png']
        }))
        .on('error', console.log)
        .pipe(gulp.dest(path.master.css))
        .pipe(livereload());
});




gulp.task('watch', function(){
    livereload.listen();
    gulp.watch(path.src.html,['jade']);
    gulp.watch(path.src.css,['stylus']);
    gulp.watch(path.master.css,['autoprefixer']);
	gulp.watch(path.master.css,['cssmin']);
});


