
require('es6-promise');
require('es6-set/implement');
require('es6-map/implement');

var gulp = require('gulp');
var plugins = require('gulp-load-plugins');
var reporter = require('postcss-reporter');
var stylelint = require('stylelint');
var autoprefixer = require('autoprefixer');

var $ = plugins();

var sassOptions = {
  outputStyle: 'expanded',
  precision: 10,
  includePaths: ['.']
};

var processors = [
  autoprefixer({
    browsers: [
      'last 3 version',
      '> 5%'
    ]
  }),
  stylelint({
    'rules': {
      'color-no-invalid-hex': 2,
      'declaration-colon-space-after': [2, 'always'],
      'declaration-colon-space-before': [2, 'never'],
      'number-leading-zero': [2, 'always'],
      'string-quotes': [2, 'double'],
      'rule-trailing-semicolon': [2, 'always']
    }
  }),
  reporter({
    clearMessages: true
  })
];

var styles = function (src, out) {
  return function () {
    return gulp.src(src.styles.all)
      .pipe($.plumber())
      .pipe($.sourcemaps.init())
      .pipe($.sass.sync(sassOptions).on('error', $.sass.logError))
      .pipe($.postcss(processors))
      .pipe($.sourcemaps.write())
      .pipe($.minifyCss())
      .pipe(gulp.dest(out.styles.folder))
      .pipe($.connect.reload());
  };
};

var stylesDev = function (src, out) {
  return function () {
    return gulp.src(src.styles.all)
      .pipe($.plumber())
      .pipe($.sourcemaps.init())
      .pipe($.sass.sync(sassOptions).on('error', $.sass.logError))
      .pipe($.postcss(processors))
      .pipe($.sourcemaps.write())
      .pipe(gulp.dest(out.styles.folder))
      .pipe($.connect.reload());
  };
};

module.exports = {

  production: styles,

  staging: styles,

  development: stylesDev,

  test: stylesDev

};
