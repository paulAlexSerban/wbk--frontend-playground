export const config = {
    type: "widget",
    name: "MathGame",
};

export const MathGame = (el) => {
    const global = { el, state: {}, elements: {} };
    var playing = false;
    var score;
    var action;
    var timeremaining;
    var correctAnswer;

    const init = () => {
        setupDomReferences();
        setupEventListeners();
    };

    const setupDomReferences = () => {
        global.elements.startreset = document.getElementById("startreset");
        global.elements.scorevalue = document.getElementById("scorevalue");
        global.elements.timeremainingvalue = document.getElementById("timeremainingvalue");
        global.elements.gameOver = document.getElementById("gameOver");
        for (let i = 1; i < 5; i++) {
            global.elements[`box${i}`] = document.getElementById(`box${i}`);
        }
        global.elements.question = document.getElementById("question");
    };

    const setupEventListeners = () => {
        global.elements.startreset.addEventListener("click", () => handleStartReset());
        for (let i = 1; i < 5; i++) {
            global.elements[`box${i}`].addEventListener("click", (e) => handleAnswerClick(e));
        }
    };

    const handleAnswerClick = (e) => {
        if (playing == true) {
            if (e.target.innerHTML == correctAnswer) {
                score++;
                global.elements.scorevalue.innerHTML = score;
                hide("wrong");
                show("correct");
                setTimeout(() => {
                    hide("correct");
                }, 1000);

                generateQA();
            } else {
                hide("correct");
                show("wrong");
                setTimeout(() => {
                    hide("wrong");
                }, 1000);
            }
        }
    };

    const handleStartReset = () => {
        if (playing == true) {
            location.reload();
        } else {
            playing = true;
            score = 0;
            global.elements.scorevalue.innerHTML = score;
            show("timeremaining");
            timeremaining = 60;
            global.elements.timeremainingvalue.innerHTML = timeremaining;
            hide("gameOver");
            global.elements.startreset.innerHTML = "Reset Game";
            startCountdown();
            generateQA();
        }
    };

    const startCountdown = () => {
        action = setInterval(() => {
            timeremaining -= 1;
            global.elements.timeremainingvalue.innerHTML = timeremaining;
            if (timeremaining == 0) {
                // game over
                stopCountdown();
                show("gameOver");
                global.elements.gameOver.innerHTML = "<p>Game over!</p><p>Your score is " + score + ".</p>";
                hide("timeremaining");
                hide("correct");
                hide("wrong");
                playing = false;
                global.elements.startreset.innerHTML = "Start Game";
            }
        }, 1000);
    };

    const stopCountdown = () => {
        clearInterval(action);
    };

    const hide = (Id) => {
        document.getElementById(Id).style.display = "none";
    };

    const show = (Id) => {
        document.getElementById(Id).style.display = "block";
    };

    const generateQA = () => {
        const x = 1 + Math.round(9 * Math.random());
        const y = 1 + Math.round(9 * Math.random());
        correctAnswer = x * y;
        global.elements.question.innerHTML = x + "x" + y;
        const correctPosition = 1 + Math.round(3 * Math.random());
        document.getElementById("box" + correctPosition).innerHTML = correctAnswer; //fill one box with the correct answer

        //fill other boxes with wrong answers

        const answers = [correctAnswer];

        for (let i = 1; i < 5; i++) {
            if (i != correctPosition) {
                let wrongAnswer;
                do {
                    wrongAnswer = (1 + Math.round(9 * Math.random())) * (1 + Math.round(9 * Math.random())); //a wrong answer
                } while (answers.indexOf(wrongAnswer) > -1);
                document.getElementById("box" + i).innerHTML = wrongAnswer;
                answers.push(wrongAnswer);
            }
        }
    };

    init();
};

(() => {
    document.querySelectorAll(`[data-js-${config.type}=${config.name}]`).forEach((el) => {
        MathGame(el);
    });
})();
