export const initPattern = () => {
    document.querySelectorAll('[data-js-cmp="KeyboardKeys"]').forEach((root) => {
        const insert = root.querySelector('.js-keyboard-insert');

        if (!insert) {
            return;
        }

        const onKeydown = (event) => {
            event.preventDefault();
            insert.innerHTML = `
                <div class="key">
                    ${event.key === ' ' ? 'Space' : event.key}
                    <small>event.key</small>
                </div>

                <div class="key">
                    ${event.keyCode}
                    <small>event.keyCode</small>
                </div>

                <div class="key">
                    ${event.code}
                    <small>event.code</small>
                </div>
            `;
        };

        window.addEventListener('keydown', onKeydown);
    });
};
