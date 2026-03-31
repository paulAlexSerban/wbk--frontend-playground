export const initPattern = () => {
    document.querySelectorAll('[data-js-like]').forEach((root) => {
        const loveMe = root.querySelector('.js-love-me');
        const times = root.querySelector('.js-like-count');

        if (!loveMe || !times) {
            return;
        }

        let clickTime = 0;
        let timesClicked = 0;

        loveMe.addEventListener('click', (event) => {
            if (clickTime === 0) {
                clickTime = new Date().getTime();
                return;
            }

            if (new Date().getTime() - clickTime < 800) {
                const heart = document.createElement('span');
                const bounds = loveMe.getBoundingClientRect();
                const xInside = event.clientX - bounds.left;
                const yInside = event.clientY - bounds.top;

                heart.className = 'like__floating-heart';
                heart.textContent = '♥';
                heart.style.top = `${yInside}px`;
                heart.style.left = `${xInside}px`;

                loveMe.appendChild(heart);
                times.textContent = `${++timesClicked}`;
                clickTime = 0;

                setTimeout(() => heart.remove(), 1000);
            } else {
                clickTime = new Date().getTime();
            }
        });
    });
};
