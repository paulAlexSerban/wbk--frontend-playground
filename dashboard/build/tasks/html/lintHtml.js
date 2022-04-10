import { src } from "gulp";
import lint from "gulp-htmllint";
import {red, cyan, white} from "ansi-colors";
import plumber from "gulp-plumber";

export const lintHtml = () => {
  return src('./dashboard/source/app/html/*.html')
    .pipe(plumber())
    .pipe(lint({}, htmlLintReporter));
};

function htmlLintReporter(filepath, issues) {
  if (issues.length > 0) {
    issues.forEach(function (issue) {
      console.log(cyan(" [ HTML Lint ] "), red(`(${issue.code}) ${issue.msg}`));
      console.log(white(`${filepath} [${issue.line},${issue.column}]`));
    });
    process.exitCode = 1;
  }
}
