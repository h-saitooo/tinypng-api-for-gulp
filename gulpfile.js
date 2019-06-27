/* Load Modules */
const gulp       = require('gulp')
const plumber    = require('gulp-plumber')
const notify     = require('gulp-notify')
const cached     = require('gulp-cached')
const tinypng    = require('gulp-tinypng-compress')

/* Target Sources */
const IMG_SRC  = `./src/img/**/*{png, jpg, jpeg, svg}`
const IMG_DEST = './dist/img/'

/* Third Party Services API KEYS */
const apikey = {
  tinypng: ''
}

gulp.task('image_compress', () => {
  return gulp.src(IMG_SRC, {
    since: gulp.lastRun(gulp.task('image_compress'))
  })
  .pipe(plumber({
    errorHandler: notify.onError('Error: <%= error.message %>')
  }))
  .pipe(cached('image_compress'))
  .pipe(tinypng({
    key: apikey.tinypng
  }))
  .pipe(gulp.dest(IMG_DEST))
})

gulp.task('watch', done => {
  gulp.watch([IMG_SRC], gulp.series('image_compress', 'reload'))
  done()
})

gulp.task('default', gulp.series(
  'image_compress'
))
