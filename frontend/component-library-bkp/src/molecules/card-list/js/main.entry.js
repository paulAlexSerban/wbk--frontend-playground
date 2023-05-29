import { find } from "../../../_commons/js/dom/traversing";
import { addClass, removeClass } from "../../../_commons/js/dom/manipulation";

(() => {
    const config = {
        type: "pat",
        name: "ExpandingCards",
        selectors: {
            cardPanel: ".js-expanding-cards-panel",
        },
        states: {
            panelActive: "active",
        },
    };

    const ExpandingCards = (el) => {
        const global = { state: {}, elements: {} };

        const init = () => {
            setupDomReferences();
            setupEventListeners();
        };

        const removeActiveClasses = () => {
            global.elements.cardPanels.forEach((panel) => {
                removeClass(config.states.panelActive, panel);
            });
        };

        const setupEventListeners = () => {
            global.elements.cardPanels.forEach((panel) => {
                panel.addEventListener("click", () => {
                    removeActiveClasses();
                    addClass(config.states.panelActive, panel);
                });
            });
        };

        const setupDomReferences = () => {
            global.elements.cardPanels = find(config.selectors.cardPanel, el);
        };

        init();
    };

    document.querySelectorAll(`[data-js-${config.type}=${config.name}]`).forEach((el) => {
        ExpandingCards(el);
    });
})();
