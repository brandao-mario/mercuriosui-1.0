'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var concatCss = require('gulp-concat-css');

// Compila sass
var sassFileType = ['./dist/scss/**/*.sass', './dist/scss/**/*.scss'];
gulp.task('sass', function () {
	gulp.src(sassFileType)
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('./dist/css/modules/'));
});

// Concatena arquivos
var cssConcatLocation = ['./dist/css/modules/**/*.css'];
gulp.task('concat-css', function() {
	gulp.src(cssConcatLocation)
		.pipe(concatCss('style.css'))
		.pipe(gulp.dest('./dist/css/'));
});

// Evite loop de arquivos .min
var cssMinifyLocation = ['./dist/css/*.css', '!./dist/css/*.min.css'];
gulp.task('minify-css', function() {
	gulp.src(cssMinifyLocation)
		.pipe(minifyCss({compatibility: 'ie8'}))
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest('./dist/css/'));
});

// Chamadas gulp
gulp.task('default', function() {
	gulp.watch(sassFileType, ['sass']);
	gulp.watch(cssConcatLocation, ['concat-css']);
	gulp.watch(cssMinifyLocation, ['minify-css']);
});