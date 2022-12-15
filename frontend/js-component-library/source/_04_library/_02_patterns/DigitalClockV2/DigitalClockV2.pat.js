import { config } from "./config";

(() => {
  const DigitalClockV2 = (el) => {
    // const global = { state: {}, elements: {} };

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

  document.querySelectorAll(`[data-js-${config.type}=${config.name}]`).forEach((el) => {
    DigitalClockV2(el);
  });
})();
