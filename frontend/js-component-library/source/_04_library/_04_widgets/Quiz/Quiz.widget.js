import { config } from "./config";
import { QuizController } from "./QuizController";
import { UIController } from "./UIController";
import { Controller } from "./Controller";

(() => {
  const Quiz = (el) => {
    const quizDomEl = el;
    const init = () => {
      console.log({ quizDomEl });
      Controller(QuizController, UIController);
    };

    init();
  };

  document.querySelectorAll(`[data-js-${config.type}=${config.name}]`).forEach((el) => Quiz(el));
})();
