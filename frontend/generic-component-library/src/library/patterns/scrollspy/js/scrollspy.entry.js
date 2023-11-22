(() => {
    const config = {
        type: 'pat',
        name: 'Scrollspy',
    };

    const Scrollspy = () => {
        const global = { state: {}, elements: {} };

        const init = () => {
            setupDomReferences();
            setupEventListeners();
        };

        const setupDomReferences = () => {
            global.elements.boxes = document.querySelectorAll('.js-box');
        };

        const setupEventListeners = () => {
            window.addEventListener('scroll', () => {
                checkBoxes();
            });
        };

        const checkBoxes = () => {
            const triggerBottom = (window.innerHeight / 5) * 4;

            global.elements.boxes.forEach((box) => {
                const boxTop = box.getBoundingClientRect().top;

                if (boxTop < triggerBottom) {
                    box.classList.add('show');
                } else {
                    box.classList.remove('show');
                }
            });
        };

        init();
        checkBoxes();
    };

    document.querySelectorAll(`[data-js-${config.type}=${config.name}]`).forEach((el) => {
        Scrollspy(el);
    });
})();
