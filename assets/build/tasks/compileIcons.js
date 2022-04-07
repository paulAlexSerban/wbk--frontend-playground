import { src, dest } from "gulp";
import plumber from "gulp-plumber";

const iconEntries = "./assets/source/icons/*";
const iconDistDir = "./assets/dist/icons";

export const compileIcons = () => {
  return src(iconEntries)
    .pipe(plumber())
    .pipe(dest(iconDistDir));
};