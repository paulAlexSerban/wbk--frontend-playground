import glob from 'glob';
import path from 'path';

/**
 * Finds module configuration files and returns their path if they exist
 * @param { string } module 
 * @returns 
 */
const getModuleConfig = (module) => {
  const configFilePath = glob.sync(path.join(__dirname, `../../${module}/${module}.config.js`))[0];
  return require(configFilePath);
}

/**
 * 
 * @param { string } modulePaths 
 * @param { string } fileType 
 * @returns 
 */
const getPathByModuleConfig = (modulePaths, fileType) => {
  const pathPattern =  `${modulePaths['source']}/*.${fileType}`;
  const paths = [];
  if(modulePaths["type"] === "core") {
    for(let item of glob.sync(pathPattern)) {
      paths.push({
        src: item,
        dist: `${item.split('/').splice(0, 1).join('/')}/public`
      })
    }
  } else if (modulePaths["type"] === "library") {
    for(let item of glob.sync(pathPattern)) {
      paths.push({
        src: item,
        dist: `${item.split('/').splice(0, 3).join('/')}/dist`
      })
    }
  }

  return paths
}

const getPaths = (fileType) => {
  const paths = [];
  for(let item of glob.sync(`library/*/*/*/*/*/*.${fileType}`)) {
    paths.push({
      src: item,
      dist: `${item.split('/').splice(0, 3).join('/')}/dist`,
    })
  }
  return paths;
}

export const jsPaths = getPaths('js');

export const coreJsPaths = getPathByModuleConfig(getModuleConfig('core').config, 'js');
export const coreScssPaths = getPathByModuleConfig(getModuleConfig('core').config, 'scss');

export const libraryJsPaths = getPathByModuleConfig(getModuleConfig('library').config, 'js');
export const libraryScssPaths = getPathByModuleConfig(getModuleConfig('library').config, 'scss');

export const libraryEjsPaths = getPathByModuleConfig(getModuleConfig('library').config, 'ejs');