export const initProgressSteps = () => {
    document.querySelectorAll('[data-progress-steps]').forEach((demo) => {
        const progressBar = demo.querySelector('[data-progress-bar]');
        const prev = demo.querySelector('[data-progress-prev]');
        const next = demo.querySelector('[data-progress-next]');
        const pills = demo.querySelectorAll('[data-progress-pill]');

        if (!progressBar || !prev || !next || !pills.length) {
            return;
        }

        let currentActive = 1;

        const update = () => {
            pills.forEach((pill, index) => {
                pill.classList.toggle('is-active', index < currentActive);
            });

            progressBar.style.width = `${((currentActive - 1) / (pills.length - 1)) * 100}%`;

            prev.disabled = currentActive === 1;
            next.disabled = currentActive === pills.length;
        };

        next.addEventListener('click', () => {
            currentActive = Math.min(currentActive + 1, pills.length);
            update();
        });

        prev.addEventListener('click', () => {
            currentActive = Math.max(currentActive - 1, 1);
            update();
        });

        update();
    });
};
