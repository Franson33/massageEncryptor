'use strict'

const gulp = require('gulp');
const watch = require('gulp-watch');
const htmlmin = require('gulp-htmlmin');
const autoprefixer = require('gulp-autoprefixer');
const rename = require("gulp-rename");
const uglify = require('gulp-uglify-es').default;
const cleanCSS = require('gulp-clean-css');
const imagemin = require('gulp-imagemin');
const rimraf = require('rimraf');

const path = {
    build: {
        html: 'build/',
        js: 'build/js/',
        css: 'build/css/',
        img: 'D:/Server/domains/messageCrypter.loc/build/img/'
    },
    src: {
        html: 'src/index.html',
        js: 'src/js/script.js',
        style: 'src/style/style.css',
        img: 'D:/Server/domains/messageCrypter.loc/src/image/*.*',
    },
    watch: {
        html: 'src/index.html',
        js: 'src/js/script.js',
        style: 'src/style/style.css',
        img: 'D:/Server/domains/messageCrypter.loc/src/image/*.*',
    },
    clean: './build'
};

gulp.task('clean', function (cb) {
    rimraf(path.clean, cb);
});

gulp.task('minify', () => {
  return gulp.src(path.src.html)
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest(path.build.html));
});

gulp.task('uglify', function () {
    return gulp.src(path.src.js)
        .pipe(rename("script.min.js"))
        .pipe(uglify())
        .pipe(gulp.dest(path.build.js));
});

gulp.task('stylebuild', async function () {
    gulp.src(path.src.style)
        .pipe(rename("style.min.css"))
        .pipe(autoprefixer({cascade: false}))
        .pipe(cleanCSS())
        .pipe(gulp.dest(path.build.css))
});

gulp.task('imagebuild', async function () {
    gulp.src(path.src.img)
        .pipe(imagemin())
        .pipe(gulp.dest(path.build.img))
});

gulp.task('build', gulp.series(
  'minify',
  'uglify',
  'stylebuild',
  'imagebuild'
));

gulp.task('watch', function(){
    watch([path.watch.html], function(event, cb) {
        gulp.start('minify');
    });
    watch([path.watch.style], function(event, cb) {
        gulp.start('stylebuild');
    });
    watch([path.watch.js], function(event, cb) {
        gulp.start('uglify');
    });
    watch([path.watch.img], function(event, cb) {
        gulp.start('imagebuild');
    });
});

gulp.task('default', gulp.series(
  'build',
  'watch'
));
