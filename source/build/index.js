import { series, parallel } from 'gulp';
import { libraryCssTranspile, coreCssTranspile } from './tasks/cssTranspile';
import { libraryJsTranspile, coreJsTranspile } from './tasks/jsTranspile';

const styleTranspile = series( 
  parallel(coreCssTranspile, libraryCssTranspile));

const jsTranspile = series( 
  parallel(coreJsTranspile, libraryJsTranspile));

export const build = series( parallel( styleTranspile, jsTranspile ) )