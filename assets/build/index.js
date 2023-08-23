import { task, parallel, series } from "gulp";
import { clean } from "./tasks/clean";
import { processIcons } from "./tasks/processIcons";
import { processSvgs } from "./tasks/processSvgs";
import { createImageRenditions } from "./tasks/createImageRenditions";
import { processVideos } from "./tasks/processVideos";
import { processAudio } from "./tasks/processAudio";
import { processGifs } from "./tasks/processGifs";
import { processPngs } from "./tasks/processPngs";
// ---------------------------------------------------------------------
// | Helper tasks                                                      |
// ---------------------------------------------------------------------

// ---------------------------------------------------------------------
// | Main tasks                                                        |
// ---------------------------------------------------------------------
task(
  "process",
  series(
    // clean,
    parallel(
      processIcons,
      processSvgs,
      createImageRenditions,
      processVideos,
      processAudio,
      processGifs,
      processPngs
    )
  )
);

task();
