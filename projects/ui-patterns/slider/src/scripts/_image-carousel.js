export const initImageCarousel = () => {
    document.querySelectorAll('[data-image-carousel]').forEach((demo) => {
        const track = demo.querySelector('[data-carousel-track]');
        const items = demo.querySelectorAll('.image-carousel__item');
        const prevButton = demo.querySelector('[data-carousel-prev]');
        const nextButton = demo.querySelector('[data-carousel-next]');
        let activeIndex = 0;
        let intervalId;

        if (!track || !items.length || !prevButton || !nextButton) {
            return;
        }

        const render = () => {
            track.style.transform = `translateX(${-activeIndex * 100}%)`;
        };

        const schedule = () => {
            window.clearInterval(intervalId);
            intervalId = window.setInterval(() => {
                activeIndex = activeIndex + 1 > items.length - 1 ? 0 : activeIndex + 1;
                render();
            }, 2400);
        };

        nextButton.addEventListener('click', () => {
            activeIndex = activeIndex + 1 > items.length - 1 ? 0 : activeIndex + 1;
            render();
            schedule();
        });

        prevButton.addEventListener('click', () => {
            activeIndex = activeIndex - 1 < 0 ? items.length - 1 : activeIndex - 1;
            render();
            schedule();
        });

        render();
        schedule();
    });
};
