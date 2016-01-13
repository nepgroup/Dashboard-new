
var del = require('del');
var gulp = require('gulp');
var plugins = require('gulp-load-plugins');

var $ = plugins();

var config = function (src, out) {
  return function (done) {
    del(out.config, { force: true })
      .then(function () {
        gulp.src(src.config)
          .pipe($.rename('config.js'))
          .pipe(gulp.dest(out.scripts.folder))
          .pipe($.connect.reload().on('end', done));
      });
  };
};

module.exports = {

  production: config,

  staging: config,

  development: config,

  test: config

};
