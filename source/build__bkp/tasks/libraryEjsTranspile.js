import {src, dest} from 'gulp';
import { libraryEjsPaths } from '../config/paths';
import ejs from 'gulp-ejs';
import rename from 'gulp-rename';
export const libraryEjsTranspile = (cb) => {
  libraryEjsPaths.forEach((item) => {
    src(item['src'])
      .pipe(ejs({
        title: 'test title from gulp'
      }))
      .pipe(rename({ extname: '.html' }))
      .pipe(dest(item['dist']));
  })
  cb();
}