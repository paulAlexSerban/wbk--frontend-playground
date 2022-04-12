import { booking } from '../../components/organisms/booking.organism';

export const genericTemplate = () => {

  document.querySelectorAll('[data-js-component="Booking"]').forEach((el) => {
    booking(el);
  });
};
