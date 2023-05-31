import { findOne } from "../../../../_abstracts/js/dom/traversing";
import { toggleClass } from "../../../../_abstracts/js/dom/manipulation";

(() => {
    const config = {
        type: "pat",
        name: "SearchHidden",
        selectors: {
            search: ".js-search",
            button: ".js-search-btn",
            input: ".js-search-input",
        },
        states: {
            active: "active",
        },
    };

    const SearchHidden = () => {
        const global = { state: {}, elements: {} };

        const init = () => {
            setupDomReferences();
            setupEventListeners();
        };

        const setupDomReferences = () => {
            global.elements.search = findOne(config.selectors.search);
            global.elements.btn = findOne(config.selectors.button);
            global.elements.input = findOne(config.selectors.input);
        };

        const setupEventListeners = () => {
            global.elements.btn.addEventListener("click", () => {
                toggleClass(config.states.active, global.elements.search);
                global.elements.input.focus();
            });
        };

        init();
    };

    document.querySelectorAll(`[data-js-${config.type}=${config.name}]`).forEach((el) => {
        SearchHidden(el);
    });
})();
