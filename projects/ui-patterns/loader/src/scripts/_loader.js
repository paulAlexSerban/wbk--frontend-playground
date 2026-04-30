export const initPattern = () => {
    const scale = (num, inMin, inMax, outMin, outMax) => ((num - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;

    document.querySelectorAll('[data-js-cmp="BlurryLoader"]').forEach((root) => {
        const loadText = root.querySelector('.js-blurry-loader-loading-text');
        const bg = root.querySelector('.js-blurry-loader-background');

        if (!loadText || !bg) {
            return;
        }

        let load = 0;

        const interval = setInterval(() => {
            load += 1;

            if (load > 99) {
                clearInterval(interval);
            }

            loadText.textContent = `${load}%`;
            loadText.style.opacity = scale(load, 0, 100, 1, 0);
            bg.style.filter = `blur(${scale(load, 0, 100, 30, 0)}px)`;
        }, 30);
    });
};
