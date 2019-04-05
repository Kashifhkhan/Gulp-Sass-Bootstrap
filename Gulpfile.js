var gulp = require('gulp');
var sass = require('gulp-sass');
var prefix = require('gulp-autoprefixer');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var sasslint = require("gulp-sass-lint");
var classPrefix = require('gulp-class-prefix');
var del = require('del');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');


gulp.task('sass', function () {
	return gulp.src('css/style.scss')
	.pipe(sass({outputStyle: 'uncompressed'}, {errLogToConsole: true}))
	.pipe(prefix("last 2 versions", "> 1%", "ie 8", "Android 2", "Firefox ESR"))
	.pipe(gulp.dest('css/'))
	.pipe(reload({stream:true}));
});

gulp.task('prefix', function() {
	return gulp.src('node_modules/bootstrap/dist/css/bootstrap.css')
	.pipe(classPrefix('me-'))
	.pipe(gulp.dest('css/'));
});

gulp.task('sass-lint', function () {
	return gulp.src('css/*.scss')
		.pipe(sasslint({	
			options: {
				configFile: './.sass-lint.yml'
            }			
		}))
		.pipe(sasslint.format())
		.pipe(sasslint.failOnError())
});

gulp.task('browser-sync', function() {
	browserSync.init(null, {
        server: {
            baseDir: "./"
        }
	});
});

gulp.task('clean', function() {
  return del('js/dist/*');
});

var venderJs = [
	'./node_modules/jquery-slim/dist/jquery.slim.js',
	'./node_modules/bootstrap/dist/js/bootstrap.js'
];

gulp.task('minify:vendorjs', [
	'clean'
  ], function() {
	return gulp.src(venderJs)
	  .pipe(concat('main.js'))
	  .pipe(gulp.dest('js/'));
  });

gulp.task('minifyjs',[
	'clean',
	'minify:vendorjs'
  ], function() {
	return gulp.src('js/*.js')
	  .pipe(concat('main.min.js'))
	  .pipe(uglify())
	  .pipe(gulp.dest('js/dist'));
  });

gulp.task('default', ['sass', 'browser-sync'], function () {
	gulp.watch("css/*.scss", ['sass']);
	gulp.watch(["js/*.js", "./*.html"], reload);
});