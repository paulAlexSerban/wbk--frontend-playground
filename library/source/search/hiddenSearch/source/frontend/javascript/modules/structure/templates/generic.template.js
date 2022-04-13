import { hiddenSearch } from '../../components/organisms/hiddenSearch.organism';

export const genericTemplate = () => {

  document.querySelectorAll('[data-js-component="HiddenSearch"]').forEach((el) => {
    hiddenSearch(el);
  });
};
