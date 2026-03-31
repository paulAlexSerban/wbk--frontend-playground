export const initAutoText = () => {
    document.querySelectorAll('[data-auto-text]').forEach((demo) => {
        const text = demo.dataset.text ?? demo.dataset.autoText ?? '';
        const output = demo.querySelector('[data-auto-text-output]');
        const speedControl = demo.querySelector('[data-auto-text-speed]');

        if (!text || !output || !speedControl) {
            return;
        }

        let index = 1;
        let speed = 300 / Number(speedControl.value);

        const writeText = () => {
            output.textContent = text.slice(0, index);
            index = index + 1;

            if (index > text.length) {
                index = 1;
            }

            window.setTimeout(writeText, speed);
        };

        speedControl.addEventListener('input', (event) => {
            const target = event.target;
            speed = 300 / Number(target.value);
        });

        writeText();
    });
};
