import { expandingCards } from '../../components/organisms/expandingCards.organism';

export const genericTemplate = () => {

  document.querySelectorAll('[data-js-component="ExpandingCards"]').forEach((el) => {
    expandingCards(el);
  });
};
