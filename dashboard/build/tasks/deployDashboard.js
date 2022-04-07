import { src, dest } from "gulp";
import plumber from "gulp-plumber";
import size from 'gulp-size';

const assetsEntries = ["./dashboard/dist/*",];
const coreDist = "./core/dist/app";

export const deployDashboard = () => {
  return src(assetsEntries)
    .pipe(plumber())
    .pipe(size({
      title: 'DEPLOYED : ',
      showFiles: true,
      showTotal: true
    }))
    .pipe(dest(coreDist));
};