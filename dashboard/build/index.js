import { task, series } from "gulp";
import { cleanDashboard } from "./tasks/cleanDashboard";
import { lintHtml } from "./tasks/html/lintHtml";
import { compileHtml } from "./tasks/html/compileHtml";
import { deployDashboard } from "./tasks/deployDashboard";

task("clean", cleanDashboard);
task("compile", series("clean", lintHtml, compileHtml));
task("deploy", series("compile", deployDashboard));

task("site", series("compile", deployDashboard));