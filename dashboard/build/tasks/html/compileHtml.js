import { src, dest } from "gulp";
import htmlmin from "gulp-htmlmin";
import plumber from "gulp-plumber";

export const compileHtml = () => {
  return (
    src('./dashboard/source/index.html',)
      .pipe(plumber())
      .pipe(htmlmin({ collapseWhitespace: true }))
      .pipe(dest('./dashboard/dist'))
  );
};
