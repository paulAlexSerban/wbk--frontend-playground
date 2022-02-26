import { series } from 'gulp';
import { exec } from 'child_process';
import { join } from 'path';

const execNpmInstall = (plugin, cb) => {
  exec(`cd ${join(__dirname, plugin)} && npm install`, (err, stdout, stderr) => {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  })
}
 
const coreNpmInstall = (cb) => execNpmInstall('core', cb);
const dashboardNpmInstall = (cb) => execNpmInstall('dashboard', cb);
const libraryNpmInstall = (cb) => execNpmInstall('library', cb);

export const npmInstall = series(coreNpmInstall, dashboardNpmInstall, libraryNpmInstall)