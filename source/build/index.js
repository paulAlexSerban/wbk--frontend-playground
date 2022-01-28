import { series, parallel } from 'gulp';
import { libraryCssTranspile, coreCssTranspile } from './tasks/cssTranspile';
import { libraryJsTranspile, coreJsTranspile } from './tasks/jsTranspile';
import { libraryEjsTranspile } from './tasks/libraryEjsTranspile';

const styleTranspile = series( 
  parallel(coreCssTranspile, libraryCssTranspile));

const jsTranspile = series( 
  parallel(coreJsTranspile, libraryJsTranspile));

const ejsTranspile = series( 
  parallel( libraryEjsTranspile )
)

export const build = series( parallel( ejsTranspile) )