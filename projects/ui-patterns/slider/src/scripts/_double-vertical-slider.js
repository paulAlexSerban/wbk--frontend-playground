export const initDoubleVerticalSlider = () => {
    document.querySelectorAll('[data-vertical-slider]').forEach((demo) => {
        const slider = demo.querySelector('.vertical-slider');
        const leftColumn = demo.querySelector('[data-vertical-left]');
        const rightColumn = demo.querySelector('[data-vertical-right]');
        const upButton = demo.querySelector('[data-vertical-up]');
        const downButton = demo.querySelector('[data-vertical-down]');
        const totalSlides = rightColumn
            ? rightColumn.querySelectorAll('.vertical-photo').length
            : leftColumn.querySelectorAll('.vertical-panel').length;
        let activeSlide = 0;

        if (!slider || !leftColumn || !upButton || !downButton || !totalSlides) {
            return;
        }

        const updatePosition = () => {
            const sliderHeight = slider.clientHeight;
            if (rightColumn) {
                rightColumn.style.transform = `translateY(-${activeSlide * sliderHeight}px)`;
            }
            leftColumn.style.transform = `translateY(${activeSlide * sliderHeight}px)`;
        };

        upButton.addEventListener('click', () => {
            activeSlide = activeSlide + 1 > totalSlides - 1 ? 0 : activeSlide + 1;
            updatePosition();
        });

        downButton.addEventListener('click', () => {
            activeSlide = activeSlide - 1 < 0 ? totalSlides - 1 : activeSlide - 1;
            updatePosition();
        });
    });
};
