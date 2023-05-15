import { config } from "./config";

(() => {
    const GuessMyNumber = (el) => {
        const global = {
            state: {
                secretNumber: Math.trunc(Math.random() * 20) + 1,
                score: 20,
                highscore: 0,
            },
            elements: {},
        };

        const init = () => {
            setupDomReferences();
            setupEventListeners();
        };

        const displayMessage = (message) => {
            global.elements.message.textContent = message;
        };

        const setupDomReferences = () => {
            global.elements.message = el.querySelector(".js-message");
            global.elements.check = el.querySelector(".js-check");
            global.elements.again = el.querySelector(".js-again");
            global.elements.number = document.querySelector(".js-number");
            global.elements.score = document.querySelector(".js-score");
            global.elements.highscore = document.querySelector(".js-highscore");
            global.elements.guess = document.querySelector(".js-guess");
        };

        const setupEventListeners = () => {
            global.elements.check.addEventListener("click", function () {
                const guess = Number(global.elements.guess.value);

                // When there is no input
                if (!guess) {
                    displayMessage("⛔️ No number!");

                    // When player wins
                } else if (guess === global.state.secretNumber) {
                    displayMessage("🎉 Correct Number!");
                    global.elements.number.textContent = global.state.secretNumber;
                    global.elements.number.style.width = "30rem";

                    if (global.state.score > global.state.highscore) {
                        global.state.highscore = global.state.score;
                        global.elements.highscore.textContent = global.state.highscore;
                    }

                    // When guess is wrong
                } else if (guess !== global.state.secretNumber) {
                    if (global.state.score > 1) {
                        displayMessage(guess > global.state.secretNumber ? "📈 Too high!" : "📉 Too low!");
                        global.state.score--;
                        global.elements.score.textContent = global.state.score;
                    } else {
                        displayMessage("💥 You lost the game!");
                        global.elements.score.textContent = 0;
                    }
                }
            });

            global.elements.again.addEventListener("click", function () {
                global.state.score = 20;
                global.state.secretNumber = Math.trunc(Math.random() * 20) + 1;
                displayMessage("Start guessing...");
                global.elements.score.textContent = global.state.score;
                global.elements.number.textContent = "?";
                global.elements.guess.value = "";
                global.elements.number.style.width = "15rem";
            });
        };

        init();
    };

    document.querySelectorAll(`[data-js-${config.type}=${config.name}]`).forEach((el) => {
        GuessMyNumber(el);
    });
})();

///////////////////////////////////////
// Coding Challenge #1

/*
Implement a game rest functionality, so that the player can make a new guess! Here is how:
1. Select the element with the 'again' class and attach a click event handler
2. In the handler function, restore initial values of the score and secretNumber variables
3. Restore the initial conditions of the message, number, score and guess input field
4. Also restore the original background color (#222) and number width (15rem)
GOOD LUCK 😀
*/
