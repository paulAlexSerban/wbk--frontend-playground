import { rotatingNavigation } from '../../components/organisms/rotatingNavigation.organism';

export const genericTemplate = () => {

  document.querySelectorAll('[data-js-component="RotatingNavigation"]').forEach((el) => {
    rotatingNavigation(el);
  });
};
