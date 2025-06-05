(() => {
    const config = {
        type: 'pat',
        name: 'FormWave',
    };

    const FormWave = () => {
        const init = () => {
            const labels = document.querySelectorAll('.js-form-control label');
            const inputs = document.querySelectorAll('.js-form-control input');

            labels.forEach((label) => {
                label.innerHTML = label.innerText
                    .split('')
                    .map((letter, idx) => `<span style="transition-delay:${idx * 50}ms">${letter}</span>`)
                    .join('');
            });

            inputs.forEach((input) => {
                input.addEventListener('keyup', (e) => {
                    if (e.target === input && input.value) {
                        input.classList.add('hasValue');
                    } else {
                        input.classList.remove('hasValue');
                    }
                });
            });
        };

        init();
    };

    document.querySelectorAll(`[data-js-${config.type}=${config.name}]`).forEach((el) => {
        FormWave(el);
    });
})();
