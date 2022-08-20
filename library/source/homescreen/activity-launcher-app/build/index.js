/* eslint-disable import/no-unresolved */
import { task, series, parallel, watch } from "gulp";
import { paths } from "./config/paths";
import { PROJECT_PATH, PROJECT_NAME } from "./config/constants";
import { lintHtml } from "./tasks/html/lintHtml";
import { lintScss } from "./tasks/scss/lintScss";
import { lintJs } from "./tasks/javascript/lintJs";
import { buildHtml } from "./tasks/html/buildHtml";
import { cssTranspile } from "./tasks/scss/cssTranspile";
import { cssCleanMinify } from "./tasks/scss/cssCleanMinify";
import {
  jsTranspileProd,
  jsTranspileDev,
} from "./tasks/javascript/jsTranspile";
import { cleanLibrary } from "./tasks/cleanLibrary";
import { removeTemporaryFiles } from "./tasks/removeTemporaryFiles";

task("clean", cleanLibrary);

task("lint:markup", lintHtml);
task("lint:styles", lintScss);
task("lint:scripts", lintJs);
task("lint", parallel("lint:markup", "lint:styles", "lint:scripts"));

task("build:markup", series(lintHtml, buildHtml));
task("build:styles", series(lintScss, cssTranspile, cssCleanMinify));
task("build:scripts:dev", series(lintJs, jsTranspileDev));
task("build:scripts:prod", series(lintJs, jsTranspileProd));
task(
  "build",
  series(
    "clean",
    parallel("build:markup", "build:styles", "build:scripts:dev"),
    removeTemporaryFiles
  )
);
task(
  "build:prod",
  series(
    "clean",
    parallel("build:markup", "build:styles", "build:scripts:prod"),
    removeTemporaryFiles
  )
);

task(`build:${PROJECT_NAME}`, series("build"));

task(`watch:${PROJECT_NAME}`, () => {
  watch(paths.src.js.jsFiles, series("lint:scripts", "build:scripts:dev"));
  watch(
    [...paths.src.css.scssFiles, ...paths.src.css.scssWatchFiles],
    series("lint:styles", "build:styles", "minify:styles")
  );
  watch(paths.src.html.htmlFiles, series("lint:markup", "build:markup"));
  watch([
    `${paths.dist.distDir}/${PROJECT_PATH}/*`,
    `${paths.dist.distDir}/${PROJECT_PATH}/*/*`,
  ]);
});
