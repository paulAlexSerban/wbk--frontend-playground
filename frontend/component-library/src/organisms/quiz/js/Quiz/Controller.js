export const Controller = (quizCtrl, UICtrl) => {
    const QUIZ_CTRL = quizCtrl();
    const UI_CTRL = UICtrl();

    const domItems = UI_CTRL.getDomItems;
    UI_CTRL.addInputsDynamically();
    UI_CTRL.createQuestionList(QUIZ_CTRL.getQuestionLocalStorage);
    UI_CTRL.displayQuestion(QUIZ_CTRL.getQuestionLocalStorage, QUIZ_CTRL.getQuizProgress);
    UI_CTRL.displayProgress(QUIZ_CTRL.getQuestionLocalStorage, QUIZ_CTRL.getQuizProgress);
    UI_CTRL.addResultOnPanel(QUIZ_CTRL.getPersonLocalStorage);

    const init = () => {
        setupEventListeners();
    };

    const setupEventListeners = () => {
        domItems.questInsertBtn.addEventListener("click", () => {
            const adminOptions = document.querySelectorAll(".admin-option");
            const checkBoolean = QUIZ_CTRL.addQuestionOnLocalStorage(domItems.newQuestionText, adminOptions);

            if (checkBoolean) {
                UI_CTRL.createQuestionList(QUIZ_CTRL.getQuestionLocalStorage);
            }
        });

        domItems.startQuizBtn.addEventListener("click", () => {
            UI_CTRL.getFullName(
                QUIZ_CTRL.getCurrPersonData,
                QUIZ_CTRL.getQuestionLocalStorage,
                QUIZ_CTRL.getAdminFullName
            );
        });

        domItems.lastNameInput.addEventListener("focus", () => {
            domItems.lastNameInput.addEventListener("keypress", (e) => {
                if (e.keyCode === 13) {
                    UI_CTRL.getFullName(
                        QUIZ_CTRL.getCurrPersonData,
                        QUIZ_CTRL.getQuestionLocalStorage,
                        QUIZ_CTRL.getAdminFullName
                    );
                }
            });
        });

        domItems.insertedQuestsWrapper.addEventListener("click", (e) => {
            UI_CTRL.editQuestList(
                e,
                QUIZ_CTRL.getQuestionLocalStorage,
                UI_CTRL.addInputsDynamically,
                UI_CTRL.createQuestionList
            );
        });

        domItems.questsClearBtn.addEventListener("click", () => {
            UI_CTRL.clearQuestList(QUIZ_CTRL.getQuestionLocalStorage);
        });

        domItems.quizoptionsWrapper.addEventListener("click", (e) => {
            let updatedOptionsDiv = domItems.quizoptionsWrapper.querySelectorAll("div");
            for (let i = 0; i < updatedOptionsDiv.length; i++) {
                if (e.target.className === "choice-" + i) {
                    let answer = document.querySelector(".quiz-options-wrapper div p." + e.target.className);
                    let answerResult = QUIZ_CTRL.checkAnswer(answer);
                    UI_CTRL.newDesign(answerResult, answer);
                    if (QUIZ_CTRL.isFinished()) {
                        domItems.nextQuestbtn.textContent = "Finish";
                    }

                    let nextQuestion = function () {
                        if (QUIZ_CTRL.isFinished()) {
                            QUIZ_CTRL.addPerson();
                            UI_CTRL.finalResult(QUIZ_CTRL.getCurrPersonData);
                        } else {
                            UI_CTRL.resetDesign();
                            QUIZ_CTRL.getQuizProgress.questionIndex++;
                            UI_CTRL.displayQuestion(QUIZ_CTRL.getQuestionLocalStorage, QUIZ_CTRL.getQuizProgress);
                            UI_CTRL.displayProgress(QUIZ_CTRL.getQuestionLocalStorage, QUIZ_CTRL.getQuizProgress);
                        }
                    };

                    domItems.nextQuestbtn.onclick = function () {
                        nextQuestion(QUIZ_CTRL.getQuestionLocalStorage, QUIZ_CTRL.getQuizProgress);
                    };
                }
            }
        });

        domItems.startQuizBtn.addEventListener("click", () => {
            UI_CTRL.getFullName(
                QUIZ_CTRL.getCurrPersonData,
                QUIZ_CTRL.getQuestionLocalStorage,
                QUIZ_CTRL.getAdminFullName
            );
        });

        domItems.lastNameInput.addEventListener("focus", () => {
            domItems.lastNameInput.addEventListener("keypress", function (e) {
                if (e.keyCode === 13) {
                    UI_CTRL.getFullName(
                        QUIZ_CTRL.getCurrPersonData,
                        QUIZ_CTRL.getQuestionLocalStorage,
                        QUIZ_CTRL.getAdminFullName
                    );
                }
            });
        });

        domItems.resultsListWrapper.addEventListener("click", (e) => {
            UI_CTRL.deleteResult(e, QUIZ_CTRL.getPersonLocalStorage);
            UI_CTRL.addResultOnPanel(QUIZ_CTRL.getPersonLocalStorage);
        });

        domItems.clearResultsBtn.addEventListener("click", () => {
            UI_CTRL.clearResultList(QUIZ_CTRL.getPersonLocalStorage);
        });
    };

    init();
};
