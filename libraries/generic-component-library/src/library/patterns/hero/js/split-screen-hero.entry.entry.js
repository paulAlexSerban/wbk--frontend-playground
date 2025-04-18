(() => {
    const config = {
        type: 'pat',
        name: 'SplitScreenHero',
    };

    const SplitScreenHero = () => {
        const global = { state: {}, elements: {} };

        const init = () => {
            setupDomReferences();
            setupEventListeners();
        };

        const setupDomReferences = () => {
            global.elements.left = document.querySelector('.left');
            global.elements.right = document.querySelector('.right');
            global.elements.container = document.querySelector('.container');
        };

        const setupEventListeners = () => {
            global.elements.left.addEventListener('mouseenter', () => {
                global.elements.container.classList.add('hover-left');
            });
            global.elements.left.addEventListener('mouseleave', () => {
                global.elements.container.classList.remove('hover-left');
            });

            global.elements.right.addEventListener('mouseenter', () => {
                global.elements.container.classList.add('hover-right');
            });
            global.elements.right.addEventListener('mouseleave', () => {
                global.elements.container.classList.remove('hover-right');
            });
        };

        init();
    };

    document.querySelectorAll(`[data-js-${config.type}=${config.name}]`).forEach((el) => {
        SplitScreenHero(el);
    });
})();
