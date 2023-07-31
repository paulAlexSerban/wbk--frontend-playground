import { find, findOne } from "../../../../_abstracts/js/dom/traversing";

(() => {
    const config = {
        type: "pat",
        name: "ProgressSteps",
        selectors: {
            progressBar: ".js-progress-bar",
            btnPrev: ".js-btn-prev",
            btnNext: ".js-btn-next",
            pill: ".js-pill",
            active: ".active",
        },
        states: {
            active: "active",
        },
    };

    const ProgressSteps = (el) => {
        const global = {
            state: {
                currentActive: 1,
            },
            elements: {},
        };

        const init = () => {
            setupDomReferences();
            setupEventListener();
        };

        const setupDomReferences = () => {
            global.elements.progressBar = findOne(config.selectors.progressBar, el);
            global.elements.btnPrev = findOne(config.selectors.btnPrev, el);
            global.elements.btnNext = findOne(config.selectors.btnNext, el);
            global.elements.pillCircle = find(config.selectors.pill, el);
        };

        const setupEventListener = () => {
            global.elements.btnNext.addEventListener("click", () => {
                global.state.currentActive++;

                if (global.state.currentActive > global.elements.pillCircle.length) {
                    global.state.currentActive = global.elements.pillCircle.length;
                }

                update();
            });

            global.elements.btnPrev.addEventListener("click", () => {
                global.state.currentActive--;

                if (global.state.currentActive < 1) {
                    global.state.currentActive = 1;
                }

                update();
            });
        };

        const update = () => {
            global.elements.pillCircle.forEach((circle, idx) => {
                if (idx < global.state.currentActive) {
                    circle.classList.add(config.states.active);
                } else {
                    circle.classList.remove(config.states.active);
                }
            });

            global.elements.activeSteps = find(config.selectors.active);

            global.elements.progressBar.style.width =
                ((global.elements.activeSteps.length - 1) / (global.elements.pillCircle.length - 1)) * 100 + "%";

            if (global.state.currentActive === 1) {
                global.elements.btnPrev.disabled = true;
            } else if (global.state.currentActive === global.elements.pillCircle.length) {
                global.elements.btnNext.disabled = true;
            } else {
                global.elements.btnPrev.disabled = false;
                global.elements.btnNext.disabled = false;
            }
        };

        init();
    };

    document.querySelectorAll(`[data-js-${config.type}=${config.name}]`).forEach((el) => {
        ProgressSteps(el);
    });
})();
