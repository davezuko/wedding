require('dotenv').config()
const path = require('path')
const gulp = require('gulp')
const when = require('gulp-if')
const rev = require('gulp-rev')

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

const IS_PROD = process.env.NODE_ENV === 'production'

function plumber() {
  return when(!IS_PROD, require('gulp-plumber')())
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
    .pipe(when(IS_PROD, rev()))
    .pipe(gulp.dest(paths.styles.dest))
    .pipe(when(IS_PROD, rev.manifest()))
    .pipe(when(IS_PROD, gulp.dest(paths.styles.dest)))
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
    .pipe(when(IS_PROD, rev()))
    .pipe(gulp.dest(paths.scripts.dest))
    .pipe(when(IS_PROD, rev.manifest()))
    .pipe(when(IS_PROD, gulp.dest(paths.scripts.dest)))
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

exports.clean = clean
exports.make = gulp.series(gulp.parallel(styles, scripts))
exports.start = gulp.series(styles, gulp.parallel(scripts, watch))
