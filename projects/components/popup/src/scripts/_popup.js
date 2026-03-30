export const initPopup = () => {
    document.querySelectorAll('[data-popup]').forEach((demo) => {
        const openBtn = demo.querySelector('[data-popup-open]');
        const wrapper = demo.querySelector('[data-popup-wrapper]');
        const closeBtn = demo.querySelector('[data-popup-close]');
        const actionBtn = demo.querySelector('[data-popup-action]');

        if (!openBtn || !wrapper || !closeBtn || !actionBtn) {
            return;
        }

        const open = () => wrapper.classList.add('is-open');
        const close = () => wrapper.classList.remove('is-open');

        openBtn.addEventListener('click', open);
        closeBtn.addEventListener('click', close);
        actionBtn.addEventListener('click', close);
        wrapper.addEventListener('click', (event) => {
            if (event.target === wrapper) {
                close();
            }
        });
    });
};
