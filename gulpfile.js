'use strict';

const gulp = require('gulp'),
      less = require('gulp-less'),
      autoprefixer = require('gulp-autoprefixer'),
      del = require('del'),
      cleanCSS =  require('gulp-clean-css'),
      bs = require('browser-sync').create(),

gulp.task('styles', function() {
    return gulp.src('dev/*.less')
    .pipe(less())
    .pipe(autoprefixer())
    .pipe(cleanCSS())
    .pipe(gulp.dest('public'))
})

gulp.task('clean', function() {
    return del('public');
})

gulp.task('copy', function() {
    return gulp.src('dev/*.html', {since: gulp.lastRun('copy')} )
        .pipe(gulp.dest('public'))
})

gulp.task('build', gulp.series(
    'clean', 
    gulp.parallel('styles', 'copy')
));

gulp.task('watch', function() {
    gulp.watch('dev/*.*', gulp.series('styles'));
    gulp.watch('dev/*.*', gulp.series('copy'))
});

gulp.task('server', function() {
    bs.init({
        server: 'public'
    })
    bs.watch('public/*.*').on('change', bs.reload);
})

gulp.task('dev', gulp.series('build', gulp.parallel('watch', 'server')));