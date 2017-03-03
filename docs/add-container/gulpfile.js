const gulp = require('gulp');
const libsass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const sourcemaps = require('gulp-sourcemaps');

// SASS Task
gulp.task('sass', function () {  
  return gulp.src('scss/*.scss')  
      .pipe(sourcemaps.init())
      .pipe(libsass({
        outputStyle: 'compressed', 
        precision: 7
      }).on('error', libsass.logError))  
      .pipe(sourcemaps.write('../sourcemaps'))
      .pipe(gulp.dest('css'))
      .pipe(browserSync.stream());
});

// SERVER Task
gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: './'
    },
    open: true,
    notify: false
  });
});

// WATCH Task
gulp.task('watch', function () {
  gulp.watch('scss/*.scss', ['sass']);
  gulp.watch('*.html').on('change', browserSync.reload);
});

// Default Task
gulp.task('default', [
  'sass', 
  'browserSync', 
  'watch',
]);  