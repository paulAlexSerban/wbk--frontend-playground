import { ajax } from 'jquery';

(() => {
  const trigger = document.querySelector(".specificity-graph-trigger");
  const loadStandaloneGraph = () => {
    const bodyEl = document.querySelector('body');
    const specificityGraphScript = document.createElement('script');
    specificityGraphScript.src = './javascript/specificity-graph-standalone.vendor.js';
    bodyEl.appendChild(specificityGraphScript);
  };
  
  const createGraph = () => {
    const options = {
      width: 1000,
      height: 800
    };
    
    ajax({
      url: "./library/web-app/movie-seat-booking-app/styles/index.page.min.css",
      dataType: "text",
      success: function(cssText) {
        window.specificityGraph.create(cssText, options);
      }
    });
  };
  
  const setupEvents = () => {
    trigger.addEventListener("click", () => createGraph());
  };
  loadStandaloneGraph();
  setupEvents();
})();