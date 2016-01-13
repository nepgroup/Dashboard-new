
var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();

var libs = function (src, out) {
  return function () {
    return;
  };
};

var libsDev = function (src, out) {
  return function () {
    return gulp.src(src.libs)
      .pipe(gulp.dest(out.libs))
      .pipe(plugins.connect.reload());
  };
};

module.exports = {

  production: libs,

  staging: libs,

  development: libsDev,

  test: libsDev

};
