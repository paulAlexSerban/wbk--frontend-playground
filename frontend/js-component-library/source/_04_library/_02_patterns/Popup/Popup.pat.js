import { config } from "./config.js";

(() => {
    const Popup = (el) => {
        const global = { state: {}, elements: {} };

        const init = () => {
            setupDomReferences();
            setupEventListeners();
        };

        const setupDomReferences = () => {
            global.elements.button = el.querySelector("button");
            global.elements.popup = el.querySelector(".popup-wrapper");
            global.elements.close = el.querySelector(".popup-close");
        };

        const setupEventListeners = () => {
            global.elements.button.addEventListener("click", () => {
                global.elements.popup.style.display = "block";
            });

            global.elements.close.addEventListener("click", () => {
                global.elements.popup.style.display = "none";
            });

            global.elements.popup.addEventListener("click", (e) => {
                if (e.target.className === "popup-wrapper") {
                    global.elements.popup.style.display = "none";
                }
            });
        };

        init();
    };

    document.querySelectorAll(`[data-js-${config.type}=${config.name}]`).forEach((el) => {
        Popup(el);
    });
})();
