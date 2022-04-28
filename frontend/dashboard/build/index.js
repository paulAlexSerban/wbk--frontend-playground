import { task, series, parallel } from "gulp";
import { cleanDashboard } from "./tasks/cleanDashboard";
import { lintHtml } from "./tasks/html/lintHtml";
import { compileHtml } from "./tasks/html/compileHtml";
import { deployDashboard } from "./tasks/deployDashboard";
import { lintJs } from "./tasks/javascript/lintJs";
import { jsTranspileProd } from "./tasks/javascript/jsTranspile";
import { getVendors } from "./tasks/javascript/getVendors";
import { lintScss } from "./tasks/scss/lintScss";
import { cssTranspile } from "./tasks/scss/cssTranspile";

task("clean", cleanDashboard);

task("lint:markup", lintHtml);
task("lint:styles", lintScss);
task("lint:scripts", lintJs);
task("lint", parallel("lint:markup", "lint:styles", "lint:scripts"));

task("build:markup", compileHtml);
task("build:styles", cssTranspile);
task("build:scripts:prod", jsTranspileProd);
task("build", parallel("build:markup", "build:styles", "build:scripts:prod"));

task("get:vendors", getVendors);

task("compile", series("clean", "lint", "build", "get:vendors"));

task("deploy:dashboard", series("compile", deployDashboard));

task("deploy", series("deploy:dashboard"));

task("site", series("compile", deployDashboard));
