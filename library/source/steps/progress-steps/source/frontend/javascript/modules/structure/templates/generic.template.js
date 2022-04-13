import { progressSteps } from '../../components/organisms/progress-steps.organism';

export const genericTemplate = () => {

  document.querySelectorAll('[data-js-component="ProgressSteps"]').forEach((el) => {
    progressSteps(el);
  });
};
