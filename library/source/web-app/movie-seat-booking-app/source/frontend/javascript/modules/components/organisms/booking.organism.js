import { findOne, find } from "../../../abstracts/dom/traversing";
import {
  addClass,
  hasClass,
  toggleClass,
} from "../../../abstracts/dom/manipulation";

const config = {
  selectors: {
    container: ".o-booking__container",
    seats: ".o-booking__row .o-booking__seat:not(.o-booking__seat--occupied)",
    selectedSeats: ".o-booking__row .o-booking__seat.o-booking__seat--selected",
    count: "#count",
    total: "#total",
    movieSelect: "#movie",
  },
  classes: {
    bookingSeat: "o-booking__seat",
    occupied: "o-booking__seat--occupied",
    selected: "o-booking__seat--selected",
  },
  localStorageKeys: {
    selectedSeats: "selectedSeats",
    selectedMovieIndex: "selectedMovieIndex",
    selectedMoviePrice: "selectedMoviePrice",
  },
};

export const booking = (el) => {
  const bookingApp = el;
  const container = findOne(config.selectors.container, bookingApp);
  const seats = find(config.selectors.seats, bookingApp);
  const count = findOne(config.selectors.count, bookingApp);
  const total = findOne(config.selectors.total, bookingApp);
  const movieSelect = findOne(config.selectors.movieSelect, bookingApp);
  let ticketPrice = +movieSelect.value;

  const updateSelectedCount = () => {
    const selectedSeats = find(config.selectors.selectedSeats, bookingApp);
    const seatsIndex = [...selectedSeats].map((seat) =>
      [...seats].indexOf(seat)
    );
    localStorage.setItem(
      config.localStorageKeys.selectedSeats,
      JSON.stringify(seatsIndex)
    );
    const selectedSeatsCount = selectedSeats.length;
    count.innerText = selectedSeatsCount;
    total.innerText = selectedSeatsCount * ticketPrice;
  };

  const setMovieData = (movieIndex, moviePrice) => {
    localStorage.setItem(
      config.localStorageKeys.selectedMovieIndex,
      movieIndex
    );
    localStorage.setItem(
      config.localStorageKeys.selectedMoviePrice,
      moviePrice
    );
  };

  const setupEvents = () => {
    container.addEventListener("click", (e) => {
      if (
        hasClass(config.classes.bookingSeat, e.target) &&
        !hasClass(config.classes.occupied, e.target)
      ) {
        toggleClass(config.classes.selected, e.target);
        updateSelectedCount();
      }
    });

    movieSelect.addEventListener("change", (e) => {
      ticketPrice = +e.target.value;
      setMovieData(e.target.selectedIndex, e.target.value);
      updateSelectedCount();
    });
  };

  const populateUI = () => {
    const selectedSeats = JSON.parse(
      localStorage.getItem(config.localStorageKeys.selectedSeats)
    );

    if (selectedSeats !== null && selectedSeats.length > 0) {
      seats.forEach((seat, index) => {
        if (selectedSeats.indexOf(index) > -1) {
          addClass(config.classes.selected, seat);
        }
      });
    }

    const selectedMovieIndex = localStorage.getItem(
      config.localStorageKeys.selectedMovieIndex
    );

    if (selectedMovieIndex !== null) {
      movieSelect.selectedIndex = selectedMovieIndex;
    }
  };

  const init = () => {
    setupEvents();
    updateSelectedCount();
    populateUI();
  };

  init();
};
