import { config } from "./config";

(() => {
  const Alert = (el) => {
    const self = { elements: {} };
    self.el = el;

    const init = () => {
      setupDomReferences();
      setupEventListeners();
    };

    const setupDomReferences = () => {
      self.elements.closeIcon = self.el.querySelector(config.selectors.close);
    };

    const onCloseIconClicked = () => {
      if (self.el.parentNode) {
        this.closeIcon.removeEventListener("click", () => {
          onCloseIconClicked();
        });
        self.el.parentNode.removeChild(self.el);
      }
    };

    const setupEventListeners = () => {
      if (self.elements.closeIcon) {
        self.elements.closeIcon.addEventListener("click", () => {
          onCloseIconClicked();
        });
      }
    };

    init();
  };

  document.querySelectorAll(`[data-js-${config.type}=${config.name}]`).forEach((el) => {
    Alert(el);
  });
})();
