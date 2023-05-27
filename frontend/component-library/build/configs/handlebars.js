const handlebars =             {
  // use handlebars to compile HTML templates
  test: /\.hbs$/,
  use: [
      {
          loader: "handlebars-loader",
          options: {
              // helperDirs: path.resolve(__dirname, "../src/helpers"),
              // partialDirs: path.resolve(__dirname, "../src/partials"),
              // precompileOptions: {
              //     knownHelpersOnly: false,
              // },
              // runtime: path.resolve(__dirname, "../src/helpers/handlebars.js"),
              // data: path.resolve(__dirname, "../src/data/data.json"),
              // inlineRequires: "/images/",
              // rootRelative: "../../src/",
          }
      },
  ],
};

module.exports = handlebars;