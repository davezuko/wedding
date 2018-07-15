require('dotenv').config()
const path = require('path')
const gulp = require('gulp')
const when = require('gulp-if')

const paths = {
  scripts: {
    src: ['assets/js/**/main.js'],
    dest: 'dist/js',
  },
  styles: {
    src: 'assets/css/main.css',
    watch: 'assets/css/**/*.css',
    dest: 'dist/css',
  },
}

function plumber() {
  return when(process.env.NODE_ENV !== 'production', require('gulp-plumber')())
}

function clean() {
  return require('del')(['dist'], {force: true})
}

function styles() {
  const postcss = require('gulp-postcss')

  return gulp
    .src(paths.styles.src)
    .pipe(plumber())
    .pipe(postcss())
    .pipe(gulp.dest(paths.styles.dest))
}

function scripts() {
  const webpack = require('webpack')
  const webpackStream = require('webpack-stream')
  const named = require('vinyl-named-with-path')

  return gulp
    .src(paths.scripts.src)
    .pipe(plumber())
    .pipe(named())
    .pipe(webpackStream(require('./webpack.config'), webpack))
    .pipe(gulp.dest(paths.scripts.dest))
}

function watch() {
  const gaze = require('gaze')
  const tinylr = require('tiny-lr')

  // Start dev server
  require('../bin/start')

  // Watch for file changes
  gulp.watch(paths.styles.watch, styles)
  gaze('dist/**/*', function() {
    this.on('changed', function(absoluteFilepath) {
      const filepath = absoluteFilepath.replace(/.*dist\//, '')
      tinylr.changed(filepath)
    })
  })
}

exports.make = gulp.series(clean, gulp.parallel(styles, scripts))
exports.start = gulp.series(clean, styles, gulp.parallel(scripts, watch))
