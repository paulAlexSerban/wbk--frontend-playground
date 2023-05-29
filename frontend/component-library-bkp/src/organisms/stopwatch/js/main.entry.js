export const config = {
    type: "widget",
    name: "Stopwatch",
};

(() => {
    const Stopwatch = (el) => {
        const global = {
            state: {
                mode: 0,
                timeCounter: 0,
                lapCounter: 0,
                action: "",
                lapNumber: 0,
                timeMinutes: 0,
                timeSeconds: 0,
                timeCentiseconds: 0,
                lapMinutes: 0,
                lapSeconds: 0,
                lapCentiseconds: 0,
            },
            elements: {},
        };

        const init = () => {
            setupDomReferences();
            setupEventListeners();
            hideShowButtons(".js-startButton", ".js-lapButton");
        };

        const setupDomReferences = () => {
            global.elements.controls = el.querySelectorAll(".js-control");
            global.elements.startButton = el.querySelector(".js-startButton");
            global.elements.stopButton = el.querySelector(".js-stopButton");
            global.elements.resumeButton = el.querySelector(".js-resumeButton");
            global.elements.lapButton = el.querySelector(".js-lapButton");
            global.elements.resetButton = el.querySelector(".js-resetButton");
            global.elements.timeMinute = el.querySelector(".js-timeMinute");
            global.elements.timeSecond = el.querySelector(".js-timeSecond");
            global.elements.timeCentiseconds = el.querySelector(".js-timeCentiseconds");
            global.elements.lapCentiseconds = el.querySelector(".js-lapCentiseconds");
            global.elements.lapSeconds = el.querySelector(".js-lapSeconds");
            global.elements.lapMinutes = el.querySelector(".js-lapMinutes");
            global.elements.lapCentiseconds = el.querySelector(".js-lapCentiseconds");
            global.elements.laps = el.querySelector(".js-laps");
        };

        const setupEventListeners = () => {
            global.elements.startButton.addEventListener("click", () => {
                global.state.mode = 1;
                hideShowButtons(".js-stopButton", ".js-lapButton");
                startAction();
            });

            global.elements.resumeButton.addEventListener("click", () => {
                hideShowButtons(".js-stopButton", ".js-lapButton");
                startAction();
            });

            global.elements.resetButton.addEventListener("click", () => {
                location.reload();
            });

            global.elements.lapButton.addEventListener("click", () => {
                if (global.state.mode) {
                    clearInterval(global.state.action);

                    global.state.lapCounter = 0;
                    addLap();

                    startAction();
                }
            });
            global.elements.stopButton.addEventListener("click", () => {
                hideShowButtons(".js-resumeButton", ".js-resetButton");
                clearInterval(global.state.action);
            });
        };

        const hideShowButtons = (x, y) => {
            global.elements.controls.forEach((control) => {
                control.style.display = "none";
            });
            el.querySelector(x).style.display = "flex";
            el.querySelector(y).style.display = "flex";
        };

        const startAction = () => {
            global.state.action = setInterval(() => {
                global.state.timeCounter++;
                if (global.state.timeCounter == 100 * 60 * 100) {
                    global.state.timeCounter = 0;
                }
                global.state.lapCounter++;
                if (global.state.lapCounter == 100 * 60 * 100) {
                    global.state.lapCounter = 0;
                }
                updateTime();
            }, 10);
        };

        const updateTime = () => {
            //1min=60*100centiseconds=6000centiseconds
            global.state.timeMinutes = Math.floor(global.state.timeCounter / 6000);
            //1sec=100centiseconds
            global.state.timeSeconds = Math.floor((global.state.timeCounter % 6000) / 100);
            global.state.timeCentiseconds = (global.state.timeCounter % 6000) % 100;

            global.elements.timeMinute.innerText = format(global.state.timeMinutes);
            global.elements.timeSecond.innerText = format(global.state.timeSeconds);
            global.elements.timeCentiseconds.innerText = format(global.state.timeCentiseconds);

            // //1min=60*100centiseconds=6000centiseconds
            global.state.lapMinutes = Math.floor(global.state.lapCounter / 6000);
            // //1sec=100centiseconds
            global.state.lapSeconds = Math.floor((global.state.lapCounter % 6000) / 100);
            global.state.lapCentiseconds = (global.state.lapCounter % 6000) % 100;
            global.elements.lapMinutes.innerText = format(global.state.lapMinutes);
            global.elements.lapSeconds.innerText = format(global.state.lapSeconds);
            global.elements.lapCentiseconds.innerText = format(global.state.lapCentiseconds);
        };

        const format = (number) => {
            if (number < 10) {
                return "0" + number;
            } else {
                return number;
            }
        };

        const addLap = () => {
            global.state.lapNumber++;

            const myLapDetails = `<div class="stopwatch__lap-time">
  <div class="stopwatch__laptimetitle">
    Lap ${global.state.lapNumber}
  </div>
  <div class="stopwatch__laptime">
    <span>${format(global.state.lapMinutes)}</span>:
    <span>${format(global.state.lapSeconds)}</span>:
    <span>${format(global.state.lapCentiseconds)}</span>
  </div>
</div>`;
            global.elements.laps.innerHTML = myLapDetails + global.elements.laps.innerHTML;
        };

        init();
    };

    document.querySelectorAll(`[data-js-${config.type}=${config.name}]`).forEach((el) => {
        Stopwatch(el);
    });
})();
