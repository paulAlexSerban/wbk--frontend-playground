const path = require('path');
const handlebars = {
    // use handlebars to compile HTML templates
    test: /\.hbs$/,
    use: [
        {
            loader: 'handlebars-loader',
            options: {
                knownHelpersOnly: false
            },
        },
    ],
};

module.exports = handlebars;
