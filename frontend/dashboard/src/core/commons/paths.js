const { env } = require("process");

const paths = {
    internalComponentLibraryUrl: env.INTERNAL_COMPONENT_LIBRARY_URL,
    userComponentLibraryUrl: env.USER_COMPONENT_LIBRARY_URL,
};

export default paths;