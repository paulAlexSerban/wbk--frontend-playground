import { src, dest } from 'gulp';
import gulpWebpack from 'webpack-stream';
import webpack from 'webpack';
import named from 'vinyl-named';
import { webpackConfig } from '../config/webpack.config';
import { jsPaths } from '../config/paths';

export const jsTranspile = (cb) => {
  jsPaths.forEach((item) => {
    src(item['src'])
    .pipe(named())
    .pipe(gulpWebpack( webpackConfig, webpack))
    .pipe(dest(item['dist']))
  })
  cb();
}