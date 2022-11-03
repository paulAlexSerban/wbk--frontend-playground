---
title: "Movie Seat Booking"
type: "widget"
assets: { main-js: "MovieSeatBooking.widget.js", main-css: "movie-seat-booking.widget.css" }
---

<div class="widget-movie-seat-booking__base" data-js-widget="MovieSeatBooking">
  <div class="widget-movie-seat-booking__movie-picker">
    <label class="widget-movie-seat-booking__select-label" for="movie">Pick a movie:</label>
    <select id="movie" class="widget-movie-seat-booking__select">
      <option value="10">Avengers: Endgame ($10)</option>
      <option value="12">Joker ($12)</option>
      <option value="8">Toy Story 4 ($8)</option>
      <option value="9">The Lion King ($9)</option>
    </select>
  </div>

  <ul class="widget-movie-seat-booking__showcase-list">
    <li class="widget-movie-seat-booking__showcase-item">
      <div class="widget-movie-seat-booking__seat"></div>
      <p class="widget-movie-seat-booking__caption">N/A</p>
    </li>
    <li class="widget-movie-seat-booking__showcase-item">
      <div class="widget-movie-seat-booking__seat widget-movie-seat-booking__seat--selected"></div>
      <p class="widget-movie-seat-booking__caption">Selected</p>
    </li>
    <li class="widget-movie-seat-booking__showcase-item">
      <div class="widget-movie-seat-booking__seat widget-movie-seat-booking__seat--occupied"></div>
      <p class="widget-movie-seat-booking__caption">Occupied</p>
    </li>
  </ul>

  <div class="widget-movie-seat-booking__container">
    <div class="widget-movie-seat-booking__screen"></div>
    <div class="widget-movie-seat-booking__row">
      <div class="widget-movie-seat-booking__seat"></div>
      <div class="widget-movie-seat-booking__seat"></div>
      <div class="widget-movie-seat-booking__seat"></div>
      <div class="widget-movie-seat-booking__seat"></div>
      <div class="widget-movie-seat-booking__seat"></div>
      <div class="widget-movie-seat-booking__seat"></div>
      <div class="widget-movie-seat-booking__seat"></div>
      <div class="widget-movie-seat-booking__seat"></div>
    </div>
    <div class="widget-movie-seat-booking__row">
      <div class="widget-movie-seat-booking__seat"></div>
      <div class="widget-movie-seat-booking__seat"></div>
      <div class="widget-movie-seat-booking__seat"></div>
      <div class="widget-movie-seat-booking__seat widget-movie-seat-booking__seat--occupied"></div>
      <div class="widget-movie-seat-booking__seat widget-movie-seat-booking__seat--occupied"></div>
      <div class="widget-movie-seat-booking__seat"></div>
      <div class="widget-movie-seat-booking__seat"></div>
      <div class="widget-movie-seat-booking__seat"></div>
    </div>
    <div class="widget-movie-seat-booking__row">
      <div class="widget-movie-seat-booking__seat"></div>
      <div class="widget-movie-seat-booking__seat"></div>
      <div class="widget-movie-seat-booking__seat"></div>
      <div class="widget-movie-seat-booking__seat"></div>
      <div class="widget-movie-seat-booking__seat"></div>
      <div class="widget-movie-seat-booking__seat"></div>
      <div class="widget-movie-seat-booking__seat widget-movie-seat-booking__seat--occupied"></div>
      <div class="widget-movie-seat-booking__seat widget-movie-seat-booking__seat--occupied"></div>
    </div>
    <div class="widget-movie-seat-booking__row">
      <div class="widget-movie-seat-booking__seat"></div>
      <div class="widget-movie-seat-booking__seat"></div>
      <div class="widget-movie-seat-booking__seat"></div>
      <div class="widget-movie-seat-booking__seat"></div>
      <div class="widget-movie-seat-booking__seat"></div>
      <div class="widget-movie-seat-booking__seat"></div>
      <div class="widget-movie-seat-booking__seat"></div>
      <div class="widget-movie-seat-booking__seat"></div>
    </div>
    <div class="widget-movie-seat-booking__row">
      <div class="widget-movie-seat-booking__seat"></div>
      <div class="widget-movie-seat-booking__seat"></div>
      <div class="widget-movie-seat-booking__seat"></div>
      <div class="widget-movie-seat-booking__seat widget-movie-seat-booking__seat--occupied"></div>
      <div class="widget-movie-seat-booking__seat widget-movie-seat-booking__seat--occupied"></div>
      <div class="widget-movie-seat-booking__seat"></div>
      <div class="widget-movie-seat-booking__seat"></div>
      <div class="widget-movie-seat-booking__seat"></div>
    </div>
    <div class="widget-movie-seat-booking__row">
      <div class="widget-movie-seat-booking__seat"></div>
      <div class="widget-movie-seat-booking__seat"></div>
      <div class="widget-movie-seat-booking__seat"></div>
      <div class="widget-movie-seat-booking__seat"></div>
      <div class="widget-movie-seat-booking__seat widget-movie-seat-booking__seat--occupied"></div>
      <div class="widget-movie-seat-booking__seat widget-movie-seat-booking__seat--occupied"></div>
      <div class="widget-movie-seat-booking__seat widget-movie-seat-booking__seat--occupied"></div>
      <div class="widget-movie-seat-booking__seat"></div>
    </div>
  </div>
  <p class="text">
    You have selected <span id="count" class="widget-movie-seat-booking__count">0</span> seats for a price of $<span
      class="widget-movie-seat-booking__total" id="total">0</span>
  </p>
</div>