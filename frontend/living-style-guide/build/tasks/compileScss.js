import { src, dest, lastRun } from "gulp";
import { paths } from "../config/paths";
import dartSass from "dart-sass";
import gulpSass from "gulp-sass";
import rename from "gulp-rename";
import debug from "gulp-debug";
import plumber from "gulp-plumber";
import postcss from "gulp-postcss";
import autoprefixer from "autoprefixer";
import stripCssComments from "gulp-strip-css-comments";
import newer from "gulp-newer";
import prettier from "gulp-prettier";
import wait from "gulp-wait";
import { onError } from "../utils/onError";
import gulpif from "gulp-if";
import minifyCss from "gulp-minify-css";
import cleanCss from "gulp-clean-css";
import size from "gulp-size";
import remember from "gulp-remember";
import cached from "gulp-cached";

const sass = gulpSass(dartSass);
const plugins = [autoprefixer()];
const nodeEnv = process.env.NODE_ENV || "development";

export const compileScss = () => {
  return new Promise((resolve, reject) => {
    return (
      src([...paths.src.styles.scssPages, ...paths.src.styles.scssLayers, ...paths.src.styles.scssObjects], {
        since: lastRun(compileScss),
      })
        .pipe(newer(paths.dist.dir))
        .pipe(cached("compileScss"))
        .pipe(
          plumber({
            errorHandler: onError,
          })
        )
        .pipe(sass.sync().on("error", sass.logError))
        .pipe(postcss(plugins))
        .pipe(
          rename((file) => {
            const moduleType = file.basename.split(".")[1];
            file.dirname = `css/${moduleType}`;
          })
        )
        .pipe(
          cleanCss({
            level: {
              2: {
                restructureRules: true,
                removeDuplicateRules: true,
              },
            },
          })
        )
        // .pipe(debug({ title: "@debug compileScss : " }))
        .pipe(stripCssComments())
        .pipe(gulpif(nodeEnv !== "development", minifyCss()))
        .pipe(
          size({
            title: "compileScss : ",
            showFiles: true,
            showTotal: true,
          })
        )
        .pipe(remember("compileScss"))
        .pipe(dest(paths.dist.dir))
        .on("error", reject)
        .on("end", resolve)
    );
  });
};
