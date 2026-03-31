export const initDigitalClock = () => {
    const roots = document.querySelectorAll('.js-digital-clock');
    const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    roots.forEach((root) => {
        const timeNode = root.querySelector('.js-digital-clock__time');
        if (!timeNode) {
            return;
        }

        const setClock = () => {
            const date = new Date();
            const day = weekdays[date.getDay()];
            const hours = `${date.getHours()}`.padStart(2, '0');
            const minutes = `${date.getMinutes()}`.padStart(2, '0');
            const seconds = `${date.getSeconds()}`.padStart(2, '0');
            timeNode.textContent = `${day} ${hours}:${minutes}:${seconds}`;
        };

        setClock();
        setInterval(setClock, 1000);
    });
};

export const initDigitalClockV2 = () => {
    const roots = document.querySelectorAll('.js-digital-clock-v2');

    roots.forEach((root) => {
        const tick = () => {
            const now = new Date();
            const h = `${now.getHours()}`.padStart(2, '0');
            const m = `${now.getMinutes()}`.padStart(2, '0');
            const s = `${now.getSeconds()}`.padStart(2, '0');

            root.innerHTML = `
                <span>${h}</span> :
                <span>${m}</span> :
                <span>${s}</span>
            `;
        };

        tick();
        setInterval(tick, 1000);
    });
};

export const initPattern = () => {
    initDigitalClock();
    initDigitalClockV2();
};
