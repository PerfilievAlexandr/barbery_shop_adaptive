
var gulp = require('gulp');
var less = require('gulp-less');
var browserSync = require('browser-sync');

gulp.task('less', function () {
    return gulp.src('app/less/**/*.less')
        .pipe(less())
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

gulp.task('watch', ['browser-sync', 'less'], function () {
    gulp.watch('app/less/**/*.less', ['less']);
    gulp.watch('app/*.html', browserSync.reload)
    gulp.watch('app/js/**/*.js', browserSync.reload)
});