import { src } from "gulp";
import gulpStylelint from "@ronilaukkarinen/gulp-stylelint";
// import debug from "gulp-debug";
import plumber from "gulp-plumber";

const scssFiles = [`./dashboard/source/frontend/scss/*/*/*/*.scss`];

export const lintScss = () => {
  return (
    src(scssFiles)
      .pipe(plumber())
      // .pipe(debug({ title: "lintScss : ", minimal: false}))
      .pipe(
        gulpStylelint({
          reporters: [{ formatter: "string", console: true }],
        })
      )
  );
};
