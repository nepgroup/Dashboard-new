
var del = require('del');
var gulp = require('gulp');
var wiredep = require('wiredep');
var plugins = require('gulp-load-plugins');

var $ = plugins();

var injectStream = function (src) {
  return gulp.src(src.scripts.all, {
      read: false
    })
    .pipe($.rename({ extname: '.js' }));
};

var jade = function (src, out) {
  return function () {
    return gulp.src(src.jade)
      .pipe($.jade())
      .pipe(wiredep.stream({ ignorePath: /^(\.\.\/)+/ }))
      .pipe($.inject(injectStream(src), { relative: true }))
      .pipe($.usemin({
        js: [ $.uglify(), $.rev() ],
        es6: [ $.babel(), $.ngAnnotate(), $.rev() ],
        css: [ $.minifyCss(), $.rev() ],
        sass: [ $.rev() ]
      }))
      .pipe(gulp.dest(out.folder).on('end', function () {
        return del([out.config, out.libs], { force: true });
      }))
      .pipe($.connect.reload());
  };
};

var jadeDev = function (src, out) {
  return function () {
    return gulp.src(src.jade)
      .pipe($.jade({ pretty: true }))
      .pipe(wiredep.stream({ ignorePath: /^(\.\.\/)+/ }))
      .pipe($.inject(injectStream(src), { relative: true }))
      .pipe(gulp.dest(out.folder))
      .pipe($.connect.reload());
  };
};

module.exports = {

  production: jade,

  staging: jade,

  development: jadeDev,

  test: jadeDev

};

