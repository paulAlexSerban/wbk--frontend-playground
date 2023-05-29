(() => {
    const config = {
        selectors: {
            digitalClock: ".js-digital-clock__time",
        },
    };
    class DigitalClock {
        constructor(el) {
            this.el = el;
            this.init();
        }

        setClock() {
            const date = new Date();
            let hours = `${date.getHours()}`;
            let minutes = `${date.getMinutes()}`;
            let seconds = `${date.getSeconds()}`;
            const day = date.getDay();

            if (hours.length < 2) {
                hours = `0${hours}`;
            }

            if (minutes.length < 2) {
                minutes = `0${minutes}`;
            }

            if (seconds.length < 2) {
                seconds = `0${seconds}`;
            }

            const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
            this.digitalClock.innerHTML = `${weekdays[day]} ${hours}:${minutes}:${seconds}`;
        }

        setupReferences() {
            this.digitalClock = this.el.querySelector(config.selectors.digitalClock);
        }

        init() {
            this.setupReferences();
            this.setClock();
            setInterval(this.setClock.bind(this), 1000);
        }
    }

    document.querySelectorAll(".js-digital-clock").forEach((el) => new DigitalClock(el));
})();

(() => {
    const DigitalClockV2 = (el) => {
        const init = () => {
            setInterval(() => {
                tick();
            }, 1000);
        };

        const tick = () => {
            const now = new Date();

            const h = now.getHours();
            const m = now.getMinutes();
            const s = now.getSeconds();

            const html = `
      <span>${h}</span> :
      <span>${m}</span> :
      <span>${s}</span>
    `;

            el.innerHTML = html;
        };

        init();
    };

    document.querySelectorAll(`.js-digital-clock-v2`).forEach((el) => {
        DigitalClockV2(el);
    });
})();
