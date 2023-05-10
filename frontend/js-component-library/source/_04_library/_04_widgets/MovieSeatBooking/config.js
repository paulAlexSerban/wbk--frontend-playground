export const config = {
    type: "widget",
    name: "MovieSeatBooking",
    selectors: {
        container: ".widget-movie-seat-booking__container",
        seats: ".widget-movie-seat-booking__row .widget-movie-seat-booking__seat:not(.widget-movie-seat-booking__seat--occupied)",
        selectedSeats:
            ".widget-movie-seat-booking__row .widget-movie-seat-booking__seat.widget-movie-seat-booking__seat--selected",
        count: "#count",
        total: "#total",
        movieSelect: "#movie",
    },
    classes: {
        bookingSeat: "widget-movie-seat-booking__seat",
        occupied: "widget-movie-seat-booking__seat--occupied",
        selected: "widget-movie-seat-booking__seat--selected",
    },
    localStorageKeys: {
        selectedSeats: "selectedSeats",
        selectedMovieIndex: "selectedMovieIndex",
        selectedMoviePrice: "selectedMoviePrice",
    },
};
