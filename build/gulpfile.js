const gulp = require('gulp')
const del = require('del')
const pug = require('gulp-pug')
const plumber = require('gulp-plumber')
const postcss = require('gulp-postcss')
const express = require('express')

const paths = {
  templates: {
    src: 'views/**/*.pug',
    dest: 'dist',
  },
  scripts: {
    src: 'scripts/*.js',
    dest: 'dist/js',
  },
  styles: {
    src: 'css/main.css',
    dest: 'dist/css',
  },
}

function clean() {
  return del('dist', { force: true })
}

function templates() {
  return gulp
    .src(paths.templates.src, { since: gulp.lastRun(templates) })
    .pipe(plumber())
    .pipe(pug())
    .pipe(gulp.dest(paths.templates.dest))
}

function styles() {
  return gulp
    .src(paths.styles.src, { since: gulp.lastRun(styles) })
    .pipe(plumber())
    .pipe(postcss())
    .pipe(gulp.dest(paths.styles.dest))
}

function scripts() {
  return gulp
    .src(paths.scripts.src, { since: gulp.lastRun(scripts) })
    .pipe(plumber())
    .pipe(gulp.dest(paths.scripts.dest))
}

function watch() {
  gulp.watch(paths.templates.src, templates)
  gulp.watch(paths.scripts.src, scripts)
  gulp.watch(paths.styles.src, styles)

  const devServer = express()
  devServer.use(express.static('public'))
  devServer.use(express.static('dist'))
  devServer.listen(3000, () => {
    console.log('Server running at http://localhost:3000')
  })
}

const make = gulp.series(clean, gulp.parallel(templates, styles, scripts))

exports.make = make
exports.start = gulp.series(make, watch)
