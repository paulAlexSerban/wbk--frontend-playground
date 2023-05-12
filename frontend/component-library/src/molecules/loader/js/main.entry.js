const config = {
  type: "cmp",
  name: "BlurryLoader",
  selectors: {
      loadingText: ".js-blurry-loader-loading-text",
      backgroundImage: ".js-blurry-loader-background",
  },
};

const scale = (num, in_min, in_max, out_min, out_max) => {
  return ((num - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;
};

const findOne = (selector, context = document) => {
  return context.querySelector(selector);
};

(() => {
    const BlurryLoader = (el) => {
        const global = {
            state: {
                load: 0,
            },
            elements: {},
        };

        const setupDomReferences = () => {
            global.elements.loadText = findOne(config.selectors.loadingText, el);
            global.elements.bg = findOne(config.selectors.backgroundImage, el);
        };

        const init = () => {
            setupDomReferences();

            global.state.interval = setInterval(blurryImage, 30);
        };

        const blurryImage = () => {
            global.state.load++;

            if (global.state.load > 99) {
                clearInterval(global.state.interval);
            }

            global.elements.loadText.innerText = `${global.state.load}%`;
            global.elements.loadText.style.opacity = scale(global.state.load, 0, 100, 1, 0);
            global.elements.bg.style.filter = `blur(${scale(global.state.load, 0, 100, 30, 0)}px)`;
        };

        init();
    };

    document.querySelectorAll(`[data-js-${config.type}=${config.name}]`).forEach((el) => {
        BlurryLoader(el);
    });
})();
