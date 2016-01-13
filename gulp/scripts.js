
var gulp = require('gulp');
var plugins = require('gulp-load-plugins');

var $ = plugins();

var scripts = function (src, out) {
  return function () {
    return;
  };
};

var libsDev = function (src, out) {
  return function () {
    return gulp.src(src.scripts.all)
      .pipe($.babel())
      .pipe(gulp.dest(out.scripts.folder))
      .pipe($.connect.reload());
  };
};

module.exports = {

  production: scripts,

  staging: scripts,

  development: libsDev,

  test: libsDev

};
