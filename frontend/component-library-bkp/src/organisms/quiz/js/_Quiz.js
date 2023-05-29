export const config = {
    type: "widget",
    name: "Quiz",
};

import { QuizController } from "./Quiz/QuizController";
import { UIController } from "./Quiz/UIController";
import { Controller } from "./Quiz/Controller";

export const Quiz = () => {
    const init = () => {
        Controller(QuizController, UIController);
    };

    init();
};

