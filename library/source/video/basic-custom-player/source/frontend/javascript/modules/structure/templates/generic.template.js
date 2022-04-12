import { customplayer } from '../../components/organisms/customplayer.organism';

export const genericTemplate = () => {

  document.querySelectorAll('[data-js-component="CustomPlayer"]').forEach((el) => {
    customplayer(el);
  });
};
