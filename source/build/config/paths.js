import glob from 'glob';

const getPaths = (type) => {
  const paths = [];
  for(let item of glob.sync(`library/*/*/*/*/*/*.${type}`)) {
    paths.push({
      src: item,
      dist: `${item.split('/').splice(0, 3).join('/')}/dist`,
    })
  }
  return paths;
}

export const scssPaths = getPaths('scss');
export const jsPaths = getPaths('js');