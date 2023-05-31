const process = require("process");
/**
 * returns path to assets depending on the name of the environment
 * @param {*} path 
 * @param {*} resource 
 * @returns 
 */

module.exports = function (path, resource) {
    const processEnv = process.env.ENV_NAME;
    if (processEnv === "local-docker") {
        return `https://assets.localhost/${path}/${resource}`;
    }
};
