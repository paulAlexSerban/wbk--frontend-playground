import { form } from '../../components/organisms/form.organism';

export const genericTemplate = () => {

  document.querySelectorAll('[data-js-component="Form"]').forEach((el) => {
    form(el);
  });
};
