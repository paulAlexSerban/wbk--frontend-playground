import { findOne } from '../../../../../_abstracts/js/dom/traversing';

export const UIController = (el) => {
    const global = { state: {}, elements: {}, data: {} };

    const init = () => {
        setupDomReferences();
    };

    const setupDomReferences = () => {
        // Admin Panel Elements
        global.elements.adminPanelSection = findOne('.admin-panel-container', el);
        global.elements.questInsertBtn = findOne('#question-insert-btn', el);
        global.elements.newQuestionText = findOne('#new-question-text', el);
        global.elements.adminOptions = document.querySelectorAll('.admin-option');
        global.elements.adminOptionsContainer = findOne('.admin-options-container', el);
        global.elements.insertedQuestsWrapper = findOne('.inserted-questions-wrapper', el);
        global.elements.questUpdateBtn = findOne('#question-update-btn', el);
        global.elements.questDeleteBtn = findOne('#question-delete-btn', el);
        global.elements.questsClearBtn = findOne('#questions-clear-btn', el);
        global.elements.resultsListWrapper = findOne('.results-list-wrapper', el);
        global.elements.clearResultsBtn = findOne('#results-clear-btn');
        // Quiz Section Elements
        global.elements.quizSection = findOne('.quiz-container', el);
        global.elements.askedQuestText = findOne('#asked-question-text', el);
        global.elements.quizoptionsWrapper = findOne('.quiz-options-wrapper', el);
        global.elements.progressBar = findOne('progress', el);
        global.elements.progressPar = findOne('#progress', el);
        global.elements.instAnsContainer = findOne('.instant-answer-container', el);
        global.elements.instAnsText = findOne('#instant-answer-text', el);
        global.elements.instAnsDiv = findOne('#instant-answer-wrapper', el);
        global.elements.emotionIcon = findOne('#emotion', el);
        global.elements.nextQuestbtn = findOne('#next-question-btn', el);
        // Landing Page Elements
        global.elements.landPageSection = findOne('.landing-page-container', el);
        global.elements.startQuizBtn = findOne('#start-quiz-btn', el);
        global.elements.firstNameInput = findOne('#firstname', el);
        global.elements.lastNameInput = findOne('#lastname', el);
        // Final Results Section Elements
        global.elements.finalResultSection = findOne('.final-result-container', el);
        global.elements.finalScoreText = findOne('#final-score-text', el);
    };

    const setupFullName = (currPerson, storageQuestList, admin) => {
        if (global.elements.firstNameInput.value !== '' && global.elements.lastNameInput.value !== '') {
            if (
                !(global.elements.firstNameInput.value === admin[0] && global.elements.lastNameInput.value === admin[1])
            ) {
                if (storageQuestList.getQuestionCollection().length > 0) {
                    currPerson.fullName.push(global.elements.firstNameInput.value);
                    currPerson.fullName.push(global.elements.lastNameInput.value);
                    global.elements.landPageSection.style.display = 'none';
                    global.elements.quizSection.style.display = 'block';
                } else {
                    alert('Quiz is not ready, please contact to administrator');
                }
            } else {
                global.elements.landPageSection.style.display = 'none';
                global.elements.adminPanelSection.style.display = 'block';
            }
        } else {
            alert('Please, enter your first name and last name');
        }
    };

    const setupAddInputsDynamically = () => {
        const addInput = () => {
            const z = document.querySelectorAll('.admin-option').length;
            const inputHTML = `
      <div class="admin-option-wrapper">
        <input type="radio" class="admin-option-${z}" name="answer" value="${z}">
        <input type="text" class="admin-option admin-option-${z}" value="">
      </div>`;

            global.elements.adminOptionsContainer.insertAdjacentHTML('beforeend', inputHTML);
            global.elements.adminOptionsContainer.lastElementChild.previousElementSibling.lastElementChild.removeEventListener(
                'focus',
                addInput
            );

            global.elements.adminOptionsContainer.lastElementChild.lastElementChild.addEventListener('focus', addInput);
        };

        global.elements.adminOptionsContainer.lastElementChild.lastElementChild.addEventListener('focus', addInput);
    };

    const setupCreateQuestionList = (getQuestions) => {
        let questHTML;
        const numberingArr = [];
        global.elements.insertedQuestsWrapper.innerHTML = '';
        for (let i = 0; i < getQuestions.getQuestionCollection().length; i++) {
            numberingArr.push(i + 1);
            questHTML = `
        <p>
        <span>
        ${numberingArr[i]}. ${getQuestions.getQuestionCollection()[i].questionText}
        </span>
        <button id="question-${getQuestions.getQuestionCollection()[i].id}">Edit</button>
        </p>`;

            global.elements.insertedQuestsWrapper.insertAdjacentHTML('afterbegin', questHTML);
        }
    };

    const setupEditQuestList = (event, storageQuestList, addInpsDynFn, updateQuestListFn) => {
        let getId, getStorageQuestList, foundItem, placeInArr, optionHTML;
        if ('question-'.indexOf(event.target.id)) {
            getId = parseInt(event.target.id.split('-')[1]);
            getStorageQuestList = storageQuestList.getQuestionCollection();
            for (let i = 0; i < getStorageQuestList.length; i++) {
                if (getStorageQuestList[i].id === getId) {
                    foundItem = getStorageQuestList[i];
                    placeInArr = i;
                }
            }

            global.elements.newQuestionText.value = foundItem.questionText;
            global.elements.adminOptionsContainer.innerHTML = '';
            optionHTML = '';

            for (let x = 0; x < foundItem.options.length; x++) {
                optionHTML += `<div class="admin-option-wrapper">
          <input type="radio" class="admin-option-4${x}" name="answer" value="${x}">
          <input type="text" class="admin-option admin-option-${x}" value="${foundItem.options[x]}">
        </div>`;
            }

            global.elements.adminOptionsContainer.innerHTML = optionHTML;
            global.elements.questDeleteBtn.style.visibility = 'visible';
            global.elements.questUpdateBtn.style.visibility = 'visible';
            global.elements.questInsertBtn.style.visibility = 'hidden';
            global.elements.questsClearBtn.style.pointerEvents = 'none';

            addInpsDynFn();

            let backDefaultView = () => {
                let updatedOptions;
                global.elements.newQuestionText.value = '';
                updatedOptions = document.querySelectorAll('.admin-option');
                for (let i = 0; i < updatedOptions.length; i++) {
                    updatedOptions[i].value = '';
                    updatedOptions[i].previousElementSibling.checked = false;
                }
                global.elements.questDeleteBtn.style.visibility = 'hidden';
                global.elements.questUpdateBtn.style.visibility = 'hidden';
                global.elements.questInsertBtn.style.visibility = 'visible';
                global.elements.questsClearBtn.style.pointerEvents = '';

                updateQuestListFn(storageQuestList);
            };

            let updateQuestion = function () {
                let newOptions, optionEls;

                newOptions = [];
                optionEls = document.querySelectorAll('.admin-option');
                foundItem.questionText = global.elements.newQuestionText.value;
                foundItem.correctAnswer = '';

                for (let i = 0; i < optionEls.length; i++) {
                    if (optionEls[i].value !== '') {
                        newOptions.push(optionEls[i].value);

                        if (optionEls[i].previousElementSibling.checked) {
                            foundItem.correctAnswer = optionEls[i].value;
                        }
                    }
                }

                foundItem.options = newOptions;
                if (foundItem.questionText !== '') {
                    if (foundItem.options.length > 1) {
                        if (foundItem.correctAnswer !== '') {
                            getStorageQuestList.splice(placeInArr, 1, foundItem);
                            storageQuestList.setQuestionCollection(getStorageQuestList);
                            backDefaultView();
                        } else {
                            alert('You missed to check correct answer, or you checked answer without value');
                        }
                    } else {
                        alert('You must insert at least two options');
                    }
                } else {
                    alert('Please, insert question');
                }
            };

            global.elements.questUpdateBtn.onclick = updateQuestion;

            let deleteQuestion = function () {
                getStorageQuestList.splice(placeInArr, 1);

                storageQuestList.setQuestionCollection(getStorageQuestList);

                backDefaultView();
            };

            global.elements.questDeleteBtn.onclick = deleteQuestion;
        }
    };

    const setupClearQuestList = (storageQuestList) => {
        if (storageQuestList.getQuestionCollection() !== null) {
            if (storageQuestList.getQuestionCollection().length > 0) {
                let conf = confirm('Warning! You will lose entire question list');

                if (conf) {
                    storageQuestList.removeQuestionCollection();

                    global.elements.insertedQuestsWrapper.innerHTML = '';
                }
            }
        }
    };

    const setupDisplayQuestion = (storageQuestList, progress) => {
        let newOptionHTML, characterArr;
        characterArr = ['A', 'B', 'C', 'D', 'E', 'F'];
        if (storageQuestList.getQuestionCollection().length > 0) {
            global.elements.askedQuestText.textContent =
                storageQuestList.getQuestionCollection()[progress.questionIndex].questionText;
            global.elements.quizoptionsWrapper.innerHTML = '';
            for (let i = 0; i < storageQuestList.getQuestionCollection()[progress.questionIndex].options.length; i++) {
                newOptionHTML = `<div class="choice-${i}">
                  <span class="choice-${i}">${characterArr[i]}</span>
                  <p  class="choice-${i}">${
                      storageQuestList.getQuestionCollection()[progress.questionIndex].options[i]
                  }</p>
                </div>`;

                global.elements.quizoptionsWrapper.insertAdjacentHTML('beforeend', newOptionHTML);
            }
        }
    };

    const setupDisplayProgress = (storageQuestList, progress) => {
        global.elements.progressBar.max = storageQuestList.getQuestionCollection().length;
        global.elements.progressBar.value = progress.questionIndex + 1;
        global.elements.progressPar.textContent =
            progress.questionIndex + 1 + '/' + storageQuestList.getQuestionCollection().length;
    };

    const setupNewDesign = (ansResult, selectedAnswer) => {
        let twoOptions, index;
        index = 0;
        if (ansResult) {
            index = 1;
        }

        twoOptions = {
            instAnswerText: ['This is a wrong answer', 'This is a correct answer'],
            instAnswerClass: ['red', 'green'],
            emotionType: ['/images/sad-original.webp', '/images/happy-original.webp'],
            optionSpanBg: ['rgba(200, 0, 0, .7)', 'rgba(0, 250, 0, .2)'],
        };

        global.elements.quizoptionsWrapper.style.cssText = 'opacity: 0.6; pointer-events: none;';
        global.elements.instAnsContainer.style.opacity = '1';
        global.elements.instAnsText.textContent = twoOptions.instAnswerText[index];
        global.elements.instAnsDiv.className = twoOptions.instAnswerClass[index];
        global.elements.emotionIcon.setAttribute('src', twoOptions.emotionType[index]);
        selectedAnswer.previousElementSibling.style.backgroundColor = twoOptions.optionSpanBg[index];
    };

    const setupResetDesign = () => {
        global.elements.quizoptionsWrapper.style.cssText = '';
        global.elements.instAnsContainer.style.opacity = '0';
    };

    const setupFinalResult = (currPerson) => {
        global.elements.finalScoreText.textContent = `${currPerson.fullName[0]} ${currPerson.fullName[1]}, your final score is ${currPerson.score}`;

        global.elements.quizSection.style.display = 'none';
        global.elements.finalResultSection.style.display = 'block';
    };

    const setupAddResultOnPanel = (userData) => {
        let resultHTML;
        global.elements.resultsListWrapper.innerHTML = '';
        for (let i = 0; i < userData.getPersonData().length; i++) {
            resultHTML = `
        <p class="person person-${i}">
          <span class="person-${i}">${userData.getPersonData()[i].firstName} ${
              userData.getPersonData()[i].lastName
          } - ${userData.getPersonData()[i].score} Points</span>
          <button id="delete-result-btn_${userData.getPersonData()[i].id}" class="delete-result-btn">Delete</button>
        </p>
        `;

            global.elements.resultsListWrapper.insertAdjacentHTML('afterbegin', resultHTML);
        }
    };

    const setupDeleteResult = (event, userData) => {
        let getId, personArr;
        personArr = userData.getPersonData();
        if ('delete-result-btn_'.indexOf(event.target.id)) {
            getId = parseInt(event.target.id.split('_')[1]);
            for (let i = 0; i < personArr.length; i++) {
                if (personArr[i].id === getId) {
                    personArr.splice(i, 1);
                    userData.setPersonData(personArr);
                }
            }
        }
    };

    const setupClearResultList = (userData) => {
        let conf;
        if (userData.getPersonData() !== null) {
            if (userData.getPersonData().length > 0) {
                conf = confirm('Warning! You will lose entire result list');
                if (conf) {
                    userData.removePersonData();
                    global.elements.resultsListWrapper.innerHTML = '';
                }
            }
        }
    };

    init();

    return {
        getDomItems: global.elements,
        addInputsDynamically: setupAddInputsDynamically,
        createQuestionList: setupCreateQuestionList,
        editQuestList: setupEditQuestList,
        clearQuestList: setupClearQuestList,
        displayQuestion: setupDisplayQuestion,
        displayProgress: setupDisplayProgress,
        newDesign: setupNewDesign,
        resetDesign: setupResetDesign,
        getFullName: setupFullName,
        finalResult: setupFinalResult,
        addResultOnPanel: setupAddResultOnPanel,
        deleteResult: setupDeleteResult,
        clearResultList: setupClearResultList,
    };
};
