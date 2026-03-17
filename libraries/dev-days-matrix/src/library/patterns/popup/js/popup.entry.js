(() => {
    const config = {
        type: 'pat',
        name: 'Popup',
    };

    const Popup = (el) => {
        const global = { state: {}, elements: {} };

        const init = () => {
            setupDomReferences();
            setupEventListeners();
        };

        const setupDomReferences = () => {
            global.elements.button = el.querySelector('.js-btn-open-popup');
            global.elements.popup = el.querySelector('.js-popup-wrapper');
            global.elements.close = el.querySelector('.js-popup-close');
            global.elements.action = el.querySelector('.js-popup-action');
        };

        const setupEventListeners = () => {
            global.elements.button.addEventListener('click', () => {
                global.elements.popup.style.display = 'block';
            });

            global.elements.close.addEventListener('click', () => {
                global.elements.popup.style.display = 'none';
            });

            global.elements.action.addEventListener('click', () => {
                global.elements.popup.style.display = 'none';
            });

            global.elements.popup.addEventListener('click', (e) => {
                if (e.target.className === 'js-popup-wrapper') {
                    global.elements.popup.style.display = 'none';
                }
            });
        };

        init();
    };

    document.querySelectorAll(`[data-js-${config.type}=${config.name}]`).forEach((el) => {
        Popup(el);
    });
})();
