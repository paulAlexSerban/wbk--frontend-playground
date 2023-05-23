
import { find, findOne } from "../../../_commons/js/dom/traversing";
import { addClass, removeClass } from "../../../_commons/js/dom/manipulation";

(() => {
    const config = {
        type: "pat",
        name: "NavigationTabsJs",
        selectors: {
            tabButton: ".js-tab-button",
            tabPanel: ".js-tab-panel",
        },
        states: {
            active: "active",
        },
    };

    const NavigationTabsJs = (el) => {
        const global = { state: {}, elements: {} };

        const init = () => {
            setupDomReferences();
            setupEventListeners();
        };

        const setInactivePanel = () => {
            global.elements.tabPanels.forEach((panel) => {
                removeClass(config.states.active, panel);
            });
        };

        const setActivePanel = (tab) => {
            const activePanel = findOne(`${config.selectors.tabPanel}[data-id="${tab.dataset.id}"]`);
            addClass(config.states.active, activePanel);
        };

        const setActiveButton = (tab) => {
            global.elements.tabButtons.forEach((tab) => {
                removeClass(config.states.active, tab);
            });
            addClass(config.states.active, tab);
        };

        const setupEventListeners = () => {
            global.elements.tabButtons.forEach((tab) => {
                tab.addEventListener("click", (e) => {
                    setInactivePanel();
                    setActivePanel(tab);
                    setActiveButton(e.target);
                });
            });
        };

        const setupDomReferences = () => {
            global.elements.tabButtons = find(config.selectors.tabButton, el);
            global.elements.tabPanels = find(config.selectors.tabPanel, el);
        };

        init();
    };

    document.querySelectorAll(`[data-js-${config.type}=${config.name}]`).forEach((el) => {
        NavigationTabsJs(el);
    });
})();
