import {src, dest, lastRun } from 'gulp';
import gulpWebpack from 'webpack-stream';
import webpack from 'webpack';
import { webpackDevConfig } from '../../config/webpack.dev';
import { webpackProdConfig } from '../../config/webpack.prod';
import { paths } from '../../config/paths';
import plumber from 'gulp-plumber';
import rename from "gulp-rename";
import through from 'through';
import path from "path";
import debug from 'gulp-debug';

export const jsTranspileDev = () => {
  return src(paths.src.js.jsEntries, { since: lastRun(jsTranspileProd) })
    .pipe(debug({title: 'jsTranspile :'}))
    .pipe(plumber())
    .pipe(through(function(file) {
        const relative = path.relative(".", file.path).split(".");
        relative.pop();
        file.named = relative.join(".");
        this.queue(file);
    }))
    .pipe(gulpWebpack( webpackDevConfig, webpack))
    .pipe(rename((file) => {
        const themeDir = file.dirname.split("/")[1];
        const projectDir = file.dirname.split("/")[2];
        file.dirname = `${themeDir}/${projectDir}/javascript`;
    }))
    .pipe(dest(paths.dist.distDir));
};

export const jsTranspileProd = () => {
  return src(paths.src.js.jsEntries)
    .pipe(plumber())
    .pipe(through(function(file) {
        const relative = path.relative(".", file.path).split(".");
        relative.pop();
        file.named = relative.join(".");
        this.queue(file);
    }))
    .pipe(gulpWebpack( webpackProdConfig, webpack))
    .pipe(rename((file) => {
        const themeDir = file.dirname.split("/")[1];
        const projectDir = file.dirname.split("/")[2];
        file.dirname = `${themeDir}/${projectDir}/javascript`;
    }))
    .pipe(dest(paths.dist.distDir));
};
