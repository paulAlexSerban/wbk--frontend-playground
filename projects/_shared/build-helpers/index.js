const { createHandlebarsWebpackCommonConfig } = require('./src/setups/handlebars-webpack/common');
const { createHandlebarsWebpackDevConfig } = require('./src/setups/handlebars-webpack/dev');
const { createHandlebarsWebpackProdConfig } = require('./src/setups/handlebars-webpack/prod');

module.exports = {
    createHandlebarsWebpackCommonConfig,
    createHandlebarsWebpackDevConfig,
    createHandlebarsWebpackProdConfig,
    // Compatibility aliases for current wrappers.
    createCommonConfig: createHandlebarsWebpackCommonConfig,
    createDevConfig: createHandlebarsWebpackDevConfig,
    createProdConfig: createHandlebarsWebpackProdConfig,
};
