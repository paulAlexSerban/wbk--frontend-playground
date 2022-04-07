import { patterns } from "../../../abstracts/constants/patterns";

export const regexValidator = (value) => {
  return new RegExp(patterns.email).test(value);
};

export const getFieldName = (input) => {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
};
