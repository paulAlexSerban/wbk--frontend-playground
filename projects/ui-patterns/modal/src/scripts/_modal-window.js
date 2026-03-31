export const initModalWindow = () => {
    document.querySelectorAll('[data-modal-window]').forEach((demo) => {
        const modal = demo.querySelector('[data-modal]');
        const overlay = demo.querySelector('[data-overlay]');
        const closeButton = demo.querySelector('[data-close-modal]');
        const openButtons = demo.querySelectorAll('[data-open-modal]');

        if (!modal || !overlay || !closeButton || !openButtons.length) {
            return;
        }

        const openModal = () => {
            modal.classList.remove('modal-window__hidden');
            overlay.classList.remove('modal-window__hidden');
        };

        const closeModal = () => {
            modal.classList.add('modal-window__hidden');
            overlay.classList.add('modal-window__hidden');
        };

        openButtons.forEach((button) => button.addEventListener('click', openModal));
        closeButton.addEventListener('click', closeModal);
        overlay.addEventListener('click', closeModal);

        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && !modal.classList.contains('modal-window__hidden')) {
                closeModal();
            }
        });
    });
};
