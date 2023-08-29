const gulp = require("gulp");
const concat = require("gulp-concat");

const bundleJS = () => {
  return gulp
    .src(["build/static/js/*.js"])
    .pipe(concat("bundle.js"))
    .pipe(gulp.dest("build/static/js"));
};

const bundleCSS = () => {
  return gulp
    .src(["build/static/css/*.css"])
    .pipe(concat("bundle.css"))
    .pipe(gulp.dest("build/static/css"));
};


exports.default = gulp.series(bundleCSS, bundleJS);
