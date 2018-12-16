const gulp = require('gulp');
const less = require('gulp-less');
const browserSync = require('browser-sync');
const plumber = require('gulp-plumber')
const postcss = require('gulp-postcss')
const autoprefixer = require('gulp-autoprefixer')
const mqpacker = require('css-mqpacker')
const minify = require('gulp-csso')
const rename = require('gulp-rename')
const imagemin = require('gulp-imagemin')
const run = require('run-sequence')
const del = require('del')
const concat = require('gulp-concat')

gulp.task('less', function () {
	return gulp.src('app/less/**/*.less')
		.pipe(plumber())
		.pipe(less())
		.pipe(concat('style.css'))
		// .pipe(postcss([
		// 	autoprefixer({
		// 		browsers: [
		// 			"last 1 version",
		// 			"last 2 Chrome versions",
		// 			"last 2 Firefox versions",
		// 			"last 2 Opera versions",
		// 			"last 2 Edge versions"
		// 		]
		// 	}),
		// 	mqpacker({
		// 		sort: true
		// 	})
		// ]))
		.pipe(gulp.dest('app/css'))
		.pipe(minify())
		.pipe(rename('style.min.css'))
		.pipe(gulp.dest('app/css'))
		.pipe(browserSync.reload({stream: true}))
});

gulp.task('browser-sync', function () {
	browserSync({
		server: {
			baseDir: 'app'
		},
		notify: false
	});
});

gulp.task('images', function () {
	return gulp.src('build/img/**/*/.{png, jpg, gif}')

		.pipe(imagemin([
			imagemin.jpegtran({progressive: true}),
			imagemin.optipng({optimizationLevel: 3})
		]))

		.pipe(gulp.dest('build/img'))
})

gulp.task('watch', ['browser-sync', 'less'], function () {
	gulp.watch('app/less/**/*.less', ['less']);
	gulp.watch('app/*.html', browserSync.reload)
	gulp.watch('app/js/**/*.js', browserSync.reload)
});

gulp.task('build', function (fn) {
	run(
		'clean',
		'copy',
		'less',
		'images',
		fn
	)
})

gulp.task('copy', function () {
	return gulp.src([
		'app/img/**',
		'app/js/**',
		'app/*.html'
	], {
		base: './app'
	})
		.pipe(gulp.dest('build'))
})

gulp.task('clean', function () {
	return del('build/*')
})

// gulp.task('less', function () {
//   gulp.src('app/less/**/*/.less')
//     .pipe(plumber())
//     .pipe(less())
//     .pipe(postcss([
// 	    autoprefixer({browsers: [
// 			    "last 1 version",
// 			    "last 2 Chrome versions",
// 			    "last 2 Firefox versions",
// 			    "last 2 Opera versions",
// 			    "last 2 Edge versions"
// 		    ]})
//     ]))
//     .pipe(gulp.dest('app/css'))
// 	  .pipe(server.reload({stream: true}));
// })
//
// gulp.task('browser-sync', function () {
// 	server({
//         server: {
//             baseDir: 'app'
//         },
//         notify: false
//     });
// });
//
// gulp.task('watch', ['browser-sync', 'less'], function () {
//     gulp.watch('app/less/**/*.less', ['less']);
//     gulp.watch('app/index.html', server.reload)
//     gulp.watch('app/js/**/*.js', server.reload)
// });