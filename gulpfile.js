const
	gulp = 			require('gulp');
	browserSync = 	require('browser-sync').create();
	del = 			require('del');
	concat = 		require('gulp-concat');
	rename = 		require("gulp-rename");

	pug = 			require('gulp-pug');
	less = 			require('gulp-less');
	autoprefixer = 	require('gulp-autoprefixer');
	csso = 			require('gulp-csso');
	csscomb = 		require('gulp-csscomb');
	uglify = 		require('gulp-uglify');
	svgSprite =     require('gulp-svg-sprite');

function clean() { return del(['dist/*']) }
function watch() {
	browserSync.init({
		server: { baseDir: "dist/" },
		// tunnel: true
	});
	gulp.watch('app/layout/**/*.pug', layout);
	gulp.watch('app/styles/**/*.less', styles);
	gulp.watch('app/scripts/**/*.js', scripts);
	gulp.watch('app/fonts/**/*', fonts);
	gulp.watch('app/img/**/*', img);
	gulp.watch('app/img/sprite-svg/*.svg', spriteSvg);
}

function layout() {
	return gulp.src('app/layout/*.pug')
		.pipe(pug({
			pretty: true
		}))
		.pipe(gulp.dest('dist/'))
		.pipe(browserSync.stream());
}
function styles() {
	return gulp.src([
		'./node_modules/normalize.less/normalize.less',
		'./app/styles/main.less'
	])
		.pipe(less())
		.pipe(autoprefixer({
			overrideBrowserslist: ['last 2 versions'],
			cascade: false
		}))
		.pipe( concat('bundle.css') )
		.pipe(csscomb())
		.pipe(gulp.dest('dist/css/'))
		.pipe(csso())
		.pipe(rename(function (path) { path.basename += ".min"; }))
		.pipe(gulp.dest('dist/css/'))
		.pipe(browserSync.stream());
}
function scripts() {
	return gulp.src([
		'./node_modules/jquery/dist/jquery.js',
		'./app/scripts/main.js'
	])
		.pipe( concat('bundle.js') )
		.pipe(gulp.dest('dist/js/'))
		.pipe(uglify())
		.pipe(rename(function (path) { path.basename += ".min"; }))
		.pipe(gulp.dest('dist/js/'))
		.pipe(browserSync.stream());
}
function fonts() {
	return gulp.src('app/fonts/**/*')
		.pipe(gulp.dest('dist/fonts/'))
		.pipe(browserSync.stream());
}
function img() {
	return gulp.src([
		'./app/img/**/*',
		'!./app/img/sprite-svg',
		'!./app/img/sprite-svg/**/*'
	])
		.pipe(gulp.dest('dist/img/'))
		.pipe(browserSync.stream());
}
function spriteSvg() {
	return gulp.src('./app/img/sprite-svg/*.svg')
		.pipe(svgSprite({
				mode: {
					stack: {
						sprite: "../sprite.svg"
					}
				},
			}
		))
		.pipe(gulp.dest('dist/img/'))
		.pipe(browserSync.stream());
}

gulp.task('watch', watch);
gulp.task('clean', clean);

gulp.task('layouts', layout);
gulp.task('layouts', styles);
gulp.task('layouts', scripts);
gulp.task('layouts', fonts);
gulp.task('layouts', img);
gulp.task('layouts', spriteSvg);

gulp.task('build', gulp.series(clean,layout,styles,scripts,fonts,img,spriteSvg));
gulp.task('develop', gulp.series('build', 'watch'));