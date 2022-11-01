---
title: "Blurry Loader"
type: "cmp"
assets: { main-js: "BlurryLoader.cmp.js", main-css: "blurry-loader.cmp.css" }
---

<div class="cmp-blurry-loader__base" data-js-cmp="BlurryLoader">
  <img
  class="cmp-image__base cmp-blurry-loader__background-image js-blurry-loader-background"
  loading="lazy"
  srcset="
    /images/worker-480px.webp 480w,
    /images/worker-960px.webp 960w,
    /images/worker-1440px.webp 1440w"
  sizes="(max-width: 479px) 480px,
          (max-width: 959px) 960px,
          1440px"
  src="/images/worker-original.webp"
  alt="worker"/>

  <p class="cmp-paragraph__base cmp-blurry-loader__loading-text js-blurry-loader-loading-text">0%</p>
</div>
