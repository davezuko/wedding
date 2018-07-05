require('dotenv').config()
const path = require('path')
const gulp = require('gulp')
const when = require('gulp-if')

const paths = {
  templates: {
    src: 'views/**/*.pug',
    watch: ['views/**/*.pug', 'layouts/**/*.pug'],
    dest: 'dist',
  },
  scripts: {
    src: ['js/**/main.js'],
    dest: 'dist/js',
  },
  styles: {
    src: 'css/main.css',
    watch: 'css/**/*.css',
    dest: 'dist/css',
  },
}

function plumber() {
  return when(process.env.NODE_ENV !== 'production', require('gulp-plumber')())
}

function clean() {
  return require('del')(['dist'], {force: true})
}

function templates() {
  const pug = require('gulp-pug')

  return gulp
    .src(paths.templates.src)
    .pipe(plumber())
    .pipe(
      pug({
        data: {
          development: process.env.NODE_ENV !== 'production',
        },
      })
    )
    .pipe(gulp.dest(paths.templates.dest))
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
  const express = require('express')
  const gaze = require('gaze')
  const tinylr = require('tiny-lr')

  gulp.watch(paths.templates.watch, templates)
  gulp.watch(paths.styles.watch, styles)

  const devServer = express()
  devServer.use(express.static('public'))
  devServer.use(express.static('dist', {extensions: ['html']}))
  devServer.use(tinylr.middleware({app: devServer}))
  devServer.listen(3000, () => {
    console.log('Server running at http://localhost:3000')
  })

  gaze('dist/**/*', function() {
    this.on('changed', function(absoluteFilepath) {
      const filepath = absoluteFilepath.replace(/.*dist\//, '')
      tinylr.changed(filepath)
    })
  })
}

exports.make = gulp.series(clean, gulp.parallel(templates, styles, scripts))
exports.start = gulp.series(
  clean,
  gulp.parallel(templates, styles),
  gulp.parallel(scripts, watch)
)
