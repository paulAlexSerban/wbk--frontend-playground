const path = require('path');
const handlebars = {
    // use handlebars to compile HTML templates
    test: /\.hbs$/,
    use: [
        {
            loader: 'handlebars-loader',
            options: {
                knownHelpersOnly: false,
                helperDirs: path.resolve(__dirname, '../helpers/handlebars'),
                partialDirs: [
                    path.resolve(__dirname, '../../src/_partials')
                ],
            },
        },
    ],
};

module.exports = handlebars;
