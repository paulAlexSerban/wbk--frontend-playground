export const JSLoader =     {
  test: /\.m?js$/,
  exclude: /(node_modules|bower_components)/,
  use: {
    loader: 'babel-loader',
    options: {
      presets: [['@babel/preset-env', { useBuiltIns: 'usage', corejs: 3 }]],
      plugins: ['@babel/plugin-transform-runtime', '@babel/plugin-proposal-object-rest-spread'],
    },
  },
}