import { src, dest } from 'gulp';
import gulpWebpack from 'webpack-stream';
import webpack from 'webpack';
import named from 'vinyl-named';
import { webpackConfig } from '../config/webpack.config';
import { libraryJsPaths, coreJsPaths } from '../config/paths';

export const libraryJsTranspile = (cb) => {
  libraryJsPaths.forEach((item) => {
    src(item['src'])
    .pipe(named())
    .pipe(gulpWebpack( webpackConfig, webpack))
    .pipe(dest(item['dist']))
  })
  cb();
}

export const coreJsTranspile = (cb) => {
  coreJsPaths.forEach((item) => {
    src(item['src'])
    .pipe(named())
    .pipe(gulpWebpack( webpackConfig, webpack))
    .pipe(dest(item['dist']))
  })
  cb();
}