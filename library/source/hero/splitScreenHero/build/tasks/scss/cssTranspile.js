import { src, dest } from "gulp";
import { paths } from "../../config/paths";
import dartSass from "dart-sass";
import gulpSass from "gulp-sass";
import rename from "gulp-rename";
import { PROJECT_PATH } from "../../config/constants";
// import debug from "gulp-debug";
import plumber from "gulp-plumber";
import postcss from "gulp-postcss";
import autoprefixer from "autoprefixer";

const sass = gulpSass(dartSass);
const plugins = [autoprefixer()];

export const cssTranspile = () => {
  return src(paths.src.css.scssEntries)
    .pipe(plumber())
    .pipe(sass.sync().on("error", sass.logError))
    .pipe(postcss(plugins))
    .pipe(rename((file) => {
        file.dirname = `${PROJECT_PATH}/styles/.tmp`;
    }))
    // .pipe(debug({ title: "cssTranspile : " }))
    .pipe(dest(paths.dist.distDir));
};
