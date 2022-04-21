import del from "del";
import { paths } from "../config/paths";
import { PROJECT_PATH } from "../config/constants";

export const removeTemporaryFiles = () => {
  return del([`${paths.dist.distDir}/${PROJECT_PATH}/styles/.tmp`]);
};
