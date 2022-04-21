import { blank } from '../../components/organisms/blank.organism';

export const genericTemplate = () => {

  document.querySelectorAll('[data-js-component="Blank"]').forEach((el) => {
    blank(el);
  });
};
