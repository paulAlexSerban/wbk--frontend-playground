import {src, dest} from 'gulp';
import gulpWebpack from 'webpack-stream';
import webpack from 'webpack';
import { webpackProdConfig } from '../../config/webpack.prod';
import plumber from 'gulp-plumber';
import rename from "gulp-rename";
import through from 'through';
import path from "path";
import debug from 'gulp-debug';

const PARENT_DIR = "dashboard";
const SRC_DIR = `source`;

const jsEntries = `./${PARENT_DIR}/${SRC_DIR}/frontend/javascript/modules/structure/pages/*.page.js`;
const distDir = "./dashboard/dist";

export const jsTranspileProd = () => {
  return src(jsEntries)
    .pipe(plumber())
    .pipe(debug({ title: "jsTranspile : ", minimal: false }))
    .pipe(through(function(file) {
      const relative = path.relative('.', file.path);
      file.named = relative;
      this.queue(file);
    }))
    .pipe(gulpWebpack( webpackProdConfig, webpack))
    .pipe(rename((file) => {
      file.dirname = `javascript`;
      const filename = file.basename.split('.');
      filename.pop();
      file.basename = filename.join('.');
    }))
    .pipe(dest(distDir));
};
