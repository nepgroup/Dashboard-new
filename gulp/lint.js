
var gulp = require('gulp');
var plugins = require('gulp-load-plugins');

var $ = plugins();

var lint = function (src, out) {
  return function () {
    return gulp.src(src.scripts.all)
      .pipe($.eslint())
      .pipe($.eslint.format())
      .pipe($.eslint.failAfterError());
  };
};

module.exports = {

  production: lint,

  staging: lint,

  development: lint,

  test: lint

};
