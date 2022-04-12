

import {
  SRC_DIR,
  DIST_DIR,
  PROJECT_NAME,
  PARENT_DIR,
  PROJECT_PATH
} from "./constants";

export const paths = {
  project: PROJECT_NAME,
  src: {
    html: {
      htmlFiles: `./${PARENT_DIR}/${SRC_DIR}/app/html/index/index.html`,
    },
    css: {
      scssFiles: [
        `./${PARENT_DIR}/${SRC_DIR}/frontend/scss/*/*/*/*.scss`,
      ],
      scssWatchFiles: [
        `./${PARENT_DIR}/${SRC_DIR}/frontend/scss/*/*.scss`,
        `./${PARENT_DIR}/${SRC_DIR}/frontend/scss/*/*/*.scss`,
        `./${PARENT_DIR}/${SRC_DIR}/frontend/scss/*/*/*/*.scss`,
        `./${PARENT_DIR}/${SRC_DIR}/frontend/scss/*/*/*/*/*.scss`,
        `./${PARENT_DIR}/${SRC_DIR}/frontend/scss/*/*/*/*/*/*.scss`,
      ],
      scssEntries: [
        `./${PARENT_DIR}/${SRC_DIR}/frontend/scss/modules/layout/pages/*.scss`,
      ],
      cssEntries: [
        `${DIST_DIR}/*/*/styles/.tmp/*.page.css`,
        `${DIST_DIR}/*/*/styles/.tmp/*.template.css`,
      ],
      rawCssEntries: `${DIST_DIR}/*/*/styles/.tmp/*.css`,
    },
    js: {
      jsFiles: [
        `./${PARENT_DIR}/${SRC_DIR}/frontend/javascript/abstracts/*/*.js`,
        `./${PARENT_DIR}/${SRC_DIR}/frontend/javascript/modules/components/*/*.js`,
        `./${PARENT_DIR}/${SRC_DIR}/frontend/javascript/modules/structure/*/*.js`,
      ],
      jsEntries: [
        `./${PARENT_DIR}/${SRC_DIR}/frontend/javascript/modules/structure/pages/*.page.js`,
      ],
    },
  },
  dist: {
    distDir: `${DIST_DIR}`,
    coreDist: `./core/dist/app/library/${PROJECT_PATH}`
  },
};
