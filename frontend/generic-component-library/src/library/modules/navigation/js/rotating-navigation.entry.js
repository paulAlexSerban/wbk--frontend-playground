import { findOne } from '../../../../_abstracts/js/dom/traversing';
import { addClass, removeClass } from '../../../../_abstracts/js/dom/manipulation';

export const config = {
    type: 'pat',
    name: 'NavigationRotating',
    selectors: {
        container: '.js-nav-rotating-container',
        btnOpen: '.js-nav-rotating-btn-open',
        btnClose: '.js-nav-rotating-btn-close',
    },
    states: {
        showNavigation: 'navigationVisible',
    },
};

(() => {
    const NavigationRotating = (el) => {
        const global = { state: {}, elements: {} };

        const init = () => {
            setupDomReferences();
            setupEventListeners();
        };

        const setupDomReferences = () => {
            global.elements.container = findOne(config.selectors.container, el);
            global.elements.btnOpen = findOne(config.selectors.btnOpen, el);
            global.elements.btnClose = findOne(config.selectors.btnClose, el);
        };

        const setupEventListeners = () => {
            global.elements.btnOpen.addEventListener('click', () => {
                addClass(config.states.showNavigation, global.elements.container);
            });

            global.elements.btnClose.addEventListener('click', () => {
                removeClass(config.states.showNavigation, global.elements.container);
            });
        };

        init();
    };

    document.querySelectorAll(`[data-js-${config.type}=${config.name}]`).forEach((el) => {
        NavigationRotating(el);
    });
})();
