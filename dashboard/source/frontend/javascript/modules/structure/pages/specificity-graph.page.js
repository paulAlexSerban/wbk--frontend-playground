import { ajax } from 'jquery';

(() => {
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
      url: "./library/form/basic-form-validator/styles/index.page.min.css",
      dataType: "text",
      success: function(cssText) {
        window.specificityGraph.create(cssText, options);
      }
    });
  };
  
  const setupEvents = () => {
    const trigger = document.querySelector(".specificity-graph-trigger");
    trigger.addEventListener("click", () => createGraph());
  };
  loadStandaloneGraph();
  setupEvents();
})();