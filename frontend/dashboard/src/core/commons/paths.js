const { env } = require("process");

console.log("env.INTERNAL_COMPONENT_LIBRARY_URL", env);

const paths = {
    internalComponentLibraryUrl: env.INTERNAL_COMPONENT_LIBRARY_URL,
    userComponentLibraryUrl: env.USER_COMPONENT_LIBRARY_URL,
};

export default paths;