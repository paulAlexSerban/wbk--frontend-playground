const { task, series, parallel, watch, src, dest, lastRun } = require("gulp");
const plumber = require("gulp-plumber");
const debug = require("gulp-debug");

// ---------------------------------------------------------------------
// | Helper tasks                                                      |
// ---------------------------------------------------------------------
const getCSS = () => {
  return src("../../frontend/living-style-guide/dist/**/*", { since: lastRun(getCSS) })
    .pipe(plumber())
    .pipe(debug({ title: "CSS : " }))
    .pipe(dest("public"));
};

const getJavaScript = () => {
  return src("../../frontend/js-component-library/dist/**/*", { since: lastRun(getJavaScript) })
    .pipe(plumber())
    .pipe(debug({ title: "JS : " }))
    .pipe(dest("public"));
};

const getAssets = () => {
  return src("../../assets/dist/**/*", { since: lastRun(getAssets) })
  .pipe(plumber())
  .pipe(debug({ title: "ASSETS : " }))
  .pipe(dest("public"));
}

// ---------------------------------------------------------------------
// | Main tasks                                                        |
// ---------------------------------------------------------------------

task("build", parallel(getJavaScript, getCSS, getAssets));

task("watch", () => {
  watch("../../frontend/js-component-library/dist/javascript/**/*", series(getJavaScript))
  watch("../../frontend/living-style-guide/dist/css/**/*", series(getCSS));
});
