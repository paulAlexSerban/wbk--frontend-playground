export const initPattern = () => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const scale = (num, inMin, inMax, outMin, outMax) =>
        ((num - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;

    document.querySelectorAll('[data-js-theme-switch]').forEach((root) => {
        const hourEl = root.querySelector('.js-hour');
        const minuteEl = root.querySelector('.js-minute');
        const secondEl = root.querySelector('.js-second');
        const timeEl = root.querySelector('.js-time');
        const dateEl = root.querySelector('.js-date');
        const toggle = root.querySelector('.js-theme-toggle');

        if (!hourEl || !minuteEl || !secondEl || !timeEl || !dateEl || !toggle) {
            return;
        }

        toggle.addEventListener('click', () => {
            const isDark = root.classList.toggle('dark');
            toggle.textContent = isDark ? 'Light mode' : 'Dark mode';
        });

        const setTime = () => {
            const time = new Date();
            const month = time.getMonth();
            const day = time.getDay();
            const date = time.getDate();
            const hours = time.getHours();
            const hoursForClock = hours >= 13 ? hours % 12 : hours || 12;
            const minutes = time.getMinutes();
            const seconds = time.getSeconds();
            const ampm = hours >= 12 ? 'PM' : 'AM';

            hourEl.style.transform = `translate(-50%, -100%) rotate(${scale(hoursForClock, 0, 12, 0, 360)}deg)`;
            minuteEl.style.transform = `translate(-50%, -100%) rotate(${scale(minutes, 0, 60, 0, 360)}deg)`;
            secondEl.style.transform = `translate(-50%, -100%) rotate(${scale(seconds, 0, 60, 0, 360)}deg)`;
            timeEl.textContent = `${hoursForClock}:${minutes < 10 ? `0${minutes}` : minutes} ${ampm}`;
            dateEl.innerHTML = `${days[day]}, ${months[month]} <span class="circle">${date}</span>`;
        };

        setTime();
        setInterval(setTime, 1000);
    });
};
