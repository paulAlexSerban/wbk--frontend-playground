import { config } from "./config";
import { findOne } from "../../../_01_abstracts/dom/traversing";
import { addClass, removeClass } from "../../../_01_abstracts/dom/manipulation";

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
            global.elements.btnOpen.addEventListener("click", () => {
                addClass(config.states.showNavigation, global.elements.container);
            });

            global.elements.btnClose.addEventListener("click", () => {
                removeClass(config.states.showNavigation, global.elements.container);
            });
        };

        init();
    };

    document.querySelectorAll(`[data-js-${config.type}=${config.name}]`).forEach((el) => {
        NavigationRotating(el);
    });
})();
