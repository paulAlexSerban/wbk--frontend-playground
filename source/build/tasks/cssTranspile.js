import dartSass from 'dart-sass';
import gulpSass from 'gulp-sass';
import autoprefixer from 'gulp-autoprefixer';
import { libraryScssPaths, coreScssPaths } from '../config/paths';
import {src, dest} from 'gulp';

const sass = gulpSass(dartSass);

export const libraryCssTranspile = (cb) => {
  libraryScssPaths.forEach((item) => {
    src(item['src'])
      .pipe(sass.sync({ outputStyle: 'compressed'}).on('error', sass.logError))
      .pipe(autoprefixer())
      .pipe(dest(item['dist']));
  })
  cb();
}

export const coreCssTranspile = (cb) => {
  coreScssPaths.forEach((item) => {
    src(item['src'])
      .pipe(sass.sync({ outputStyle: 'compressed'}).on('error', sass.logError))
      .pipe(autoprefixer())
      .pipe(dest(item['dist']));
  })
  cb();
}