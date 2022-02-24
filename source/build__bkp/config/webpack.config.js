import webpack from "webpack";
import { JSLoader } from "../loaders/JSLoader"


const plugins = [
  new webpack.ProgressPlugin(),
]

export const webpackConfig = {
  mode: 'development',
  module: {
    rules: [
      JSLoader
    ]
  },
  plugins: [
    ...plugins
  ]
}