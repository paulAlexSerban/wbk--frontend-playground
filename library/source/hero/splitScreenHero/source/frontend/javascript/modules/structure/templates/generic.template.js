import { splitScreenHero } from '../../components/organisms/splitScreenHero.organism';

export const genericTemplate = () => {

  document.querySelectorAll('[data-js-component="SplitScreenHero"]').forEach((el) => {
    splitScreenHero(el);
  });
};
