// Gulp Dependencies
var gulp = require('gulp');
var rename = require('gulp-rename');
// Build Dependencies
var uglify = require('gulp-uglify');
// Style Dependencies
var sass = require('gulp-sass');
var minifyCSS = require('gulp-minify-css');
// Development Dependencies
var jshint = require('gulp-jshint');
var notify = require("gulp-notify");


// SASS to CSS task
gulp.task('styles', function() {
  gulp.src('src/sass/**/*.scss')
  	.pipe(sass({includePaths: ['node_modules/bourbon-libsass/dist']}))
    .pipe(sass().on('error', sass.logError))
    //.pipe(minifyCSS())
    //.pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('./dist/css/'))
    //.pipe(notify({ message: 'SASS task complete' }));
});

// JSHint task
gulp.task('js-hint', function() {
  gulp.src('js/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

// Uglify JS task
gulp.task('uglify', ['js-hint'], function() {
  gulp.src('src/js/**/*.js')
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('./dist/js/'));
});

// Watch task
gulp.task('watch', function() {
  gulp.watch('src/sass/**/*.scss', ['styles']);
  gulp.watch('src/js/**/*.js', ['uglify']);
});

// Run task on gulp command
gulp.task('default', ['styles', 'js-hint', 'uglify', 'watch']); 