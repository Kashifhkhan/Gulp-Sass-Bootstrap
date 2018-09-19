var gulp = require('gulp');
var sass = require('gulp-sass');
var prefix = require('gulp-autoprefixer');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var sasslint = require("gulp-sass-lint");


gulp.task('sass', function () {
	return gulp.src('css/style.scss')
	.pipe(sass({outputStyle: 'compressed', sourceComments: 'map'}, {errLogToConsole: true}))
	.pipe(prefix("last 2 versions", "> 1%", "ie 8", "Android 2", "Firefox ESR"))
	.pipe(gulp.dest('css/'))
	.pipe(reload({stream:true}));
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

gulp.task('default', ['sass', 'browser-sync'], function () {
	gulp.watch("css/*.scss", ['sass']);
	gulp.watch(["js/*.js", "./*.html"], reload);
});