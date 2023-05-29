

(() => {

  const config = {
      type: "pat",
      name: "ModalWindow",
  };
  
  const ModalWindow = (el) => {
      const global = { state: {}, elements: {} };

      const init = () => {
          setupDomReferences();
          setupEventListeners();
      };

      const setupDomReferences = () => {
          global.elements.modal = el.querySelector(".js-modal");
          global.elements.overlay = el.querySelector(".js-overlay");
          global.elements.btnCloseModal = el.querySelector(".js-close-modal");
          global.elements.btnsOpenModal = el.querySelectorAll(".js-show-modal");
      };

      const setupEventListeners = () => {
          for (let i = 0; i < global.elements.btnsOpenModal.length; i++) {
              global.elements.btnsOpenModal[i].addEventListener("click", () => {
                  openModal();
              });
          }

          global.elements.btnCloseModal.addEventListener("click", () => {
              closeModal();
          });
          global.elements.overlay.addEventListener("click", () => {
              closeModal();
          });

          document.addEventListener("keydown", (e) => {
              if (e.key === "Escape" && !global.elements.modal.classList.contains("modal-window__hidden")) {
                  closeModal();
              }
          });
      };

      const openModal = () => {
          global.elements.modal.classList.remove("modal-window__hidden");
          global.elements.overlay.classList.remove("modal-window__hidden");
      };

      const closeModal = () => {
          global.elements.modal.classList.add("modal-window__hidden");
          global.elements.overlay.classList.add("modal-window__hidden");
      };

      init();
  };

  document.querySelectorAll(`[data-js-${config.type}=${config.name}]`).forEach((el) => {
      ModalWindow(el);
  });
})();
