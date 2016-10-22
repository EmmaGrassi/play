require('babel-register')
//require('babel-polyfill')

var gulp = require('gulp')
var seq = require('run-sequence')

require('./gulp/tasks/babel')
require('./gulp/tasks/clean')
require('./gulp/tasks/copy')
require('./gulp/tasks/images')
require('./gulp/tasks/less')
require('./gulp/tasks/minify')
require('./gulp/tasks/mocha')
require('./gulp/tasks/server')
require('./gulp/tasks/webpack')

gulp.task('develop', function(cb) {
  seq(
    'clean',

    [
      'babel:compile',
      'copy:compile',
      'images:compile',
      'less:compile',
    ],

    'mocha:istanbul',

    [
      'babel:watch',
      'copy:watch',
      'images:watch',
      'less:watch',
      'mocha:watch',
      'server:run',
      'webpack:dev-server',
    ],

    cb
  )
})

gulp.task('production', function(cb) {
  seq(
    'clean',

    [
      'babel:compile',
      'copy:compile',
      'images:compile',
      'less:compile',
    ],

    'webpack:compile',

    [
      'html:minify',
      'javascript:minify',
    ],

    cb
  )
})
