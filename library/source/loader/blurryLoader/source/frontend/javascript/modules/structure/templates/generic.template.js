import { blurryLoader } from '../../components/organisms/blurryLoader.organism';

export const genericTemplate = () => {

  document.querySelectorAll('[data-js-component="BlurryLoader"]').forEach((el) => {
    blurryLoader(el);
  });
};
