import { src, dest } from "gulp";
import plumber from "gulp-plumber";
import size from "gulp-size";

const vendorEntries = ["./dashboard/source/frontend/javascript/modules/vendors/*.js"];
const distDir = "./dashboard/dist/javascript";

export const getVendors = () => {
  return src(vendorEntries)
    .pipe(plumber())
    .pipe(
      size({
        title: "DEPLOYED : ",
        showFiles: true,
        showTotal: true,
      })
    )
    .pipe(dest(distDir));
};
