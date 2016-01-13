'use strict';

var env = process.env.NODE_ENV || 'development';

console.info('\n\nRunning gulp in', env.toUpperCase(), 'environment\n\n')

var del = require('del');
var gulp = require('gulp');
var plugins = require('gulp-load-plugins');
var wiredep = require('wiredep');

var Server = require('karma').Server;

var $ = plugins();

var src = {
  assets: [ 'src/**/*', '!src/bower_components/**/*', '!src/scripts/**/*', '!src/styles/**/*', '!src/**/*.jade' ],
  jade: 'src/**/*.jade',
  libs: 'src/bower_components/**',
  config: 'config/' + env + '.js',
  styles: {
    folder: 'src/styles',
    all: 'src/styles/**/*.scss'
  },
  scripts: {
    all: 'src/scripts/**/*.js',
    app: 'src/scripts/app.js'
  }
};

var out = {
  libs: 'build/bower_components/',
  index: 'build/index.html',
  config: 'build/scripts/config.js',
  folder: 'build/',
  styles: {
    file: 'main.css',
    folder: 'build/styles/'
  },
  scripts: {
    file: 'app.js',
    folder: 'build/scripts/'
  }
}

var task = function (file) {
  return require('./gulp/' + file)[env](src, out);
}

gulp.task('jade', ['styles', 'scripts'], task('jade'));
gulp.task('libs', task('libs'));
gulp.task('lint', task('lint'));
gulp.task('assets', task('assets'));
gulp.task('styles', task('styles'));
gulp.task('config', task('config'));
gulp.task('scripts', ['lint', 'config'], task('scripts'));

gulp.task('serve', ['build', 'watch'], function() {
  $.connect.server({
    root: out.folder,
    port: 9000,
    livereload: true,
    fallback: out.index
  });
});

gulp.task('watch', function() {
  gulp.watch(src.libs, ['libs']);
  gulp.watch(src.jade, ['jade']);
  gulp.watch(src.config, ['config']);
  gulp.watch(src.styles.all, ['styles']);
  gulp.watch(src.scripts.all, ['scripts']);
})

gulp.task('build', ['scripts', 'styles', 'jade', 'libs', 'assets']);
gulp.task('default', ['serve']);

gulp.task('test', function (done) {
  new Server({
    configFile: __dirname + '/karma.conf.js',
    action: 'run',
    files: wiredep({ devDependencies: true }).js.concat([
      'config/test.js',
      'src/scripts/**/*.js',
      'test/**/*.test.js'
    ])
  }, done).start();
});
