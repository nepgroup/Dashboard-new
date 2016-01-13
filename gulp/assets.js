
var gulp = require('gulp');

var assets = function (src, out) {
  return function () {
    return gulp.src(src.assets)
      .pipe(gulp.dest(out.folder));
  };
};

module.exports = {

  production: assets,
  staging: assets,
  development: assets,
  test: assets

};
