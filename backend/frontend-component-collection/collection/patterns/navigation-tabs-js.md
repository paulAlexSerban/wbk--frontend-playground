---
title: "Navigation Tabs JS"
type: "pat"
assets: { main-js: "NavigationTabsJs.pat.js", main-css: "navigation-tabs-js.pat.css" }
---

<div class="pat-navigation-tabs-js__base" data-js-pat="NavigationTabsJs">
  <ul class="pat-navigation-tabs-js__tab-list">
    <li class="pat-navigation-tabs-js__tab-item">
      <button class="cmp-button__base js-tab-button active" data-id="tab1">TAB-1</button>
    </li>
    <li class="pat-navigation-tabs-js__tab-item">
      <button class="cmp-button__base js-tab-button" data-id="tab2">TAB-2</button>
    </li>
    <li class="pat-navigation-tabs-js__tab-item">
      <button class="cmp-button__base js-tab-button" data-id="tab3">TAB-3</button>
    </li>
  </ul>

  <ul class="pat-navigation-tabs-js__panels">
    <li class="pat-navigation-tabs-js__panel js-tab-panel active" data-id="tab1">
      <h2 class="cmp-heading__base cmp-heading__base--heading-200">
        <span class="cmp-heading__main">Heading Tab One</span>
      </h2>
      <p>Content of tab one</p>
    </li>
    <li class="pat-navigation-tabs-js__panel js-tab-panel" data-id="tab2">
      <h2 class="cmp-heading__base cmp-heading__base--heading-200">
        <span class="cmp-heading__main">Heading Tab two</span>
      </h2>
      <p>Content of tab two</p>
    </li>
    <li class="pat-navigation-tabs-js__panel js-tab-panel" data-id="tab3">
      <h2 class="cmp-heading__base cmp-heading__base--heading-200">
        <span class="cmp-heading__main">Heading Tab Three</span>
      </h2>
      <p>Content of tab three</p>
    </li>
  </ul>
</div>