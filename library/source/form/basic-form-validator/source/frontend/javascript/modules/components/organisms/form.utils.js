import { patterns } from "../../../abstracts/constants/patterns";

export const regexValidator = (value) => {
  return new RegExp(patterns.email).test(value);
};

export const getFieldName = (input) => {
  const name = input.dataset.name ? input.dataset.name : input.id;
  return `${name.charAt(0).toUpperCase()}${name.slice(1)}`;
};
