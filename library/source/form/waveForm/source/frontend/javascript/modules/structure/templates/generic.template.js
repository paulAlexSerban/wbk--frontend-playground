import { waveFrom } from '../../components/organisms/waveForm.organism';

export const genericTemplate = () => {

  document.querySelectorAll('[data-js-component="WaveForm"]').forEach((el) => {
    waveFrom(el);
  });
};
