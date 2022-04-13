/* eslint-disable import/no-unresolved */
import { task, series, parallel, watch } from "gulp";
import { paths } from "./config/paths";
import { PROJECT_PATH } from "./config/constants";
import { lintHtml } from "./tasks/html/lintHtml";
import { lintScss } from "./tasks/scss/lintScss";
import { lintJs } from "./tasks/javascript/lintJs";
import { buildHtml } from "./tasks/html/buildHtml";
import { cssTranspile } from "./tasks/scss/cssTranspile";
import { cssCleanMinify } from "./tasks/scss/cssCleanMinify";
import { jsTranspileProd, jsTranspileDev } from "./tasks/javascript/jsTranspile";
import { cleanLibrary } from "./tasks/cleanLibrary";
import { removeTemporaryFiles } from "./tasks/removeTemporaryFiles";
import { deploy } from "./tasks/deploy";

task("clean", cleanLibrary);

task("lint:markup", lintHtml);
task("lint:styles", lintScss);
task("lint:scripts", lintJs);
task("lint", parallel("lint:markup", "lint:styles", "lint:scripts"));

task("build:markup", buildHtml);
task("build:styles", cssTranspile);
task("build:scripts:dev", jsTranspileDev);
task("build:scripts:prod", jsTranspileProd);
task("build", parallel("build:markup", "build:styles", "build:scripts:dev"));

task("minify:styles", series(cssCleanMinify));
task("minify", series(parallel("minify:styles"), removeTemporaryFiles));
task("compile", series("clean", "lint", "build", "minify"));
task("deploy", series("compile", deploy));

task("watch:rotatingNavigation", () => {
  watch(paths.src.js.jsFiles, series("lint:scripts", "build:scripts:dev"));
  watch(
    [...paths.src.css.scssFiles, ...paths.src.css.scssWatchFiles],
    series("lint:styles", "build:styles", "minify:styles")
  );
  watch(paths.src.html.htmlFiles, series("lint:markup", "build:markup"));
  watch(
    [
      `${paths.dist.distDir}/${PROJECT_PATH}/*`,
      `${paths.dist.distDir}/${PROJECT_PATH}/*/*`,
    ],
    deploy
  );
});

const cwd = (cb) => {
  console.log('CWD -> ',paths.cwd);
  cb();
};

task("site", series(cwd, "lint:markup", "lint:styles", "lint:scripts", "build:markup", "build:styles", "build:scripts:prod", "minify", deploy));
