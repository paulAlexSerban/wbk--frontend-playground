import { series, parallel } from 'gulp';
import { cssTranspile } from './tasks/cssTranspile';
import { jsTranspile } from './tasks/jsTranspile';

const styleTasks = series( cssTranspile );
const jsTasks = series( jsTranspile );

export const build = series( parallel( styleTasks, jsTasks) )