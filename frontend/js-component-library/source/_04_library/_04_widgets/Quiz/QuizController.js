export const QuizController = () => {
  /**
   * Question Constructor
   */
  function Question(id, questionText, options, correctAnswer) {
    this.id = id;
    this.questionText = questionText;
    this.options = options;
    this.correctAnswer = correctAnswer;
  }

  const questionLocalStorage = {
    setQuestionCollection: (newCollection) => {
      localStorage.setItem("questionCollection", JSON.stringify(newCollection));
    },

    getQuestionCollection: () => {
      return JSON.parse(localStorage.getItem("questionCollection"));
    },

    removeQuestionCollection: () => {
      localStorage.removeItem("questionCollection");
    },
  };

  if (questionLocalStorage.getQuestionCollection() === null) {
    questionLocalStorage.setQuestionCollection([]);
  }

  const quizProgress = {
    questionIndex: 0,
  };

  /**
   * Person Constructor
   */

  function Person(id, firstName, lastName, score) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.score = score;
  }

  const currPersonData = {
    fullName: [],
    score: 0,
  };

  const adminFullName = ["John", "Smith"];

  const personLocalStorage = {
    setPersonData: (newPersonData) => {
      localStorage.setItem("personData", JSON.stringify(newPersonData));
    },
    getPersonData: () => {
      return JSON.parse(localStorage.getItem("personData"));
    },
    removePersonData: () => {
      localStorage.removeItem("personData");
    },
  };

  if (personLocalStorage.getPersonData() === null) {
    personLocalStorage.setPersonData([]);
  }

  const setupQuestionLocalStorage = (newQuestText, opts) => {
    let optionsArr = [];
    let questionId;
    let newQuestion;
    let getStoredQuests;
    let isChecked;
    let corrAns;

    if (questionLocalStorage.getQuestionCollection() === null) {
      questionLocalStorage.setQuestionCollection([]);
    }

    for (let i = 0; i < opts.length; i++) {
      if (opts[i].value !== "") {
        optionsArr.push(opts[i].value);
      }
      if (opts[i].previousElementSibling.checked && opts[i].value !== "") {
        corrAns = opts[i].value;
        isChecked = true;
      }
    }

    if (questionLocalStorage.getQuestionCollection().length > 0) {
      questionId =
        questionLocalStorage.getQuestionCollection()[questionLocalStorage.getQuestionCollection().length - 1].id + 1;
    } else {
      questionId = 0;
    }

    if (newQuestText.value !== "") {
      if (optionsArr.length > 1) {
        if (isChecked) {
          newQuestion = new Question(questionId, newQuestText.value, optionsArr, corrAns);
          getStoredQuests = questionLocalStorage.getQuestionCollection();
          getStoredQuests.push(newQuestion);
          questionLocalStorage.setQuestionCollection(getStoredQuests);
          newQuestText.value = "";

          for (var x = 0; x < opts.length; x++) {
            opts[x].value = "";
            opts[x].previousElementSibling.checked = false;
          }

          console.log(questionLocalStorage.getQuestionCollection());

          return true;
        } else {
          alert("You missed to check correct answer, or you checked answer without value");
          return false;
        }
      } else {
        alert("You must insert at least two options");
        return false;
      }
    } else {
      alert("Please, Insert Question");
      return false;
    }
  };

  const setupCheckAnswer = (ans) => {
    if (questionLocalStorage.getQuestionCollection()[quizProgress.questionIndex].correctAnswer === ans.textContent) {
      currPersonData.score++;
      return true;
    } else {
      return false;
    }
  };

  const setupIsFinished = () => {
    return quizProgress.questionIndex + 1 === questionLocalStorage.getQuestionCollection().length;
  };

  const setupAddPerson = () => {
    let personId;
    if (personLocalStorage.getPersonData().length > 0) {
      personId = personLocalStorage.getPersonData()[personLocalStorage.getPersonData().length - 1].id + 1;
    } else {
      personId = 0;
    }

    let newPerson = new Person(personId, currPersonData.fullName[0], currPersonData.fullName[1], currPersonData.score);
    let personData = personLocalStorage.getPersonData();
    personData.push(newPerson);
    personLocalStorage.setPersonData(personData);
    console.log(newPerson);
  };

  return {
    getQuizProgress: quizProgress,
    getQuestionLocalStorage: questionLocalStorage,
    addQuestionOnLocalStorage: setupQuestionLocalStorage,
    checkAnswer: setupCheckAnswer,
    isFinished: setupIsFinished,
    addPerson: setupAddPerson,
    getCurrPersonData: currPersonData,
    getAdminFullName: adminFullName,
    getPersonLocalStorage: personLocalStorage,
  };
};
