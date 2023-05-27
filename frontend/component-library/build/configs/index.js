const babel = require("./babel");
const handlebars = require("./handlebars");
const scss = require("./scss");
const assets = require("./assets");
const paths = require("./paths");

module.exports = { paths, tasks: [babel, handlebars, scss, assets] };
