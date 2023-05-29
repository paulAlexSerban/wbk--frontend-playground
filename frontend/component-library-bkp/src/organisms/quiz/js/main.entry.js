import { NinjaQuiz, config as NQConfig } from "./_NinjaQuiz";
import { Quiz, config as QConfig } from "./_Quiz";

(() => {
    document.querySelectorAll(`[data-js-${QConfig.type}=${QConfig.name}]`).forEach((el) => Quiz(el));
    document.querySelectorAll(`[data-js-${NQConfig.type}=${NQConfig.name}]`).forEach((el) => {
        NinjaQuiz(el);
    });
})();
