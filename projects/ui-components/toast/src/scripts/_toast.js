export const initPattern = () => {
    document.querySelectorAll('[data-js-toast]').forEach((root) => {
        const button = root.querySelector('.js-toast-button');
        const toasts = root.querySelector('.js-toasts');

        if (!button || !toasts) {
            return;
        }

        const messages = ['Message One', 'Message Two', 'Message Three', 'Message Four'];
        const types = ['info', 'success', 'error'];

        const getRandomMessage = () => messages[Math.floor(Math.random() * messages.length)];
        const getRandomType = () => types[Math.floor(Math.random() * types.length)];

        const createNotification = (message = null, type = null) => {
            const notif = document.createElement('div');
            notif.classList.add('toast');
            notif.classList.add(type || getRandomType());
            notif.textContent = message || getRandomMessage();
            toasts.appendChild(notif);

            setTimeout(() => {
                notif.remove();
            }, 3000);
        };

        button.addEventListener('click', () => createNotification());
    });
};
