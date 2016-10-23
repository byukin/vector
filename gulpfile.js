var gulp = require('gulp'),
    stylus = require('gulp-stylus'),
    jade = require('gulp-jade'),
    autoprefixer = require('gulp-autoprefixer'),
    shorthand = require('gulp-shorthand'),
    webserver = require('gulp-webserver'),
    base64 = require('gulp-css-base64'),
    livereload = require('gulp-livereload'),
	cssmin = require('gulp-cssmin'),
	htmlprettify = require('gulp-html-prettify'),
	rename = require('gulp-rename');

var path = {
    master: { //куда складывать собранные
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
        img: 'src/style/img/**/*.*', //Синтаксис img/**/*.* означает - взять все файлы всех расширений из папки и из вложенных каталогов
        fonts: 'src/style/fonts/**/*.*'
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
    gulp.src('master/style/css/*.css')
        .pipe(shorthand())
        .on('error', console.log)
        .pipe(gulp.dest(path.master.css))
        .pipe(livereload());
});

gulp.task('cssmin', function () {
    gulp.src('master/style/css/*.css')
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
    gulp.src('master/style/css/*.css')
         .pipe(autoprefixer({
            browsers: ['last 10 versions'],
            cascade: false
        }))
        .on('error', console.log)
        .pipe(gulp.dest(path.master.css))
        .pipe(livereload());
});

gulp.task('base64', function () {
    gulp.src('master/style/css/style.css')
         .pipe(base64({
            baseDir: "master/style/img/",
            extensionsAllowed: ['.gif', '.png', '.jpg']
        }))
        .on('error', console.log)
		.pipe(rename({suffix: '.base64'}))
        .pipe(gulp.dest(path.master.css))
        .pipe(livereload());
});

gulp.task('htmlprettify', function() {
  gulp.src('master/*.html')
    .pipe(htmlprettify({indent_char: '\t', indent_size: '1'}))
    .pipe(gulp.dest(path.master.html))
});


gulp.task('watch', function(){
    livereload.listen();
    gulp.watch(path.src.html,['jade']);
    gulp.watch(path.src.css,['stylus']);
    gulp.watch(path.master.css,['autoprefixer']);
});


