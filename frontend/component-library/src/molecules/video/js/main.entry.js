
import { findOne } from "../../../_commons/js/dom/traversing";

(() => {
    const config = {
        type: "pat",
        name: "VideoPlayer",
        selectors: {
            videoEl: "#video",
            playBtn: "#play",
            stopBtn: "#stop",
            progressBar: "#progress",
            timeStamp: "#timestamp",
        },
        classes: {
            bookingSeat: "selected",
        },
    };
    
    const VideoPlayer = (el) => {
        const global = { state: {}, elements: {} };

        const init = () => {
            setupDomReferences();
            setupEventListeners();
            updatePlayIcon();
        };

        const setupDomReferences = () => {
            global.elements.video = findOne(config.selectors.videoEl, el);
            global.elements.play = findOne(config.selectors.playBtn, el);
            global.elements.stop = findOne(config.selectors.stopBtn, el);
            global.elements.progress = findOne(config.selectors.progressBar, el);
            global.elements.timestamp = findOne(config.selectors.timeStamp, el);
        };

        const setupEventListeners = () => {
            global.elements.video.addEventListener("click", () => {
                toggleVideoStatus();
            });
            global.elements.video.addEventListener("pause", () => {
                updatePlayIcon();
            });
            global.elements.video.addEventListener("play", () => {
                updatePlayIcon();
            });
            global.elements.video.addEventListener("timeupdate", () => {
                updateProgress();
            });
            global.elements.play.addEventListener("click", () => {
                toggleVideoStatus();
            });
            global.elements.stop.addEventListener("click", () => {
                stopVideo();
            });
            global.elements.progress.addEventListener("change", () => {
                setVideoProgress();
            });
        };

        const toggleVideoStatus = () => {
            if (global.elements.video.paused) {
                global.elements.video.play();
            } else {
                global.elements.video.pause();
            }
        };

        const updatePlayIcon = () => {
            if (global.elements.video.paused) {
                global.elements.play.innerHTML = '<img class="fa-play" src="/assets/svgs/fa-play.svg"/>';
            } else {
                global.elements.play.innerHTML = '<img class="fa-stop" src="/assets/svgs/fa-stop.svg"/>';
            }
        };

        const updateProgress = () => {
            global.elements.progress.value = (global.elements.video.currentTime / global.elements.video.duration) * 100;
            let mins = Math.floor(global.elements.video.currentTime / 60);
            let secs = Math.floor(global.elements.video.currentTime % 60);

            if (mins < 10) {
                mins = `0${String(mins)}`;
            }

            if (secs < 10) {
                secs = `0${String(secs)}`;
            }

            global.elements.timestamp.innerHTML = `${mins}:${secs}`;
        };

        const setVideoProgress = () => {
            global.elements.video.currentTime =
                (+global.elements.progress.value * global.elements.video.duration) / 100;
        };

        const stopVideo = () => {
            global.elements.video.currentTime = 0;
            global.elements.video.pause();
        };

        init();
    };

    document.querySelectorAll(`[data-js-${config.type}=${config.name}]`).forEach((el) => {
        VideoPlayer(el);
    });
})();
