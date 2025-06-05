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
