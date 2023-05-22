export const config = {
    type: "widget",
    name: "NumberGuesser",
};

export const NumberGuesser = () => {
    const global = {
        state: {
            min: 1,
            max: 10,
            guessesLeft: 3,
        },
        elements: {},
    };

    const init = () => {
        setupDomReferences();
        global.elements.minNum.textContent = global.state.min;
        global.elements.maxNum.textContent = global.state.max;
        global.state.winningNum = getRandomNum(global.state.min, global.state.max);
        setupEventListeners();
    };

    const setupDomReferences = () => {
        global.elements.game = document.querySelector("#game");
        global.elements.minNum = document.querySelector(".min-num");
        global.elements.maxNum = document.querySelector(".max-num");
        global.elements.guessBtn = document.querySelector("#guess-btn");
        global.elements.guessInput = document.querySelector("#guess-input");
        global.elements.message = document.querySelector(".message");
    };

    const setupEventListeners = () => {
        global.elements.game.addEventListener("mousedown", function (e) {
            if (e.target.className === "play-again") {
                window.location.reload();
            }
        });

        global.elements.guessBtn.addEventListener("click", function () {
            let guess = parseInt(global.elements.guessInput.value);
            if (isNaN(guess) || guess < global.state.min || guess > global.state.max) {
                setMessage(`Please enter a number between ${global.state.min} and ${global.state.max}`, "red");
            }
            if (guess === global.state.winningNum) {
                gameOver(true, `${global.state.winningNum} is correct, YOU WIN!`);
            } else {
                global.state.guessesLeft -= 1;
                if (global.state.guessesLeft === 0) {
                    gameOver(false, `Game Over, you lost. The correct number was ${global.state.winningNum}`);
                } else {
                    global.elements.guessInput.style.borderColor = "red";
                    global.elements.guessInput.value = "";
                    setMessage(`${guess} is not correct, ${global.state.guessesLeft} guesses left`, "red");
                }
            }
        });
    };

    // Game over
    const gameOver = (won, msg) => {
        let color;
        won === true ? (color = "green") : (color = "red");
        global.elements.guessInput.disabled = true;
        global.elements.guessInput.style.borderColor = color;
        global.elements.message.style.color = color;
        setMessage(msg);

        global.elements.guessBtn.value = "Play Again";
        global.elements.guessBtn.className += "play-again";
    };

    const getRandomNum = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1) + min);
    };

    const setMessage = (msg, color) => {
        global.elements.message.style.color = color;
        global.elements.message.textContent = msg;
    };

    init();
};


