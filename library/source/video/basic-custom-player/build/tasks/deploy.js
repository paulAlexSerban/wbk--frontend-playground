import { src, dest, lastRun } from "gulp";
import plumber from "gulp-plumber";
import size from "gulp-size";
import { paths } from "../config/paths";
import { PROJECT_PATH } from "../config/constants";

export const deploy = () => {
  return src([
    `${paths.dist.distDir}/${PROJECT_PATH}/*`,
    `${paths.dist.distDir}/${PROJECT_PATH}/*/*`,
  ])
    .pipe(plumber())
    .pipe(
      size({
        title: "DEPLOYED : ",
        showFiles: true,
        showTotal: true,
      })
    )
    .pipe(dest(paths.dist.coreDist));
};
