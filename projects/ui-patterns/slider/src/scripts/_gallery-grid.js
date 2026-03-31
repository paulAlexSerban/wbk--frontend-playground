export const initGalleryGrid = () => {
    document.querySelectorAll('[data-gallery-grid]').forEach((demo) => {
        const items = demo.querySelectorAll('[data-gallery-page]');
        const dots = demo.querySelectorAll('[data-gallery-dot]');

        if (!items.length || !dots.length) {
            return;
        }

        const renderPage = (pageIndex) => {
            items.forEach((item) => {
                const itemPage = parseInt(item.dataset.galleryPage);
                item.classList.toggle('is-active', itemPage === pageIndex);
            });

            dots.forEach((dot, index) => {
                dot.classList.toggle('is-active', index === pageIndex);
            });
        };

        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                renderPage(index);
            });
        });

        renderPage(0);
    });
};
