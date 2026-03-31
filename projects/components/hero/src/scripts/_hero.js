const initSplitScreenHero = () => {
    document.querySelectorAll('[data-js-pat="SplitScreenHero"]').forEach((root) => {
        const left = root.querySelector('.js-hero-left');
        const right = root.querySelector('.js-hero-right');

        if (!left || !right) {
            return;
        }

        left.addEventListener('mouseenter', () => {
            root.classList.add('hover-left');
        });

        left.addEventListener('mouseleave', () => {
            root.classList.remove('hover-left');
        });

        right.addEventListener('mouseenter', () => {
            root.classList.add('hover-right');
        });

        right.addEventListener('mouseleave', () => {
            root.classList.remove('hover-right');
        });
    });
};

export const initPattern = () => {
    initSplitScreenHero();
};
