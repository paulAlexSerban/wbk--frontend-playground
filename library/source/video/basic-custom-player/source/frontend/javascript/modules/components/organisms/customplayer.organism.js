import { findOne } from "../../../abstracts/dom/traversing";

const config = {
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

export const customplayer = (el) => {
  const customPlayerEl = el;
  console.log(customPlayerEl);
  const video = findOne(config.selectors.videoEl, customPlayerEl);
  const play = findOne(config.selectors.playBtn, customPlayerEl);
  const stop = findOne(config.selectors.stopBtn, customPlayerEl);
  const progress = findOne(config.selectors.progressBar, customPlayerEl);
  const timestamp = findOne(config.selectors.timeStamp, customPlayerEl);

  const toggleVideoStatus = () => {
    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  };

  const updatePlayIcon = () => {
    if (video.paused) {
      play.innerHTML = '<i class="fa fa-play fa-2x"></i>';
    } else {
      play.innerHTML = '<i class="fa fa-pause fa-2x"></i>';
    }
  };

  const updateProgress = () => {
    progress.value = (video.currentTime / video.duration) * 100;
    let mins = Math.floor(video.currentTime / 60);
    let secs = Math.floor(video.currentTime % 60);

    if (mins < 10) {
      mins = `0${String(mins)}`;
    }

    if (secs < 10) {
      secs = `0${String(secs)}`;
    }

    timestamp.innerHTML = `${mins}:${secs}`;
  };

  const setVideoProgress = () => {
    video.currentTime = (+progress.value * video.duration) / 100;
  };

  const stopVideo = () => {
    video.currentTime = 0;
    video.pause();
  };

  const setupEvents = () => {
    video.addEventListener("click", () => toggleVideoStatus());
    video.addEventListener("pause", () => updatePlayIcon());
    video.addEventListener("play", () => updatePlayIcon());
    video.addEventListener("timeupdate", () => updateProgress());
    play.addEventListener("click", () => toggleVideoStatus());
    stop.addEventListener("click", () => stopVideo());
    progress.addEventListener("change", () => setVideoProgress());
  };

  const init = () => {
    setupEvents();
  };

  init();
};
