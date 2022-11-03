---
title: "Video Player"
type: "pat"
assets: { main-js: "VideoPlayer.pat.js", main-css: "video-player.pat.css" }
---

<div class="pat-custom-player__base" data-js-pat="VideoPlayer">
  <h1 class="pat-custom-player__heading">Basic Custom Player</h1>
  <video src="/videos/gone.mp4" id="video" class="pat-custom-player__screen" poster="/images/poster-480px.webp"></video>
  <div class="pat-custom-player__controls">
    <button class="pat-custom-player__button" id="play">
    </button>
    <button class="pat-custom-player__button" id="stop">
    </button>
    <input type="range" id="progress" class="pat-custom-player__progress" min="0" max="100" step="0.1" value="0" />
    <span class="pat-custom-player__timestamp" id="timestamp">00:00</span>
  </div>
</div>