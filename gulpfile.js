'use strict';

var	    gulp = require('gulp'),
			concat = require('gulp-concat'),
			uglify = require('gulp-uglify'),
			rename = require('gulp-rename'),
			  sass = require('gulp-sass'),
			  maps = require('gulp-sourcemaps'),
			   del = require('del'),
autoprefixer = require('gulp-autoprefixer'),
		imagemin = require('gulp-imagemin'),
			 cache = require('gulp-cache'),
	 minifycss = require('gulp-minify-css'),
		 plumber = require('gulp-plumber'),
 browserSync = require('browser-sync'),
			reload = browserSync.reload;


// CHECK CHANGES IN HTML FILES
gulp.task('html', function(){
	gulp.src('dev/**/*.html')
	.pipe(reload({stream:true}));
});


// CONCAT AND MINIFY JS FILES
gulp.task('resetScript', function(cb){
	del([
		'dev/js/app.js',
		'dev/js/app.js.map',
		'dev/js/app.min.js'
	], cb);
});

gulp.task('concatScripts', ['resetScript'], function(){
	return gulp.src([
		'dev/**/*.js'
	])
	.pipe(plumber())
	.pipe(maps.init())
	.pipe(concat('app.js'))
	.pipe(maps.write('./'))
	.pipe(gulp.dest('dev/js/'))
	.pipe(reload({stream:true}));
});

gulp.task('minifyScripts', ['concatScripts'], function(){
	return gulp.src([
			'dev/js/app.js'
		])
		.pipe(plumber())
		.pipe(uglify({'mangle': true}))
		.pipe(rename('app.min.js'))
		.pipe(gulp.dest('dev/js/'))
		.pipe(reload({stream:true}));
});

// SASS / AUTOPREFIXER
gulp.task('compileSass', function(){
	return gulp.src([
			'dev/scss/build.scss'
		])
		.pipe(plumber())
		.pipe(maps.init())
		.pipe(sass()).on('error', sass.logError)
		.pipe(autoprefixer('last 2 versions', 'ie 8', 'ie 9'))
		.pipe(maps.write('./'))
		.pipe(gulp.dest('dev/css/'))
		.pipe(rename('style.min.css'))
		.pipe(minifycss())
		.pipe(gulp.dest('dev/css/'))
		.pipe(reload({stream:true}));
});

// IMAGE COMPRESSION
gulp.task('images', function(){
	return gulp.src([
			'dev/img/**/*'
		])
		.pipe(cache(imagemin({optimizationLevel: 3, progressive: true, interlaced: true})))
		.pipe(gulp.dest('dev/img/'));
});

// BROWSER SYNC
// browser sync for dev
gulp.task('browser-sync', function(){
	browserSync({
		server: {
			baseDir: './dev/'
		}
	});
});
// browser sync for built site
gulp.task('browser-sync', function(){
	browserSync({
		server: {
			baseDir: './dev/'
		}
	});
});


// WATCH TASK
gulp.task('watchFiles', function(){
	gulp.watch('dev/**/*', ['html', 'compileSass', 'images']);
});

// BUILD TASK

// clear old dist folder
gulp.task('build-cleanfolder', function(cb){
	del([
		'dist/**'
	], cb);
});

// create dist directory
gulp.task('build-copy', ['build-cleanfolder'], function(){
	return gulp.src('dev/**/*')
	.pipe(gulp.dest('dist/'));
});

//remove unwanted files
gulp.task('build-removefiles', ['build-copy'], function(cb){
	del([
			'dist/scss/',
			'dist/js/!(*.min.js)'
		], cb);
});

gulp.task('build', ['build-copy', 'build-removefiles']);



gulp.task('default', ['html','minifyScripts', 'compileSass', 'images', 'browser-sync', 'watchFiles']);

