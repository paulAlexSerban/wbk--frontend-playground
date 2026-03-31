// Entry point: initialize all slider variations
import { initBackgroundImageSlider } from './_background-image-slider.js';
import { initDoubleVerticalSlider } from './_double-vertical-slider.js';
import { initImageCarousel } from './_image-carousel.js';
import { initGalleryGrid } from './_gallery-grid.js';

(() => {
    initBackgroundImageSlider();
    initDoubleVerticalSlider();
    initImageCarousel();
    initGalleryGrid();
})();
