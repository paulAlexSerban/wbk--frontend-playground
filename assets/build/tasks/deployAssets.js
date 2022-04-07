import { src, dest } from "gulp";
import plumber from "gulp-plumber";
import size from 'gulp-size';

const assetsEntries = ["./assets/dist/*/*",];
const coreDist = "./core/dist/app/assets";

export const deployAssets = () => {
  return src(assetsEntries)
    .pipe(plumber())
    .pipe(size({
      title: 'DEPLOYED : ',
      showFiles: true,
      showTotal: true
    }))
    .pipe(dest(coreDist));
};