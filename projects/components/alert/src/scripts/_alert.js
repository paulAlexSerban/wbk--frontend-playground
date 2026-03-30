export const initAlert = () => {
    document.querySelectorAll('[data-alert-item]').forEach((alertItem) => {
        const closeTriggers = alertItem.querySelectorAll('[data-alert-close]');

        closeTriggers.forEach((trigger) => {
            trigger.addEventListener('click', (event) => {
                event.preventDefault();
                alertItem.remove();
            });
        });
    });
};
