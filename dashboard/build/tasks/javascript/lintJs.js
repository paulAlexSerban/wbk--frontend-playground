import { src } from "gulp";
import eslint from "gulp-eslint";
import plumber from "gulp-plumber";
// import debug from "gulp-debug";

const PARENT_DIR = "dashboard/source";
const SRC_DIR = `source`;

const jsFiles = [
  `./${PARENT_DIR}/${SRC_DIR}/frontend/javascript/abstracts/*/*.js`,
  `./${PARENT_DIR}/${SRC_DIR}/frontend/javascript/modules/components/*/*.js`,
  `./${PARENT_DIR}/${SRC_DIR}/frontend/javascript/modules/structure/*/*.js`,
];

// JavaScript Linting
export const lintJs = () => {
  return src(jsFiles)
    .pipe(plumber())
    .pipe(eslint())
    // .pipe(debug({ title: "lintJs : ", minimal: false }))
    .pipe(
      eslint.results((results) => {
        console.log(`Total Results: ${results.length}`);
        console.log(`Total Warnings: ${results.warningCount}`);
        console.log(`Total Errors: ${results.errorCount}`);
      })
    )
    .pipe(eslint.format());
};
