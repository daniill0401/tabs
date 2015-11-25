﻿/* --------- plugins --------- */

var
	gulp        = require('gulp'),
	browserSync = require('browser-sync').create(),
	jade        = require('gulp-jade'),
	scss = require('gulp-sass'),
	plumber     = require('gulp-plumber'),
	autoprefixer = require('gulp-autoprefixer');

/* --------- paths --------- */

var
	paths = {
		jade : {
			location: 'jade/*.jade',
			compiled: 'jade/*.jade',
			destination: ''
		},

		scss : {
			location    : 'scss/*.scss',
			destination: 'css'
		},

		browserSync : {
			baseDir : '',
			watchPaths : ['*.html', 
						  'scss/*.scss', 
						  'js/*.js']
		},

		compile__css : {
			location : 'css/*.css',
			destination : 'css'
		}
	};

/* --------- browser sync --------- */

gulp.task('sync', function() {
	browserSync.init({
		port: 9000,
		server: {
			baseDir: paths.browserSync.baseDir
		}
	});
});

/* --------- jade --------- */

gulp.task('jade', function() {
	gulp.src(paths.jade.compiled)
		.pipe(plumber())
		.pipe(jade({
			pretty: '\t',
		}))
		.pipe(gulp.dest(paths.jade.destination));
});

/* --------- scss --------- */

gulp.task('scss', function () {
	gulp.src(paths.scss.location)
    	.pipe(scss().on('error', scss.logError))
    	.pipe(gulp.dest(paths.scss.destination));
});

/* --------- autoprefixer --------- */

gulp.task('autoprefixer', function () {
    gulp.src(paths.compile__css.location)
    	.pipe( autoprefixer({
    		browsers: ['last 15 versions'],
    		cascade: false
    	}))
    	.pipe( gulp.dest(paths.compile__css.destination));

});

/* --------- watch --------- */

gulp.task('watch', function(){
	gulp.watch(paths.jade.location, ['jade']);
	gulp.watch(paths.scss.location, ['scss']);
	gulp.watch(paths.compile__css.location, ['autoprefixer']);
	gulp.watch(paths.browserSync.watchPaths).on('change', browserSync.reload);
});

/* --------- default --------- */

gulp.task('default', ['jade', 'sync', 'scss', 'autoprefixer', 'watch']);
