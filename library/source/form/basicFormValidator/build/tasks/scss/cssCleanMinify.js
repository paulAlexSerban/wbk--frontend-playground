import { src, dest, lastRun } from "gulp";
import minifyCSS from "gulp-clean-css";
import { paths } from "../../config/paths";
import plumber from "gulp-plumber";
import rename from "gulp-rename";
// import debug from "gulp-debug";
import { PROJECT_PATH } from "../../config/constants";

export const cssCleanMinify = () => {
  return src(paths.src.css.rawCssEntries, { since: lastRun(cssCleanMinify) })
    .pipe(plumber())
    // .pipe(debug({ title: "cssCleanMinify :" }))
    .pipe(
      minifyCSS({ 
        debug: true
      }, (details) => {
        const originalSize = (details.stats.originalSize / 1024).toFixed(2);
        const minifiedSize = (details.stats.minifiedSize / 1024).toFixed(2);
        console.log(`${details.name} - ${originalSize} Kb to ${minifiedSize} Kb`);
      })
    )
    .pipe(
      rename((file) => {
        file.basename = `${file.basename}.min`;
        file.dirname = `${PROJECT_PATH}/styles`;
      })
    )
    .pipe(dest(`${paths.dist.distDir}`));
};
