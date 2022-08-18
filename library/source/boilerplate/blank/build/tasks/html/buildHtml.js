import { src, dest, lastRun } from "gulp";
import { paths } from "../../config/paths";
import { PROJECT_PATH } from "../../config/constants";
import htmlmin from "gulp-htmlmin";
import rename from "gulp-rename";
import plumber from "gulp-plumber";
// import debug from "gulp-debug";
import embedSvg from "gulp-embed-svg";
import size from "gulp-size";

export const buildHtml = () => {
  return (
    src(paths.src.html.htmlFiles, { since: lastRun(buildHtml) })
      .pipe(plumber())
      .pipe(htmlmin({ collapseWhitespace: true }))
      .pipe(
        embedSvg({
          selectors: ".inline-svg",
          root: "../assets/dist/svgs",
          xmlMode: false,
        })
      )
      .pipe(
        rename((file) => {
          file.dirname = PROJECT_PATH;
        })
      )
      // .pipe(debug({title: 'buildHtml : '}))
      .pipe(
        size({
          title: "DEPLOYED : ",
          showFiles: true,
          showTotal: true,
        })
      )
      .pipe(dest([`${paths.dist.distDir}`]))
  );
};
