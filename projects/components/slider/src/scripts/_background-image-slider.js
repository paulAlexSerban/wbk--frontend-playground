export const initBackgroundImageSlider = () => {
    document.querySelectorAll('[data-background-slider]').forEach((demo) => {
        const slides = demo.querySelectorAll('[data-hero-slide]');
        const prevButton = demo.querySelector('[data-hero-prev]');
        const nextButton = demo.querySelector('[data-hero-next]');
        const backdrop = demo.querySelector('.hero-slider__backdrop');
        let activeSlide = 0;

        if (!slides.length || !prevButton || !nextButton || !backdrop) {
            return;
        }

        const render = () => {
            slides.forEach((slide, index) => {
                slide.classList.toggle('is-active', index === activeSlide);
            });

            backdrop.style.background = slides[activeSlide].style.getPropertyValue('--slide-background');
        };

        nextButton.addEventListener('click', () => {
            activeSlide = activeSlide + 1 > slides.length - 1 ? 0 : activeSlide + 1;
            render();
        });

        prevButton.addEventListener('click', () => {
            activeSlide = activeSlide - 1 < 0 ? slides.length - 1 : activeSlide - 1;
            render();
        });

        render();
    });
};
