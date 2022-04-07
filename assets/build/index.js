import { task, parallel, series } from "gulp";
import { compileIcons } from "./tasks/compileIcons";
import { createImageRenditions } from "./tasks/createImageRenditions";
import { compileSvgs } from "./tasks/compileSvgs";
import { deployAssets } from "./tasks/deployAssets";
import { cleanAssets } from "./tasks/cleanAssets";

task("clean", cleanAssets);
task(
  "compile",
  series("clean", parallel(compileIcons, createImageRenditions, compileSvgs))
);

task("deploy", series("compile", deployAssets));

task("site", series("compile", deployAssets));
