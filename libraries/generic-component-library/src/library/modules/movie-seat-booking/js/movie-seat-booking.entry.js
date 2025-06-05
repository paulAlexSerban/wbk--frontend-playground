import { find, findOne } from '../../../../_abstracts/js/dom/traversing';
import { addClass, hasClass, toggleClass } from '../../../../_abstracts/js/dom/manipulation';

const config = {
    type: 'widget',
    name: 'MovieSeatBooking',
    selectors: {
        container: '.movie-seat-booking__container',
        seats: '.movie-seat-booking__row .movie-seat-booking__seat:not(.movie-seat-booking__seat--occupied)',
        selectedSeats: '.movie-seat-booking__row .movie-seat-booking__seat.movie-seat-booking__seat--selected',
        count: '#count',
        total: '#total',
        movieSelect: '#movie',
    },
    classes: {
        bookingSeat: 'movie-seat-booking__seat',
        occupied: 'movie-seat-booking__seat--occupied',
        selected: 'movie-seat-booking__seat--selected',
    },
    localStorageKeys: {
        selectedSeats: 'selectedSeats',
        selectedMovieIndex: 'selectedMovieIndex',
        selectedMoviePrice: 'selectedMoviePrice',
    },
};

(() => {
    const MovieSeatBooking = (el) => {
        const global = { state: {}, elements: {}, data: {} };
        const bookingApp = el;

        const init = () => {
            setupDomReferences();
            global.data.ticketPrice = +global.elements.movieSelect.value;
            setupEventListeners();
            updateSelectedCount();
            populateUI();
        };

        const setupDomReferences = () => {
            global.elements.container = findOne(config.selectors.container, bookingApp);
            global.elements.seats = find(config.selectors.seats, bookingApp);
            global.elements.count = findOne(config.selectors.count, bookingApp);
            global.elements.total = findOne(config.selectors.total, bookingApp);
            global.elements.movieSelect = findOne(config.selectors.movieSelect, bookingApp);
        };

        const setupEventListeners = () => {
            global.elements.container.addEventListener('click', (e) => {
                if (hasClass(config.classes.bookingSeat, e.target) && !hasClass(config.classes.occupied, e.target)) {
                    toggleClass(config.classes.selected, e.target);
                    updateSelectedCount();
                }
            });

            global.elements.movieSelect.addEventListener('change', (e) => {
                global.data.ticketPrice = +e.target.value;
                setMovieData(e.target.selectedIndex, e.target.value);
                updateSelectedCount();
            });
        };

        const updateSelectedCount = () => {
            const selectedSeats = find(config.selectors.selectedSeats, bookingApp);
            const seatsIndex = [...selectedSeats].map((seat) => [...global.elements.seats].indexOf(seat));
            localStorage.setItem(config.localStorageKeys.selectedSeats, JSON.stringify(seatsIndex));

            const selectedSeatsCount = selectedSeats.length;
            global.elements.count.innerText = selectedSeatsCount;
            global.elements.total.innerText = selectedSeatsCount * global.data.ticketPrice;
        };

        const setMovieData = (movieIndex, moviePrice) => {
            localStorage.setItem(config.localStorageKeys.selectedMovieIndex, movieIndex);
            localStorage.setItem(config.localStorageKeys.selectedMoviePrice, moviePrice);
        };

        const populateUI = () => {
            const selectedSeats = JSON.parse(localStorage.getItem(config.localStorageKeys.selectedSeats));

            if (selectedSeats !== null && selectedSeats.length > 0) {
                global.elements.seats.forEach((seat, index) => {
                    if (selectedSeats.indexOf(index) > -1) {
                        addClass(config.classes.selected, seat);
                    }
                });
            }

            const selectedMovieIndex = localStorage.getItem(config.localStorageKeys.selectedMovieIndex);

            if (selectedMovieIndex !== null) {
                global.elements.movieSelect.selectedIndex = selectedMovieIndex;
            }
        };

        init();
    };

    document.querySelectorAll(`[data-js-${config.type}=${config.name}]`).forEach((el) => MovieSeatBooking(el));
})();
